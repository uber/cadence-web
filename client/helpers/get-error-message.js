import { NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT } from '~constants';

export default (
  error,
  defaultMessage = NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT
) =>
  (error &&
    ((error.json && error.json.message) || error.status || error.message)) ||
  defaultMessage;
