import getVisibilityArchivalStatus from './get-visibility-archival-status';

describe('getVisibilityArchivalStatus', () => {
  describe('When domainSettings is not defined', () => {
    it('should return "".', () => {
      const domainSettings = undefined;
      const output = getVisibilityArchivalStatus(domainSettings);

      expect(output).toEqual('');
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalStatus = "ENABLED"', () => {
    it('should return "ENABLED".', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalStatus: 'ENABLED',
        },
      };
      const output = getVisibilityArchivalStatus(domainSettings);

      expect(output).toEqual('ENABLED');
    });
  });
});
