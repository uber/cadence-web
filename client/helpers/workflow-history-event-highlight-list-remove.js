const workflowHistoryEventHighlightListRemove = ({
  eventParamName,
  eventType,
  workflowHistoryEventHighlightList,
}) => {
  const index = workflowHistoryEventHighlightList
    .findIndex((eventParam) =>
      eventParam.eventType === eventType && eventParam.eventParamName === eventParamName
    );

  if (index === -1) {
    return workflowHistoryEventHighlightList;
  }

  return [
    ...workflowHistoryEventHighlightList.slice(0, index),
    ...workflowHistoryEventHighlightList.slice(index + 1)
  ];
};

export default workflowHistoryEventHighlightListAddOrUpdate;
