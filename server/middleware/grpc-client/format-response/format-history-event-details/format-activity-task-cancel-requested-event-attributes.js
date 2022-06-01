const formatActivityTaskCancelRequestedEventAttributes = ({
  decisionTaskCompletedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
});

module.exports = formatActivityTaskCancelRequestedEventAttributes;
