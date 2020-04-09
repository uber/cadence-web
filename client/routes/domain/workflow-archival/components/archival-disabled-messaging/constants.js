export const archivalDisabledMessage = [
  'This domain is currently not enabled for archival.',
  'To enable archival:',
];

export const historyArchivalDisabledMessage =
  'Set HistoryArchivalStatus to ENABLED by running command:';

export const historyArchivalEnableCommand = `cadence --do {domain} domain update --has enabled`;

export const historyArchivalLinks = null;

export const visibilityArchivalDisabledMessage =
  'Set VisibilityArchivalStatus to ENABLED by running command:';

export const visibilityArchivalEnableCommand = `cadence --do {domain} domain update --vas enabled`;
