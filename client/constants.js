export const jsonKeys = ['result', 'input', 'details', 'data', 'Error'];
export const preKeys = jsonKeys.concat(['stackTrace', 'details.stackTrace']);

export const ENVIRONMENT_LIST = [
  // Make sure to enable "environment-select" in feature-flags.json to enable environment select.
  //
  // Examples:
  //
  // {
  //   label: 'Production',
  //   value: 'http://<production-url>.com',
  // },
  // {
  //   label: 'Staging',
  //   value: 'http://<staging-url>.com',
  // },
  // {
  //   label: 'Development',
  //   value: 'http://<development-url>.com',
  // },
  // {
  //   label: 'Localhost',
  //   value: 'http://localhost:8088',
  // },
];

export const LOCAL_STORAGE_NEWS_LAST_VIEWED_AT = 'news-last-viewed-at';
export const LOCAL_STORAGE_SETTINGS = {
  timeFormat: 'settings-time-format',
  timezone: 'settings-timezone',
}

export const MAXIMUM_JSON_CHARACTER_LIMIT = 5000;
export const MAXIMUM_JSON_MESSAGE =
  '\n ... to see more open full screen mode from top right arrow.';

export const NOTIFICATION_TYPE_ERROR = 'error';
export const NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT =
  'An unexpected error has occurred. Please try again. If problems persist contact cadence-support.';
export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_WARNING = 'warning';
export const NOTIFICATION_TIMEOUT = 5000;

export const SETTINGS_TIME_FORMAT_12 = 'TIME_FORMAT_12';
export const SETTINGS_TIME_FORMAT_24 = 'TIME_FORMAT_24';
export const SETTINGS_TIME_FORMAT_OPTIONS = [
  { label: '12 hour', value: SETTINGS_TIME_FORMAT_12 },
  { label: '24 hour', value: SETTINGS_TIME_FORMAT_24 },
];

export const SETTINGS_TIMEZONE_LOCAL = 'TIMEZONE_LOCAL';
export const SETTINGS_TIMEZONE_UTC = 'TIMEZONE_UTC';
export const SETTINGS_TIMEZONE_OPTIONS = [
  { label: 'Local', value: SETTINGS_TIMEZONE_LOCAL },
  { label: 'UTC', value: SETTINGS_TIMEZONE_UTC },
];
