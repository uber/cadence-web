import isHistoryArchivalS3Store from './is-history-archival-s3-store';
import isVisibilityArchivalS3Store from './is-visibility-archival-s3-store';

export default domainSettings =>
  isHistoryArchivalS3Store(domainSettings) &&
  isVisibilityArchivalS3Store(domainSettings);
