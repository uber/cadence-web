const atob = require('atob');

const formatExternalWorkflowExecutionSignaledEventAttributes = ({
  control,
  initiatedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  control: control ? parseInt(atob(control)) : null,
  initiatedEventId: parseInt(initiatedEventId),
});

module.exports = formatExternalWorkflowExecutionSignaledEventAttributes;
