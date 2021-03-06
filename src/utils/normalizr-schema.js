/**
 * Created on 15-Aug-18.
 */
// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
import { schema } from 'normalizr';

const hunchSchema = new schema.Entity('hunches');

const boxSchema = new schema.Entity('boxes', {
  hunches: [hunchSchema],
});

hunchSchema.define({
  boxes: [boxSchema]
});

export { boxSchema, hunchSchema };
