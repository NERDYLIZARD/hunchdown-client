/**
 * Created on 12-May-18.
 */
import agent from '../../utils/agent';

const limit = (page, perPage) => `page=${page ? page * perPage : 1}&perPage=${perPage}`;

const hunchServices = {
  find: (page) =>
    agent.get(`/hunches?${limit(page, 12)}`),
  get: (slug) =>
    agent.get(`/hunches/${slug}`),
  create: (hunch) =>
    agent.post('/hunches', hunch),
  update: (hunch) =>
    agent.patch(`/hunches/${hunch.slug}`, hunch),
  delete: (hunch) =>
    agent.delete(`/hunches/${hunch.slug}`),
};

export default hunchServices;
