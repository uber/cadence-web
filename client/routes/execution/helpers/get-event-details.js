import { getKeyValuePairs } from '../../../helpers';

const getEventDetails = event => {
  const { details, eventId, eventType } = event;
  const kvps = getKeyValuePairs(details);

  return {
    ...details,
    eventId,
    eventType,
    kvps,
  };
};

export default getEventDetails;
