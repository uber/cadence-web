import remove from './workflow-history-event-highlight-list-remove';

describe('workflowHistoryEventHighlightListRemove', () => {
  it('list is unchanged when no item with id = 1 in list and passed id = 1.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = remove({
      id: 1,
      workflowHistoryEventHighlightList,
    });

    expect(output).toEqual(workflowHistoryEventHighlightList);
  });

  it('removes item with id = 1 from list when passed id = 1.', () => {
    const workflowHistoryEventHighlightList = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const output = remove({
      id: 1,
      workflowHistoryEventHighlightList,
    });

    expect(output).toEqual([{ id: 0 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  });
});
