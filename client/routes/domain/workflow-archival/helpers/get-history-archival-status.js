import get from 'lodash-es/get';
export default domainSettings => get(domainSettings, 'configuration.historyArchivalStatus', '');
