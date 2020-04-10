import { isEnabled, mapFlagsToHash } from './helpers';

describe('feature-flag helpers', () => {
  describe('isEnabled', () => {
    describe('When passed name = "workflow-terminate" and flagHash = { "workflow-terminate": true }', () => {
      it('should return true.', () => {
        const name = 'workflow-terminate';
        const flagHash = { 'workflow-terminate': true };
        const output = isEnabled({ flagHash, name });
        expect(output).toEqual(true);
      });
    });

    describe('When passed name = "workflow-terminate" and flagHash = { "workflow-terminate": false }', () => {
      it('should return false.', () => {
        const name = 'workflow-terminate';
        const flagHash = { 'workflow-terminate': false };
        const output = isEnabled({ flagHash, name });
        expect(output).toEqual(false);
      });
    });
  });

  describe('mapFlagsToHash', () => {
    describe('When passed flagArray = [{ name: "workflow-terminate", value: true }]', () => {
      it('should return { "workflow-terminate": true }.', () => {
        const flagArray = [
          { name: 'workflow-terminate', value: true }
        ];
        const output = mapFlagsToHash(flagArray);
        expect(output).toEqual({ 'workflow-terminate': true });
      });
    });
  });
});
