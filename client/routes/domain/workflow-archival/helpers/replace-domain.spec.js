import replaceDomain from './replace-domain';

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
