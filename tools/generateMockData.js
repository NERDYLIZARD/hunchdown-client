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
import jsf from 'json-schema-faker';
import mockDataSchema from '../src/api/models/mockDataSchema';
import { chalkError, chalkSuccess } from './chalkConfig';


jsf.extend('faker', () => faker);

jsf.option({
  optionalsProbability: 0.8
});

const json = JSON.stringify(jsf(mockDataSchema));

fs.writeFile("./src/api/db.json", json, (err) => {
  if (err) {
    console.log(chalkError(err)); // eslint-disable-line no-console
  } else {
    console.log(chalkSuccess("Mock data generated.")); // eslint-disable-line no-console
  }
});