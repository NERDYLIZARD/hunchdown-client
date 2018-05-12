/**
 * Created on 12-May-18.
 */
const faker = require('faker');

module.exports = function (req, res, next) {
  // if it POST /cards manual generate id = slug for an illusion of having slug as id
  if (req.method === 'POST' && req.url === '/cards/') {
    const id = faker.random.uuid();
    req.body['id'] = id;
    req.body['slug'] = id;
  }
  // Continue to JSON Server router
  next();
};
