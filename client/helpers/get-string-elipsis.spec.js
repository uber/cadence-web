import getStringElipsis from './get-string-elipsis';
import { MAXIMUM_JSON_CHARACTER_LIMIT, MAXIMUM_JSON_MESSAGE } from '~constants';

describe('getStringElipsis', () => {
  describe('when passed a string that has a length less than MAXIMUM_JSON_CHARACTER_LIMIT', () => {
    it('should return the original string', () => {
      const input = 'a-short-string';
      const output = getStringElipsis(input);

      expect(output).toEqual('a-short-string');
    });
  });
  describe('when passed a string that has a length equal to MAXIMUM_JSON_CHARACTER_LIMIT', () => {
    it('should return a substring of the original string up until the limit and display a message.', () => {
      const input = ''.padEnd(MAXIMUM_JSON_CHARACTER_LIMIT, '_');
      const output = getStringElipsis(input);

      expect(output).toEqual(input + MAXIMUM_JSON_MESSAGE);
    });
  });
});
