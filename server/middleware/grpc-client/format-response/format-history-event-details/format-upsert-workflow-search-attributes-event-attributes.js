const formatPayloadMap = require('./format-payload-map');

const formatUpsertWorkflowSearchAttributesEventAttributes = ({
  decisionTaskCompletedEventId,
  searchAttributes,
}) => ({
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
});

module.exports = formatUpsertWorkflowSearchAttributesEventAttributes;
