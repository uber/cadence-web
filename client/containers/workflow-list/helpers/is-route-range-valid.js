import isRangeValid from './is-range-valid';

const isRouteRangeValid = ({
  endTime,
  minStartDate,
  range,
  startTime,
}) => {
  if (range) {
    return isRangeValid(range, minStartDate);
  }

  if (startTime && endTime) {
    return isRangeValid({ endTime, startTime }, minStartDate);
  }

  return false;
};

export default isRouteRangeValid;
