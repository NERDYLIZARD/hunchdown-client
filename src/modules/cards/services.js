/**
 * Created on 12-May-18.
 */
import agent from '../../utils/agent';

const limit = (page, perPage) => `page=${page ? page * perPage : 1}&perPage=${perPage}`;

const cardServices = {
  find: (page) =>
    agent.get(`/cards?${limit(page, 12)}`),
  get: (slug) =>
    agent.get(`/cards/${slug}`),
  create: (card) =>
    agent.post('/cards', card),
  update: (card) =>
    agent.patch(`/cards/${card.slug}`, card),
  delete: (card) =>
    agent.delete(`/cards/${card.slug}`),
};

export default cardServices;
