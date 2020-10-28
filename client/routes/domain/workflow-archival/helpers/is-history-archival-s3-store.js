import getHistoryArchivalUri from './get-history-archival-uri';

export default domainSettings =>
  /^s3:\/\/.*/gim.test(getHistoryArchivalUri(domainSettings));
