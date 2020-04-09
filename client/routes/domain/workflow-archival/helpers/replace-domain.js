import getDomain from './get-domain';

export default (message, domainSettings) =>
  message.replace(/\{domain\}/, getDomain(domainSettings));
