import {
  STATUS_LIST,
  STATUS_LIST_OPTION_DEFAULT,
} from '../constants';

const getStatus = status => !status
  ? STATUS_LIST_OPTION_DEFAULT
  : STATUS_LIST.find(item => item.value === status) || STATUS_LIST_OPTION_DEFAULT;

export default getStatus;
