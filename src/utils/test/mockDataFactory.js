/**
 * Created on 11-May-18.
 */
import faker from 'faker';

export const generateHunch = () => ({
  id: faker.random.uuid(),
  slug: faker.random.uuid(),
  wisdom: faker.lorem.sentences(),
  attribute: faker.name.findName(),
});

export const generateBox = () => ({
  id: faker.random.uuid(),
  title: faker.random.word(),
  description: faker.lorem.sentence(),
});
