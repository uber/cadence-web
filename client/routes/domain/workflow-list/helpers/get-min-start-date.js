const getMinStartDate = ({ maxRetentionDays, statusName }) => {
  if (statusName === 'OPEN' || maxRetentionDays === undefined) {
    return null;
  }

  return moment(this.now)
    .subtract(maxRetentionDays, 'days')
    .startOf('days');
};

export default getMinStartDate;
