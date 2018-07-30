/**
 * Created on 09-May-18.
 */
export default {
  "type": "object",
  "properties": {
    "hunches": {
      "type": "array",
      "minItems": 2,
      "maxItems": 3,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "faker": "random.uuid",
            "unique": "true"
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
          },
          "boxes": {
            "type": "array",
            "minItems": 1,
            "maxItems": 2,
            "items": {
              "type": "string",
              "jsonPath": "$..boxes[*].id"
            }
          }
        },
        "required": ["id", "wisdom"]
      }
    },
    "boxes": {
      "type": "array",
      "minItems": 2,
      "maxItems": 3,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "faker": "random.uuid",
            "unique": "true"
          },
          "title": {
            "type": "string",
            "faker": "random.word"
          },
          "description": {
            "type": "string",
            "faker": "lorem.sentence"
          },
          "hunches": {
            "type": "array",
            "minItems": 1,
            "maxItems": 2,
            "items": {
              "type": "string",
              "jsonPath": "$..hunches[*].id"
            }
          }
        },
        "required": ["id", "title"]
      }
    }
  },

  "required": ["hunches", "boxes"]
}
