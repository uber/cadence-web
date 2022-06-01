const formatRequestCancelActivityTaskFailedEventAttributes = ({
  decisionTaskCompletedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
});

module.exports = formatRequestCancelActivityTaskFailedEventAttributes;
