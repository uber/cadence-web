import { getStartTimeIsoString } from '~helpers';

const getStartTime = ({ range, queryRange, queryStartTime }) => {
  if (range && range.startTime) {
    return getStartTimeIsoString(null, range.startTime.toISOString());
  }

  return getStartTimeIsoString(queryRange, queryStartTime);
};

export default getStartTime;
