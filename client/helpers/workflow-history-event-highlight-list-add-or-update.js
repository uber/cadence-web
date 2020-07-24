import findIndexById from './workflow-history-event-highlight-list-find-index-by-id';

const findIndexByTypeAndParamName = ({
  eventType,
  eventParamName,
}) => eventParam =>
  eventParam.eventType === eventType &&
  eventParam.eventParamName === eventParamName;

const workflowHistoryEventHighlightListAddOrUpdate = ({
  eventParamName,
  eventType,
  id,
  isEnabled,
  workflowHistoryEventHighlightList,
}) => {
  const findIndexHandler = id
    ? findIndexById({ id })
    : findIndexByTypeAndParamName({ eventParamName, eventType });

  const index = workflowHistoryEventHighlightList.findIndex(findIndexHandler);

  if (index === -1) {
    return [
      {
        eventParamName,
        eventType,
        id: new Date().getTime(),
        isEnabled,
      },
      ...workflowHistoryEventHighlightList,
    ];
  }

  const event = workflowHistoryEventHighlightList[index];

  return [
    ...workflowHistoryEventHighlightList.slice(0, index),
    {
      ...event,
      eventParamName,
      eventType,
      isEnabled,
    },
    ...workflowHistoryEventHighlightList.slice(index + 1),
  ];
};

export default workflowHistoryEventHighlightListAddOrUpdate;
