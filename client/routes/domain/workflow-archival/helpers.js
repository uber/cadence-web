import get from 'lodash-es/get';

export const getDomain = domainSettings =>
  get(domainSettings, 'domainInfo.name', '');

export const getHistoryArchivalStatus = domainSettings =>
  get(domainSettings, 'configuration.historyArchivalStatus', '');

export const getVisibilityArchivalStatus = domainSettings =>
  get(domainSettings, 'configuration.visibilityArchivalStatus', '');

export const isHistoryArchivalEnabled = domainSettings =>
  getHistoryArchivalStatus(domainSettings) === 'ENABLED';

export const isVisibilityArchivalEnabled = domainSettings =>
  getVisibilityArchivalStatus(domainSettings) === 'ENABLED';

export const isArchivalEnabled = domainSettings =>
  isHistoryArchivalEnabled(domainSettings) &&
  isVisibilityArchivalEnabled(domainSettings);

export const replaceDomain = (message, domainSettings) =>
  message.replace(/\{domain\}/, getDomain(domainSettings));
