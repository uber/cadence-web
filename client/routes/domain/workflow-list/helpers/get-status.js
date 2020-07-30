import { STATUS_LIST } from '../constants';

const getStatus = ({ queryStatus }) => {
  return !queryStatus
    ? STATUS_LIST[0]
    : STATUS_LIST.find(status => status.value === queryStatus);
};

export default getStatus;
