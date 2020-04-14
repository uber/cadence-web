import { isFlagEnabled, mapFlagsToHash } from './helpers';

describe('feature-flag helpers', () => {
  describe('isFlagEnabled', () => {
    it('should return false when passed name = "workflow-terminate" and flagHash = {}.', () => {
      const name = 'workflow-terminate';
      const flagHash = {};
      const output = isFlagEnabled({ flagHash, name });

      expect(output).toEqual(false);
    });

    it('should return true when passed name = "workflow-terminate" and flagHash = { "workflow-terminate": true }.', () => {
      const name = 'workflow-terminate';
      const flagHash = { 'workflow-terminate': true };
      const output = isFlagEnabled({ flagHash, name });

      expect(output).toEqual(true);
    });

    it('should return false when passed name = "workflow-terminate" and flagHash = { "workflow-terminate": false }.', () => {
      const name = 'workflow-terminate';
      const flagHash = { 'workflow-terminate': false };
      const output = isFlagEnabled({ flagHash, name });

      expect(output).toEqual(false);
    });
  });

  describe('mapFlagsToHash', () => {
    it('should return { "workflow-terminate": true } when passed flagArray = [{ key: "workflow-terminate", value: true }].', () => {
      const flagArray = [{ key: 'workflow-terminate', value: true }];
      const output = mapFlagsToHash(flagArray);

      expect(output).toEqual({ 'workflow-terminate': true });
    });
  });
});
