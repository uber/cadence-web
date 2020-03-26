export const getDomain = domainSettings =>
  domainSettings && domainSettings.domainInfo.name || '';

export const getHistoryArchivalStatus = domainSettings =>
  domainSettings && domainSettings.configuration.historyArchivalStatus || '';

export const getVisibilityArchivalStatus = domainSettings =>
  domainSettings && domainSettings.configuration.visibilityArchivalStatus || '';

export const isHistoryArchivalEnabled = domainSettings =>
  getHistoryArchivalStatus(domainSettings) === 'ENABLED';

export const isVisibilityArchivalEnabled = domainSettings =>
  getVisibilityArchivalStatus(domainSettings) === 'ENABLED';

export const replaceDomain = (message, domainSettings) =>
  message.replace(/\{domain\}/, getDomain(domainSettings));
