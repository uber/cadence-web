import getHistoryArchivalStatus from './get-history-archival-status';

export default domainSettings =>
  getHistoryArchivalStatus(domainSettings) === 'ENABLED';
