import isHistoryArchivalGcloud from './is-history-archival-gcloud';

describe('isHistoryArchivalS3', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isHistoryArchivalGcloud(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "file://cadence-archival/development"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'file://cadence-archival/development',
        },
      };
      const output = isHistoryArchivalGcloud(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "gs://my-bucket-cad/cadence_archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'gs:///tmp/cadence_archival/development',
        },
      };
      const output = isHistoryArchivalGcloud(domainSettings);

      expect(output).toEqual(true);
    });
  });
  describe('When domainSettings.configuration.historyArchivalURI = "Gs://my-bucket-cad/cadence_archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'Gs://my-bucket-cad/cadence_archival/development',
        },
      };
      const output = isHistoryArchivalGcloud(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
