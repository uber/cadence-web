import isVisibilityArchivalFileStore from './is-visibility-archival-file-store';

describe('isVisibilityArchivalS3', () => {
  describe('When domainSettings is not defined', () => {
    it('should return false.', () => {
      const domainSettings = undefined;
      const output = isVisibilityArchivalFileStore(domainSettings);

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
      const output = isVisibilityArchivalFileStore(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "file:///tmp/cadence_vis_archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 'file:///tmp/cadence_vis_archival/development',
        },
      };
      const output = isVisibilityArchivalFileStore(domainSettings);

      expect(output).toEqual(true);
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "File:///tmp/cadence_vis_archival/development"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 'File:///tmp/cadence_vis_archival/development',
        },
      };
      const output = isVisibilityArchivalFileStore(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
