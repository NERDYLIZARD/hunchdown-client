/**
 * Created on 10-May-18.
 */
import axios from 'axios';

const API_ROOT = 'http://localhost:3002';

const responseData = response => response.data;

const requests = {
  delete: url =>
    axios.delete(`${API_ROOT}${url}`).then(responseData),
  get: url =>
    axios.get(`${API_ROOT}${url}`).then(responseData),
  put: (url, body) =>
    axios.put(`${API_ROOT}${url}`, body).then(responseData),
  patch: (url, body) =>
    axios.patch(`${API_ROOT}${url}`, body).then(responseData),
  post: (url, body) =>
    axios.post(`${API_ROOT}${url}`, body).then(responseData)
};


const limit = (page, perPage) => `?page=${page ? page * perPage : 1}&perPage=${perPage}`;

const Cards = {
  find: page =>
    requests.get(`/cards?${limit(page, 12)}`),
  get: id =>
    requests.get(`/cards/${id}`),
  delete: id =>
    requests.delete(`/cards/${id}`),
  create: card =>
    requests.post('/cards', card),
  update: card =>
    requests.patch(`/cards/${card.id}`, card),
};

export default {
  Cards
};
