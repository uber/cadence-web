import { NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT } from '../constants';

export default error =>
  (error &&
    ((error.json && error.json.message) || error.status || error.message)) ||
  NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT;
