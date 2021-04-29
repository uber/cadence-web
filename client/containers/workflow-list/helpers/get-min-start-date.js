import moment from 'moment';
import { STATUS_OPEN, STATUS_ALL } from '../constants';

const getMinStartDate = ({ maxRetentionDays, now, statusName }) => {
  if ([STATUS_OPEN, STATUS_ALL].includes(statusName)) {
    return null;
  }

  return moment(now)
    .subtract(maxRetentionDays, 'days')
    .startOf('days');
};

export default getMinStartDate;
