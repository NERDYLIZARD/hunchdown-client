/**
 * Created on 11-Sep-18.
 */
import * as apiMiddleware from './api';
import { boxSchema as schema } from '../normalizr-schema';
import { normalize } from 'normalizr';
import axios from 'axios';

jest.mock('axios');
const {API_ROOT, CALL_API, default: middleware, callApi, getNextPageUrl} = apiMiddleware;

describe('Api Middleware', () => {

  describe('getNextPageUrl()', () => {
    describe('when `response` argument does not have `link` property', () => {
      it('returns null', () => {
        const response = {headers: {link: undefined}};
        expect(getNextPageUrl(response)).toBe(null);
      });
    });

    describe('when `response` argument has `link` property', () => {
      describe('when `link` string does not contain `next` attribute', () => {
        it('returns null', () => {
          const response = {headers: {link: 'www.linkdoesnotcontainnext.com'}};
          expect(getNextPageUrl(response)).toBe(null);
        });
      });

      describe('when `link` string contains `next` attribute', () => {
        it('extracts `next` link', () => {
          const response = {
            headers: {
              link: '<https://api.github.com/user/repos?page=3&per_page=100>; rel="next",\n' +
              '  <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"'
            }
          };
          expect(getNextPageUrl(response)).toBe('https://api.github.com/user/repos?page=3&per_page=100');
        });
      });
    });
  });


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
          const getNextPageUrl = jest.spyOn(apiMiddleware, 'getNextPageUrl');
          getNextPageUrl.mockReturnValue('https://api.github.com/user/repos?page=3&per_page=100');
          const nextPageUrl = getNextPageUrl();

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


  describe('apiMiddleware', () => {
    const store = {getState: jest.fn()};
    const next = jest.fn();
    const requestType = 'REQUEST';
    const successType = 'SUCCESS';
    const failureType = 'FAILURE';
    let action;

    beforeEach(() => {
      // clear the result of the previous calls
      next.mockClear();
      action = {
        [CALL_API]: {
          endpoint: '/hunch/id',
          method: 'POST',
          schema: {},
          types: [requestType, successType, failureType]
        }
      };
    });

    it(`ignores the action that does not have property '${CALL_API}'`, () => {
      const action = {type: 'NO CALL_API PROPERTY'};
      middleware(store)(next)(action);
      expect(next).toBeCalledWith(action);
    });

    describe('when `endpoint` is a selector', () => {
      const endpoint = jest.fn().mockImplementation(() => 'endpointString');
      it('calls `endpoint()` to obtain string `endpoint`', () => {
        action[CALL_API].endpoint = endpoint;
        middleware(store)(next)(action);
        expect(endpoint).toBeCalledWith(store.getState());
      });

    });

    it('throws an error when `endpoint` is not a string', () => {
      action[CALL_API].endpoint = undefined;
      expect(() => middleware(store)(next)(action)).toThrowError('Specify a string endpoint URL.');
    });

    it('throws an error when `method` is not a string', () => {
      action[CALL_API].method = undefined;
      expect(() => middleware(store)(next)(action)).toThrowError('Specify a string method.');
    });

    it('throws an error when no `schema` is passed', () => {
      action[CALL_API].schema = undefined;
      expect(() => middleware(store)(next)(action)).toThrowError('Specify one of the exported Schemas.');
    });

    it('throws an error when length of `types` is not 3', () => {
      action[CALL_API].types = ['SUCCESS', 'FAILURE'];
      expect(() => middleware(store)(next)(action)).toThrowError('Expected an array of three action types.');
    });

    it('throws an error when `types` are not a string', () => {
      action[CALL_API].types = [1, 'SUCCESS', 'FAILURE'];
      expect(() => middleware(store)(next)(action)).toThrowError('Expected action types to be strings.');
    });

    it('dispatches `requestType` action', () => {
      middleware(store)(next)(action);
      expect(next).toBeCalledWith({type: requestType})
    });

    describe.skip('when `callApi` returns `response`', () => {

      it('dispatches `successType` action with `payload = response`', () => {
        const response = {foo: 'bar'};

        const callApi = jest.spyOn(apiMiddleware, 'callApi');
        callApi.mockReturnValue(Promise.resolve(response));

        // bug: middleware calls the actual callApi() instead of the mock version
        middleware(store)(next)(action);
        expect(next.mock.calls).toEqual([
          {type: requestType},
          {type: successType, payload: response}
        ]);
      });
    });


  });
});
