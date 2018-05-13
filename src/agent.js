/**
 * Created on 10-May-18.
 */
import axios from 'axios';

const API_ROOT = 'http://localhost:3002';

const responseData = response => response.data;

const get = url =>
  axios.get(`${API_ROOT}${url}`).then(responseData);
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
