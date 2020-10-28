import isVisibilityArchivalGcloud from './is-visibility-archival-gcloud';

describe('isVisibilityArchivalS3', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isVisibilityArchivalGcloud(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "s3://cadence-vis-archival/development"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 's3://cadence-archival/development',
        },
      };
      const output = isVisibilityArchivalGcloud(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "gs://my-bucket-cad/cadence_archival/visibility"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI:
            'gs://my-bucket-cad/cadence_archival/visibility',
        },
      };
      const output = isVisibilityArchivalGcloud(domainSettings);

      expect(output).toEqual(true);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "Gs://my-bucket-cad/cadence_archival/visibility"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI:
            'Gs://my-bucket-cad/cadence_archival/visibility',
        },
      };
      const output = isVisibilityArchivalGcloud(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
