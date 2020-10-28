import isArchivalFileStore from './is-archival-file-store';

describe('isArchivalEnabled', () => {
  describe('When historyArchivalURI = "s3://cadence-archival/history" and visibilityArchivalURI = "s3://cadence-archival/visibility"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 's3://cadence-archival/history',
          visibilityArchivalURI: 's3://cadence-archival/visibility',
        },
      };
      const output = isArchivalFileStore(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When historyArchivalURI = "file:///tmp/cadence_archival/history" and visibilityArchivalURI = "s3://cadence-archival/visibility"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'file:///tmp/cadence_archival/history',
          visibilityArchivalURI: 's3://cadence-archival/visibility',
        },
      };
      const output = isArchivalFileStore(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When historyArchivalURI = "s3://cadence-archival/history" and visibilityArchivalURI = "file:///tmp/cadence_archival/visibility"', () => {
    it('should return false.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 's3://cadence-archival/history',
          visibilityArchivalURI: 'file:///tmp/cadence_archival/visibility',
        },
      };
      const output = isArchivalFileStore(domainSettings);

      expect(output).toEqual(false);
    });
  });

  describe('When historyArchivalURI = "file:///tmp/cadence_archival/history" and visibilityArchivalURI = "file:///tmp/cadence_archival/visibility"', () => {
    it('should return true.', () => {
      const domainSettings = {
        configuration: {
          historyArchivalURI: 'file:///tmp/cadence_archival/history',
          visibilityArchivalURI: 'file:///tmp/cadence_archival/visibility',
        },
      };
      const output = isArchivalFileStore(domainSettings);

      expect(output).toEqual(true);
    });
  });
});
