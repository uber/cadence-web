const getEventKvpsHighlight = ({
  eventType,
  kvps,
  workflowHistoryEventHighlightList,
  workflowHistoryEventHighlightListEnabled,
}) => {
  let eventIsHighlighted = false;

  if (!workflowHistoryEventHighlightListEnabled) {
    return {
      kvps,
      isHighlighted: false,
    };
  }

  const filteredWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightList.filter(
    highlight => highlight.isEnabled && highlight.eventType === eventType
  );

  if (!filteredWorkflowHistoryEventHighlightList.length) {
    return {
      kvps,
      isHighlighted: false,
    };
  }

  return {
    kvps: kvps.map(kvp => {
      const isHighlighted =
        filteredWorkflowHistoryEventHighlightList.find(
          ({ eventParamName }) => eventParamName === kvp.key
        ) !== undefined;

      if (isHighlighted) {
        eventIsHighlighted = true;
      }

      return {
        ...kvp,
        isHighlighted,
      };
    }),
    isHighlighted: eventIsHighlighted,
  };
};

export default getEventKvpsHighlight;
