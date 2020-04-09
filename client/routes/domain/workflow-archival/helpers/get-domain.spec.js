import getDomain from './get-domain';

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
