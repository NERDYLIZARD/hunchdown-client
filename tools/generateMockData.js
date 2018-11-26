/**
 * Created on 09-May-18.
 */
/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

import fs from 'fs';
import faker from 'faker';
import slug from 'slug';
import jsf from 'json-schema-faker';
import mockDataSchema from '../src/utils/api/mock-data-schema';
import { chalkError, chalkSuccess } from './chalkConfig';


jsf.extend('faker', () => faker);

jsf.option({
  resolveJsonPath: true,
  optionalsProbability: 0.8
});

const data = (jsf(mockDataSchema));

/**
 * manually added field
 */
// create slug from wisdom
data.hunches.map(hunch => hunch['slug'] = slug(hunch.wisdom));

const json = JSON.stringify(data);

fs.writeFile("./src/utils/api/db.json", json, (err) => {
  if (err) {
    console.log(chalkError(err)); // eslint-disable-line no-console
  } else {
    console.log(chalkSuccess("Mock data generated.")); // eslint-disable-line no-console
  }
});
