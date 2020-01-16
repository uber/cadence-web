import { getKeyValuePairs } from '../../../helpers';

const getEventDetails = (event) => {
  const { details } = event;
  const kvps = getKeyValuePairs(details);
  return Object.assign({}, details, {
    kvps,
  });
};

export default getEventDetails;