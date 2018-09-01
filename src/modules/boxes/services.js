/**
 * Created on 12-May-18.
 */
import agent from '../../utils/agent';
import { normalize } from 'normalizr';
import { boxSchema } from '../../normalizr-schema';


// Extracts the next page URL from Github API response.
const getNextPageUrl = response => {
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

const boxServices = {
  find: (url) => {
    return agent.get(url).then(response => {
      const {entities, result} = normalize(response.data, [boxSchema]);
      return {
        entities,
        result,
        nextPageUrl: getNextPageUrl(response),
      }
    });
  },
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
