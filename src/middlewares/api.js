/**
 * Created on 01-Sep-18.
 */
import axios from 'axios';
import { normalize } from 'normalizr';
import { isEmpty } from 'lodash';

// Extracts the next page URL
export const getNextPageUrl = response => {
  const link = response.headers.link;
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.trim().split(';')[0].slice(1, -1);
};


// json server
export const API_ROOT = 'http://localhost:3002';

// nodejs dev server
// export const API_ROOT = 'http://localhost:4000/api';


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = (endpoint, schema, method, data = {}) => {
  const url = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return axios({
    url,
    method,
    // for deletion, we don't want to send data, but we still need data to return as action's payload.
    data: method === 'DELETE' ? null : data
  })
    .then(response => {
      // in case server return empty of object, i.e. status 204, normalize data that passed in
      const toBeNormalized = isEmpty(response.data) ? data : response.data;
      const {entities, result} = normalize(toBeNormalized, schema);
      const json = {
        entities,
        result
      };
      const nextPageUrl = getNextPageUrl(response);
      if (nextPageUrl) {
        json.nextPageUrl = nextPageUrl;
      }
      // other header fields
      return json;

    }).catch(error => {
      if (error.response) {
        return Promise.reject(error.response.data);
      } else if (error.request) {
        return Promise.reject({message: 'The request was made but no response was received'});
      } else {
        return Promise.reject(error);
      }
    })

};


// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {endpoint} = callAPI;
  const {schema, types, method, data = null} = callAPI;

  // endpoint from selector
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (typeof method !== 'string') {
    throw new Error('Specify a string method.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({type: requestType}));

  return callApi(endpoint, schema, method, data).then(
    response => next(actionWith({
      type: successType,
      payload: response
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
