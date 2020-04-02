import getVisibilityArchivalStatus from './get-visibility-archival-status';
export default domainSettings =>
  getVisibilityArchivalStatus(domainSettings) === 'ENABLED';
