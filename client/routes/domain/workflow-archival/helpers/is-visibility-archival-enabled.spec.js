import isVisibilityArchivalEnabled from './is-visibility-archival-enabled';

describe('isVisibilityArchivalEnabled', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isVisibilityArchivalEnabled(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalStatus = "DISABLED"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalStatus: 'DISABLED',
        },
      };
      const output = isVisibilityArchivalEnabled(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalStatus = "ENABLED"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalStatus: 'ENABLED',
        },
      };
      const output = isVisibilityArchivalEnabled(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
