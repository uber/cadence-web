import moment from 'moment';

const getMinStartDate = ({ maxRetentionDays, now, statusName }) => {
  if (['OPEN', 'ALL'].includes(statusName)) {
    return null;
  }

  return moment(now)
    .subtract(maxRetentionDays, 'days')
    .startOf('days');
};

export default getMinStartDate;
