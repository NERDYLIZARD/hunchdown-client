/**
 * Created on 11-May-18.
 */
import _ from 'lodash';
import faker from 'faker';

const createCard = () => ({
  slug: faker.random.uuid(),
  wisdom: faker.lorem.sentences(),
  attribute: faker.name.findName(),
});

const covertObjectToAssociativeArray = (object, key = 'id') => {
  return _.mapKeys(object, key);
};

const omitIdentifier = (object, key = 'id') => {
  return _.omit(object, key)
};

export default { createCard, covertObjectToAssociativeArray, omitIdentifier };
