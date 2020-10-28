import getHistoryArchivalUri from './get-history-archival-uri';

describe('getHistoryArchivalURI', () => {
  describe('When domainSettings is not defined', () => {
    it('should return "".', () => {
      const domainSettings = undefined;
      const output = getHistoryArchivalUri(domainSettings);

      expect(output).toEqual('');
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "file:///tmp/cadence_archival/development"', () => {
    it('should return "file:///tmp/cadence_archival/development".', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'file:///tmp/cadence_archival/development',
        },
      };
      const output = getHistoryArchivalUri(domainSettings);

      expect(output).toEqual('file:///tmp/cadence_archival/development');
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "s3://cadence-development"', () => {
    it('should return "s3://cadence-development".', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 's3://cadence-development',
        },
      };
      const output = getHistoryArchivalUri(domainSettings);

      expect(output).toEqual('s3://cadence-development');
    });
  });
});
