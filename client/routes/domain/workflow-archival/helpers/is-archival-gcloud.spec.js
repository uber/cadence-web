import isArchivalGcloud from './is-archival-gcloud';

describe('isArchivalEnabled', () => {
  describe('When historyArchivalURI = "s3://cadence-archival/history" and visibilityArchivalURI = "s3://cadence-archival/visibility"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 's3://cadence-archival/history',
          visibilityArchivalURI: 's3://cadence-archival/visibility',
        },
      };
      const output = isArchivalGcloud(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When historyArchivalURI = "gs://my-bucket-cad/cadence_archival/development" and visibilityArchivalURI = "s3://cadence-archival/visibility"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'gs://my-bucket-cad/cadence_archival/development',
          visibilityArchivalURI: 's3://cadence-archival/visibility',
        },
      };
      const output = isArchivalGcloud(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When historyArchivalURI = "s3://cadence-archival/history" and visibilityArchivalURI = "gs://my-bucket-cad/cadence_archival/visibility"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 's3://cadence-archival/history',
          visibilityArchivalURI:
            'gs://my-bucket-cad/cadence_archival/visibility',
        },
      };
      const output = isArchivalGcloud(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When historyArchivalURI = "gs://my-bucket-cad/cadence_archival/development" and visibilityArchivalURI = "gs://my-bucket-cad/cadence_archival/visibility"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'gs://my-bucket-cad/cadence_archival/development',
          visibilityArchivalURI:
            'gs://my-bucket-cad/cadence_archival/visibility',
        },
      };
      const output = isArchivalGcloud(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
