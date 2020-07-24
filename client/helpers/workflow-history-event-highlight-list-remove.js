import findIndexById from './workflow-history-event-highlight-list-find-index-by-id';

const workflowHistoryEventHighlightListRemove = ({
  id,
  workflowHistoryEventHighlightList,
}) => {
  const index = workflowHistoryEventHighlightList
    .findIndex(findIndexById({ id }));

  if (index === -1) {
    return workflowHistoryEventHighlightList;
  }

  return [
    ...workflowHistoryEventHighlightList.slice(0, index),
    ...workflowHistoryEventHighlightList.slice(index + 1)
  ];
};

export default workflowHistoryEventHighlightListRemove;
