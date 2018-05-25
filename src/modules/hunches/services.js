/**
 * Created on 12-May-18.
 */
import agent from '../../utils/agent';

const limit = (page, perPage) => `page=${page ? page * perPage : 1}&perPage=${perPage}`;

const hunchServices = {
  find: (page) =>
    agent.get(`/hunches?${limit(page, 12)}`),
  get: (id) =>
    agent.get(`/hunches/${id}`),
  create: (hunch) =>
    agent.post('/hunches', hunch),
  update: (hunch) =>
    agent.patch(`/hunches/${hunch.id}`, hunch),
  delete: (hunch) =>
    agent.delete(`/hunches/${hunch.id}`),
};

export default hunchServices;
