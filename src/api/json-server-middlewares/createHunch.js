/**
 * Created on 12-May-18.
 */
const faker = require('faker');

module.exports = function (req, res, next) {

  // if it is POST /hunches route, manually generate id = slug for an illusion of having slug as id
  const resource = req.url.split('/')[1];
  if (req.method === 'POST' && resource === 'hunches') {
    const id = faker.random.uuid();
    req.body['id'] = id;
    req.body['slug'] = id;
  }
  // Continue to JSON Server router
  next();
};
