import findIndexById from './workflow-history-event-highlight-list-find-index-by-id';

describe('workflowHistoryEventHighlightListFindIndexById', () => {
  it('should return -1 if it cant find item in the list.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = workflowHistoryEventHighlightList.findIndex(
      findIndexById({ id: 1 })
    );

    expect(output).toEqual(-1);
  });

  it('should return index = 1 when id = 1 and matching item with id = 1 is the second in the list.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = workflowHistoryEventHighlightList.findIndex(
      findIndexById({ id: 1 })
    );

    expect(output).toEqual(1);
  });
});
