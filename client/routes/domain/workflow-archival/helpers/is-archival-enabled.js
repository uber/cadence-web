import isHistoryArchivalEnabled from './is-history-archival-enabled';
import isVisibilityArchivalEnabled from './is-visibility-archival-enabled';

export default domainSettings =>
  isHistoryArchivalEnabled(domainSettings) &&
  isVisibilityArchivalEnabled(domainSettings);
