import isHistoryArchivalS3Store from './is-history-archival-s3-store';

describe('isHistoryArchivalS3', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isHistoryArchivalS3Store(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "gs://my-bucket-cad/cadence_archival/development"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'gs://my-bucket-cad/cadence_archival/development',
        },
      };
      const output = isHistoryArchivalS3Store(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.historyArchivalURI = "s3://cadence-archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 's3://cadence-archival/development',
        },
      };
      const output = isHistoryArchivalS3Store(domainSettings);

      expect(output).toEqual(true);
    });
  });
  describe('When domainSettings.configuration.historyArchivalURI = "S3://cadence-archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'S3://cadence-archival/development',
        },
      };
      const output = isHistoryArchivalS3Store(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
