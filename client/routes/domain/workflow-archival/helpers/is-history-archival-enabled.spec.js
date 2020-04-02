import isHistoryArchivalEnabled from './is-history-archival-enabled';

describe('isHistoryArchivalEnabled', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isHistoryArchivalEnabled(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalStatus = "DISABLED"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalStatus: 'DISABLED',
        },
      };
      const output = isHistoryArchivalEnabled(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalStatus = "ENABLED"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalStatus: 'ENABLED',
        },
      };
      const output = isHistoryArchivalEnabled(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
