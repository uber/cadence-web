import getVisibilityArchivalUri from './get-visibility-archival-uri';

export default domainSettings =>
  /^file:\/\/.*/gim.test(getVisibilityArchivalUri(domainSettings));
