import moment from 'moment';

const isRangeValid = (range, minStartDate) => {
  if (typeof range === 'string') {
    const [, count, unit] = range.split('-');
    let startTime;

    try {
      startTime = moment()
        .subtract(count, unit)
        .startOf(unit);
    } catch (e) {
      return false;
    }

    if (minStartDate && startTime < minStartDate) {
      return false;
    }

    return true;
  }

  if (range.startTime && range.endTime) {
    const startTime = moment(range.startTime);
    const endTime = moment(range.endTime);

    if (startTime > endTime) {
      return false;
    }

    if (minStartDate && startTime < minStartDate) {
      return false;
    }

    return true;
  }

  return false;
};

export default isRangeValid;
