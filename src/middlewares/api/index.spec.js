/**
 * Created on 11-Sep-18.
 */
import * as apiMiddleware from './index';
import * as callApi from './callApi';

const {CALL_API, default: middleware} = apiMiddleware;

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

  describe('when `callApi` returns `response`', () => {

    it('dispatches `successType` action with `payload = response`', () => {
      const callApiResponse = {foo: 'bar'};

      const mockedCallApi = jest.spyOn(callApi, 'default');
      mockedCallApi.mockReturnValue(Promise.resolve(callApiResponse));

      // bug: middleware calls the actual callApi() instead of the mock version
      middleware(store)(next)(action)
        .then(() => {
          expect(mockedCallApi).toBeCalled();
          expect(next.mock.calls).toEqual([
            [{type: requestType}],
            [{type: successType, payload: callApiResponse}]
          ]);
        });
    });
  });

  describe('when `callApi` returns `error`', () => {

    describe('when `error` has `message`', () => {
      it('dispatches `failureType` action with `error = error.message`', () => {
        const callApiError = {message: 'error message.'};
        const mockedCallApi = jest.spyOn(callApi, 'default');
        mockedCallApi.mockReturnValue(Promise.reject(callApiError));

        middleware(store)(next)(action)
          .then(() => {
            expect(mockedCallApi).toBeCalled();
            expect(next.mock.calls).toEqual([
              [{type: requestType}],
              [{type: failureType, error: callApiError.message}]
            ]);
          });
      });
    });

    describe('when `error` has no `message`', () => {
      it('dispatches `failureType` action with default message', () => {
        const callApiError = {message: undefined};
        const mockedCallApi = jest.spyOn(callApi, 'default');
        mockedCallApi.mockReturnValue(Promise.reject(callApiError));

        middleware(store)(next)(action)
          .then(() => {
            expect(mockedCallApi).toBeCalled();
            expect(next.mock.calls).toEqual([
              [{type: requestType}],
              [{type: failureType, error: 'Something bad happened'}]
            ]);
          });
      });
    });

  });
});
