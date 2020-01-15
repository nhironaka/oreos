const { DIFFICULTY, STATUSES } = require('../../constants/problem');


module.exports = [{
  "id": "title",
  "label": "Title",
  "type": {
    "id": "string",
    "properties": {
      "type": "text"
    }
  }
},
{
  "id": "question",
  "label": "Question",
  "type": {
    "id": "string",
    "properties": {
      "type": "text"
    }
  }
},
{
  "id": "difficulty",
  "label": "Difficulty",
  "type": {
    "id": "singleSelect",
    "properties": {
      "type": "text",
      "options": [...DIFFICULTY]
    }
  },
},
{
  "id": "status",
  "label": "Status",
  "type": {
    "id": "singleSelect",
    "properties": {
      "type": "text",
      "options": [...STATUSES]
    }
  }
}]