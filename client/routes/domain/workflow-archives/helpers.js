export const isHistoryArchivalEnabled = domainSettings =>
  domainSettings && domainSettings.configuration.historyArchivalStatus === 'ENABLED'
  || false;

export const isVisibilityArchivalEnabled = domainSettings =>
  domainSettings && domainSettings.configuration.visibilityArchivalStatus === 'ENABLED'
  || false;

