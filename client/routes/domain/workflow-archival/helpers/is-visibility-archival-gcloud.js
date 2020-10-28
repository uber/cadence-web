import getVisibilityArchivalUri from './get-visibility-archival-uri';

export default domainSettings =>
  /^gs:\/\/.*/gim.test(getVisibilityArchivalUri(domainSettings));
