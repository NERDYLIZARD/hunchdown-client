/**
 * Created on 15-Sep-18.
 */
import axios from 'axios';
import { normalize } from 'normalizr';
import { boxSchema as schema } from '../../normalizr-schema';
import * as getNextPageUrl from './getNextPageUrl';
import callApi, { API_ROOT } from './callApi';

jest.mock('axios');

describe('callApi()', () => {
  const endpoint = '/endpoint';
  const method = 'GET';

  beforeEach(() => {
    axios.mockRestore();
    // default resolve
    axios.mockImplementation(() => Promise.resolve());
  });

  it('appends `endpoint` to `API_ROOT` before passing as `url` to `axios`', () => {
    const method = 'GET';
    callApi(endpoint, null, method);
    expect(axios).toBeCalledWith({url: API_ROOT + endpoint, method, data: {}});
  });

  describe('calls on `DELETE` method', () => {
    it('calls `axios` with `data = null`', () => {
      const method = 'DELETE';
      callApi(endpoint, null, method);
      expect(axios).toBeCalledWith({url: API_ROOT + endpoint, method, data: null});
    });
  });

  describe('does not call on `DELETE` method', () => {
    it('calls `axios` with `data = data`', () => {
      const method = 'POST';
      const data = {foo: 'bar'};
      callApi(endpoint, null, method, data);
      expect(axios).toBeCalledWith({url: API_ROOT + endpoint, method, data});
    });
  });

  describe('when server response', () => {
    describe('is an empty object', () => {
      it('return normalized argument `data`', () => {
        axios.mockImplementation(() => Promise.resolve({}));
        const method = 'POST';
        const data = {foo: 'bar'};
        callApi(endpoint, schema, method, data)
          .then(response => {
            expect(response).toEqual(normalize(data, schema));
          });
      });
    });

    describe('is not an empty object', () => {
      it('return normalized `server response`', () => {
        const serverResponse = {zoo: 'zaa'};
        axios.mockImplementation(() => Promise.resolve(serverResponse));
        const method = 'POST';
        const data = {foo: 'bar'};
        callApi(endpoint, schema, method, data)
          .then(response => {
            expect(response).toEqual(normalize(serverResponse, schema));
          });
      });
    });

    describe('contains `link` of `nextPageUrl`', () => {
      it('returns `nextPageUrl` in json response', () => {
        const getNextPageUrlMock = jest.spyOn(getNextPageUrl, 'default');
        getNextPageUrlMock.mockReturnValue('https://api.github.com/user/repos?page=3&per_page=100');
        const nextPageUrl = getNextPageUrlMock();

        const method = 'POST';
        callApi(endpoint, schema, method)
          .then(response => {
            expect(response.nextPageUrl).toBe(nextPageUrl);
          });
      });
    });
  });

  describe('sever response error', () => {
    beforeEach(() => {
      axios.mockRestore();
      // default reject
      axios.mockImplementation(() => Promise.reject());
    });

    describe('is `response` error', () => {
      it('return `Promise.reject(error.response.data)`', () => {
        const serverError = {response: {data: 'error'}};
        axios.mockImplementation(() => Promise.reject(serverError));
        callApi(endpoint, schema, method)
          .catch(error => {
            expect(error).toEqual(serverError.response.data);
          });
      });
    });

    describe('is `request` error', () => {
      it('return `Promise.reject({message})`', () => {
        const serverError = {request: {}};
        axios.mockImplementation(() => Promise.reject(serverError));
        callApi(endpoint, schema, method)
          .catch(error => {
            expect(error).toEqual({message: 'The request was made but no response was received'});
          });
      });
    });

    describe('is general error', () => {
      it('return `Promise.reject(error)`', () => {
        const serverError = {};
        axios.mockImplementation(() => Promise.reject(serverError));
        callApi(endpoint, schema, method)
          .catch(error => {
            expect(error).toEqual(serverError);
          });
      });
    });
  });

});
