/**
 * Created on 10-May-18.
 */
import axios from 'axios';

// json server
const API_ROOT = 'http://localhost:3002';

// nodejs dev server
// const API_ROOT = 'http://localhost:4000/api';

const responseData = response => response.data;

const get = endpoint => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  return axios.get(fullUrl).then(response => response);
};
const post = (url, body) =>
  axios.post(`${API_ROOT}${url}`, body).then(responseData);
const put = (url, body) =>
  axios.put(`${API_ROOT}${url}`, body).then(responseData);
const patch = (url, body) =>
  axios.patch(`${API_ROOT}${url}`, body).then(responseData);
const del = url =>
  axios.delete(`${API_ROOT}${url}`).then(responseData);


export default {
  get, post, put, patch, delete: del
};
