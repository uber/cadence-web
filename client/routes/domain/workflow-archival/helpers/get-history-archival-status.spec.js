import getHistoryArchivalStatus from './get-history-archival-status';

describe('getHistoryArchivalStatus', () => {
  describe('When domainSettings is not defined', () => {
    it('should return "".', () => {
      const domainSettings = undefined;
      const output = getHistoryArchivalStatus(domainSettings);

      expect(output).toEqual('');
    });
  });

  describe('When domainSettings.configuration.historyArchivalStatus = "ENABLED"', () => {
    it('should return "ENABLED".', () => {
      const domainSettings = {
        configuration: {
          historyArchivalStatus: 'ENABLED',
        },
      };
      const output = getHistoryArchivalStatus(domainSettings);

      expect(output).toEqual('ENABLED');
    });
  });
});
