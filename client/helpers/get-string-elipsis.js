import { MAXIMUM_JSON_CHARACTER_LIMIT, MAXIMUM_JSON_MESSAGE } from '~constants';

const getStringElipsis = input =>
  input.length < MAXIMUM_JSON_CHARACTER_LIMIT
    ? input
    : input.substring(0, MAXIMUM_JSON_CHARACTER_LIMIT) + MAXIMUM_JSON_MESSAGE;

export default getStringElipsis;
