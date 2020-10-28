import isVisibilityArchivalS3Store from './is-visibility-archival-s3-store';

describe('isVisibilityArchivalS3', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isVisibilityArchivalS3Store(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "file:///tmp/cadence_vis_archival/development"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 'file:///tmp/cadence_vis_archival/development',
        },
      };
      const output = isVisibilityArchivalS3Store(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "s3://cadence-vis-archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 's3://cadence-vis-archival/development',
        },
      };
      const output = isVisibilityArchivalS3Store(domainSettings);

      expect(output).toEqual(true);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "S3://cadence-vis-archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 'S3://cadence-vis-archival/development',
        },
      };
      const output = isVisibilityArchivalS3Store(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
