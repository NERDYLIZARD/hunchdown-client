/**
 * Created on 09-May-18.
 */

export default {
  "type": "object",
  "properties": {
    "hunches": {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "slug": {
            "type": "string",
            "faker": "random.uuid",
            "unique": true
          },
          "wisdom": {
            "type": "string",
            "faker": "lorem.sentences",
            "minLength": "50",
            "maxLength": "100"
          },
          "attribute": {
            "type": "string",
            "faker": "name.findName"
          }
        },
        "required": ["slug", "wisdom"]
      }
    }
  },
  "required": ["hunches"]
};


