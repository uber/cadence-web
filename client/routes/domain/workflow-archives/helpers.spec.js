import {
  isHistoryArchivalEnabled,
  isVisibilityArchivalEnabled,
} from './helpers';

describe('workflow-archives helpers', () => {
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


});