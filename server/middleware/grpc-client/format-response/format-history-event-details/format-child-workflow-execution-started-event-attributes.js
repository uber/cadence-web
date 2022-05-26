const formatPayloadMap = require('./format-payload-map');

const formatChildWorkflowExecutionStartedEventAttributes = ({
  header,
  initiatedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  header: formatPayloadMap(header, 'fields'),
  initiatedEventId: parseInt(initiatedEventId),
});

module.exports = formatChildWorkflowExecutionStartedEventAttributes;