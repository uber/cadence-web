const getBathPathUrl = () => {
  if (!process.env.CADENCE_WEB_ROOT) {
    return '/';
  }

  if (!location.pathname.includes(process.env.CADENCE_WEB_ROOT)) {
    return '/';
  }

  return process.env.CADENCE_WEB_ROOT;
};

export const basePathUrl = getBathPathUrl();
export const basePathApi = basePathUrl === '/' ? '' : process.env.CADENCE_WEB_ROOT;
export const jsonKeys = ['result', 'input', 'details', 'data', 'Error'];
export const preKeys = jsonKeys.concat(['stackTrace', 'details.stackTrace']);

export const MAXIMUM_JSON_CHARACTER_LIMIT = 5000;
export const MAXIMUM_JSON_MESSAGE =
  '\n ... to see more open full screen mode from top right arrow.';

export const NOTIFICATION_TYPE_ERROR = 'error';
export const NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT =
  'An unexpected error has occurred. Please try again. If problems persist contact cadence-support.';
export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_WARNING = 'warning';
export const NOTIFICATION_TIMEOUT = 5000;
