import { getKeyValuePairs } from '../../../helpers';

const getEventDetails = event => {
  const { details, eventId, eventType, timeStampDisplay } = event;
  const kvps = getKeyValuePairs({ ...details, eventId, timestamp: timeStampDisplay });

  return {
    ...details,
    eventId,
    eventType,
    kvps,
    timestamp: timeStampDisplay,
  };
};

export default getEventDetails;
