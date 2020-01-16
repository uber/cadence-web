import {
  MAXIMUM_JSON_CHARACTER_LIMIT,
  MAXIMUM_JSON_MESSAGE
} from '../constants';

const getStringElipsis = jsonString =>
  jsonString.length < MAXIMUM_JSON_CHARACTER_LIMIT
    ? jsonString
    : jsonString.substring(0, MAXIMUM_JSON_CHARACTER_LIMIT) + MAXIMUM_JSON_MESSAGE;

export default getStringElipsis;
