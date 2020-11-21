import getHistoryArchivalUri from './get-history-archival-uri';

export default domainSettings =>
  /^file:\/\/.*/gim.test(getHistoryArchivalUri(domainSettings));
