/**
 * Created on 12-May-18.
 */
import agent from '../../utils/agent';

const limit = (page, perPage) => `page=${page ? page * perPage : 1}&perPage=${perPage}`;

const boxServices = {
  find: (page) =>
    agent.get(`/boxes?${limit(page, 12)}`),
  get: (id) =>
    agent.get(`/boxes/${id}`),
  create: (box) =>
    agent.post('/boxes', box),
  update: (box) =>
    agent.patch(`/boxes/${box.id}`, box),
  delete: (box) =>
    agent.delete(`/boxes/${box.id}`),
};

export default boxServices;
