import isHistoryArchivalFileStore from './is-history-archival-file-store';

describe('isHistoryArchivalS3', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isHistoryArchivalFileStore(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "s3://cadence-archival/development"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 's3://cadence-archival/development',
        },
      };
      const output = isHistoryArchivalFileStore(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "file:///tmp/cadence_archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'file:///tmp/cadence_archival/development',
        },
      };
      const output = isHistoryArchivalFileStore(domainSettings);

      expect(output).toEqual(true);
    });
  });
  describe('When domainSettings.configuration.historyArchivalURI = "File:///tmp/cadence_archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'File:///tmp/cadence_archival/development',
        },
      };
      const output = isHistoryArchivalFileStore(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
