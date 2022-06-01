const formatPayload = require('../format-payload');
const formatPayloadMap = require('./format-payload-map');

const formatMarkerRecordedEventAttributes = ({
  decisionTaskCompletedEventId,
  details,
  header,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  details: formatPayload(details),
  header: formatPayloadMap(header, 'fields'),
});

module.exports = formatMarkerRecordedEventAttributes;
