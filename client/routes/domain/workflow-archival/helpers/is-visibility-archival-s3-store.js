import getVisibilityArchivalUri from './get-visibility-archival-uri';

export default domainSettings =>
  /^s3:\/\/.*/gim.test(getVisibilityArchivalUri(domainSettings));
