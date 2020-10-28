import isHistoryArchivalGcloud from './is-history-archival-gcloud';
import isVisibilityArchivalGcloud from './is-visibility-archival-gcloud';

export default domainSettings =>
  isHistoryArchivalGcloud(domainSettings) &&
  isVisibilityArchivalGcloud(domainSettings);
