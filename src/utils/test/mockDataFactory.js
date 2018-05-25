/**
 * Created on 11-May-18.
 */
import faker from 'faker';

const createHunch = () => ({
  id: faker.random.uuid(),
  slug: faker.random.uuid(),
  wisdom: faker.lorem.sentences(),
  attribute: faker.name.findName(),
});

export default { createHunch };
