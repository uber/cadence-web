import { getKeyValuePairs } from '../../../helpers';

const getEventDetails = event => {
  const { details, eventId, eventType } = event;
  const kvps = getKeyValuePairs(details);
  return Object.assign({}, details, {
    eventId,
    eventType,
    kvps,
  });
};

export default getEventDetails;
