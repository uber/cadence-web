import { getKeyValuePairs } from '~helpers';

const getEventDetails = event => {
  const { details, eventId, eventType, timeStampDisplay } = event;
  const kvps = getKeyValuePairs({
    timestamp: timeStampDisplay,
    eventId,
    ...details,
  });

  return {
    ...details,
    eventId,
    eventType,
    kvps,
    timestamp: timeStampDisplay,
  };
};

export default getEventDetails;
