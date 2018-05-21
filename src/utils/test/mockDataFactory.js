/**
 * Created on 11-May-18.
 */
import faker from 'faker';

const createHunch = () => ({
  slug: faker.random.uuid(),
  wisdom: faker.lorem.sentences(),
  attribute: faker.name.findName(),
});

export default { createHunch };
