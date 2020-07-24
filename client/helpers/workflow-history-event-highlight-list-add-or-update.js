import findIndexById from './workflow-history-event-highlight-list-find-index-by-id';

const findIndexByTypeAndParamName = ({ eventType, eventParamName }) => (eventParam) =>
  eventParam.eventType === eventType &&
  eventParam.eventParamName === eventParamName;

const workflowHistoryEventHighlightListAddOrUpdate = ({
  eventParamName,
  eventType,
  id,
  isEnabled,
  workflowHistoryEventHighlightList,
}) => {
  const newEventParam = {
    eventParamName,
    eventType,
    id,
    isEnabled,
  };

  const findIndexHandler = id ?
    findIndexById(newEventParam) :
    findIndexByTypeAndParamName(newEventParam);

  const index = workflowHistoryEventHighlightList
    .findIndex(findIndexHandler);

  if (index === -1) {
    newEventParam.id = new Date().getTime();
    return [newEventParam, ...workflowHistoryEventHighlightList];
  }

  return [
    ...workflowHistoryEventHighlightList.slice(0, index),
    newEventParam,
    ...workflowHistoryEventHighlightList.slice(index + 1)
  ];
};

export default workflowHistoryEventHighlightListAddOrUpdate;
