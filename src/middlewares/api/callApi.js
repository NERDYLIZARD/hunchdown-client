/**
 * Created on 15-Sep-18.
 */
import axios from 'axios/index';
import { isEmpty } from 'lodash';
import { normalize } from 'normalizr';
import getNextPageUrl from './getNextPageUrl';

// json server
export const API_ROOT = 'http://localhost:3002';

// nodejs dev server
// export const API_ROOT = 'http://localhost:4000/api';


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export default (endpoint, schema, method, data = {}) => {
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
