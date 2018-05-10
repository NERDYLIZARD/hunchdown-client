/**
 * Created on 09-May-18.
 */

export default {
  "type": "object",
  "properties": {
    "cards": {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "faker": "random.uuid",
            "unique": true,
            "minLength": 16,
            "maxLength": 16
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
        "required": ["id", "wisdom"]
      }
    }
  },
  "required": ["cards"]
};
