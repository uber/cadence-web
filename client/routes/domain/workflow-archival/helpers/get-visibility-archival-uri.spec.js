import getVisibilityArchivalUri from './get-visibility-archival-uri';

describe('getVisibilityArchivalUri', () => {
  describe('When domainSettings is not defined', () => {
    it('should return "".', () => {
      const domainSettings = undefined;
      const output = getVisibilityArchivalUri(domainSettings);

      expect(output).toEqual('');
    });
  });

  describe('When domainSettings.configuration.visibilityArchivalURI = "file:///tmp/cadence_archival/development"', () => {
    it('should return "file:///tmp/cadence_archival/development".', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 'file:///tmp/cadence_archival/development',
        },
      };
      const output = getVisibilityArchivalUri(domainSettings);

      expect(output).toEqual('file:///tmp/cadence_archival/development');
    });
  });
  describe('When domainSettings.configuration.visibilityArchivalURI = "s3://cadence-development"', () => {
    it('should return "s3://cadence-development".', () => {
      const domainSettings = {
        configuration: {
          visibilityArchivalURI: 's3://cadence-development',
        },
      };
      const output = getVisibilityArchivalUri(domainSettings);

      expect(output).toEqual('s3://cadence-development');
    });
  });
});
