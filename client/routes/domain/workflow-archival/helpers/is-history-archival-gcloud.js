import getHistoryArchivalUri from './get-history-archival-uri';

export default domainSettings =>
  /^gs:\/\/.*/gim.test(getHistoryArchivalUri(domainSettings));
