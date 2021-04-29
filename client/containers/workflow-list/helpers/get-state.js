import {
  STATE_ALL,
  STATE_CLOSED,
  STATE_OPEN,
  STATUS_ALL,
  STATUS_OPEN,
} from '../constants';

const getState = statusName => {
  if (!statusName || statusName === STATUS_ALL) {
    return STATE_ALL;
  }

  if (statusName === STATUS_OPEN) {
    return STATE_OPEN;
  }

  return STATE_CLOSED;
};

export default getState;
