const workflowHistoryEventHighlightListAddOrUpdate = ({
  eventParamName,
  eventType,
  isEnabled,
  workflowHistoryEventHighlightList,
}) => {
  const newEventParam = {
    eventParamName,
    eventType,
    isEnabled,
  };

  const index = workflowHistoryEventHighlightList
    .findIndex((eventParam) =>
      eventParam.eventType === eventType && eventParam.eventParamName === eventParamName
    );

  if (index === -1) {
    return [...workflowHistoryEventHighlightList, newEventParam];
  }

  return [
    ...workflowHistoryEventHighlightList.slice(0, index),
    newEventParam,
    ...workflowHistoryEventHighlightList.slice(index + 1)
  ];
};

export default workflowHistoryEventHighlightListAddOrUpdate;
