import { http } from '~helpers';

export default () => {
  return {
    getDomainSettings: domainName => {
      return http(window.fetch, `/api/domains/${domainName}`);
    },
  };
};
