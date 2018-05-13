/**
 * Created on 12-May-18.
 */
const faker = require('faker');

module.exports = function (req, res, next) {

  // if it is POST /cards route, manually generate id = slug for an illusion of having slug as id
  const resource = req.url.split('/')[1];
  if (req.method === 'POST' && resource === 'cards') {
    const id = faker.random.uuid();
    req.body['id'] = id;
    req.body['slug'] = id;
  }
  // Continue to JSON Server router
  next();
};
