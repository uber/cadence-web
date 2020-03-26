import {
  getDomain,
  getHistoryArchivalStatus,
  getVisibilityArchivalStatus,
  isHistoryArchivalEnabled,
  isVisibilityArchivalEnabled,
  replaceDomain,
} from './helpers';

describe('workflow-archives helpers', () => {
  describe('getDomain', () => {
    describe('When domainSettings is not defined', () => {
      it('should return "".', () => {
        const domainSettings = undefined;
        const output = getDomain(domainSettings);
        expect(output).toEqual('');
      });
    });

    describe('When domainSettings.domainInfo.name = "DomainName"', () => {
      it('should return "DomainName".', () => {
        const domainSettings = {
          domainInfo: {
            name: 'DomainName',
          },
        };
        const output = getDomain(domainSettings);
        expect(output).toEqual('DomainName');
      });
    });
  });

  describe('getHistoryArchivalStatus', () => {
    describe('When domainSettings is not defined', () => {
      it('should return "".', () => {
        const domainSettings = undefined;
        const output = getHistoryArchivalStatus(domainSettings);
        expect(output).toEqual('');
      });
    });

    describe('When domainSettings.configuration.historyArchivalStatus = "ENABLED"', () => {
      it('should return "ENABLED".', () => {
        const domainSettings = {
          configuration: {
            historyArchivalStatus: 'ENABLED',
          },
        };
        const output = getHistoryArchivalStatus(domainSettings);
        expect(output).toEqual('ENABLED');
      });
    });
  });

  describe('getVisibilityArchivalStatus', () => {
    describe('When domainSettings is not defined', () => {
      it('should return "".', () => {
        const domainSettings = undefined;
        const output = getVisibilityArchivalStatus(domainSettings);
        expect(output).toEqual('');
      });
    });

    describe('When domainSettings.configuration.visibilityArchivalStatus = "ENABLED"', () => {
      it('should return "ENABLED".', () => {
        const domainSettings = {
          configuration: {
            visibilityArchivalStatus: 'ENABLED',
          },
        };
        const output = getVisibilityArchivalStatus(domainSettings);
        expect(output).toEqual('ENABLED');
      });
    });
  });

  describe('isHistoryArchivalEnabled', () => {
    describe('When domainSettings is not defined', () => {
      it('should return false.', () => {
        const domainSettings = undefined;
        const output = isHistoryArchivalEnabled(domainSettings);
        expect(output).toEqual(false);
      });
    });

    describe('When domainSettings.configuration.historyArchivalStatus = "DISABLED"', () => {
      it('should return false.', () => {
        const domainSettings = {
          configuration: {
            historyArchivalStatus: 'DISABLED',
          },
        };
        const output = isHistoryArchivalEnabled(domainSettings);
        expect(output).toEqual(false);
      });
    });

    describe('When domainSettings.configuration.historyArchivalStatus = "ENABLED"', () => {
      it('should return true.', () => {
        const domainSettings = {
          configuration: {
            historyArchivalStatus: 'ENABLED',
          },
        };
        const output = isHistoryArchivalEnabled(domainSettings);
        expect(output).toEqual(true);
      });
    });
  });

  describe('isVisibilityArchivalEnabled', () => {
    describe('When domainSettings is not defined', () => {
      it('should return false.', () => {
        const domainSettings = undefined;
        const output = isVisibilityArchivalEnabled(domainSettings);
        expect(output).toEqual(false);
      });
    });

    describe('When domainSettings.configuration.visibilityArchivalStatus = "DISABLED"', () => {
      it('should return false.', () => {
        const domainSettings = {
          configuration: {
            visibilityArchivalStatus: 'DISABLED',
          },
        };
        const output = isVisibilityArchivalEnabled(domainSettings);
        expect(output).toEqual(false);
      });
    });

    describe('When domainSettings.configuration.visibilityArchivalStatus = "ENABLED"', () => {
      it('should return true.', () => {
        const domainSettings = {
          configuration: {
            visibilityArchivalStatus: 'ENABLED',
          },
        };
        const output = isVisibilityArchivalEnabled(domainSettings);
        expect(output).toEqual(true);
      });
    });
  });

  describe('replaceDomain', () => {
    describe('When message = "message containing {domain}" and domainSettings.domainInfo.name = "DomainName"', () => {
      it('should return "message containing DomainName".', () => {
        const message = 'message containing {domain}';
        const domainSettings = {
          domainInfo: {
            name: 'DomainName',
          },
        };

        const output = replaceDomain(message, domainSettings);
        expect(output).toEqual('message containing DomainName');
      });
    });
  });
});