import isHistoryArchivalFileStore from './is-history-archival-file-store';
import isVisibilityArchivalFileStore from './is-visibility-archival-file-store';

export default domainSettings =>
  isHistoryArchivalFileStore(domainSettings) &&
  isVisibilityArchivalFileStore(domainSettings);
