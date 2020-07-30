import moment from 'moment';

const getMinStartDate = ({ maxRetentionDays, now, statusName }) => {
  if (statusName === 'OPEN' || maxRetentionDays === undefined) {
    return null;
  }

  return moment(now)
    .subtract(maxRetentionDays, 'days')
    .startOf('days');
};

export default getMinStartDate;
