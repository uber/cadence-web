export const archivesDisabledMessage = [
  'This domain is currently not enabled for archival.',
  'To enable archival:',
];

export const historyArchivalDisabledMessage =
  'Set HistoryArchivalStatus to ENABLED by running command:';

export const historyArchivalEnableCommand =
  `cadence --env {env} --do {domain} domain update --has enabled`;

export const visibilityArchivalDisabledMessage =
  'Set VisibilityArchivalStatus to ENABLED by running command:';

export const visibilityArchivalEnableCommand =
  `cadence --env {env} --do {domain} domain update --vas enabled`;