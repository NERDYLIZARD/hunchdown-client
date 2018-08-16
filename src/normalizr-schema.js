/**
 * Created on 15-Aug-18.
 */
import { schema } from 'normalizr';

const boxSchema = new schema.Entity('boxes');
const hunchSchema = new schema.Entity('boxes');

hunchSchema.define({
  boxes: [boxSchema],
});

boxSchema.define({
  hunch: [hunchSchema],
});

const hunchesSchema = new schema.Array(hunchSchema);
const boxesSchema = new schema.Array(boxSchema);

export { boxSchema, boxesSchema, hunchSchema, hunchesSchema};
