import addOrUpdate from './workflow-history-event-highlight-list-add-or-update';

describe('workflowHistoryEventHighlightListAddOrUpdate', () => {
  it('should add an item to start of list if not found with id = 1.', () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => 1);

    const workflowHistoryEventHighlightList = [
      {
        id: 0,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskCanceled',
        isEnabled: false,
      },
      {
        id: 2,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskCompleted',
        isEnabled: false,
      },
      {
        id: 3,
        eventParamName: 'eventId',
        eventType: 'DecisionTaskCompleted',
        isEnabled: false,
      },
      {
        id: 4,
        eventParamName: 'eventId',
        eventType: 'DecisionTaskScheduled',
        isEnabled: false,
      },
    ];

    const output = addOrUpdate({
      eventParamName: 'eventId',
      eventType: 'ActivityTaskScheduled',
      id: 1,
      isEnabled: true,
      workflowHistoryEventHighlightList,
    });
    expect(output.length).toEqual(5);
    expect(output[0]).toEqual({
      eventParamName: 'eventId',
      eventType: 'ActivityTaskScheduled',
      id: 1,
      isEnabled: true,
    });
  });

  it('should update item in list with id = 1.', () => {
    const workflowHistoryEventHighlightList = [
      {
        id: 0,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskCanceled',
        isEnabled: false,
      },
      {
        id: 1,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskScheduled',
        isEnabled: false,
      },
      {
        id: 2,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskCompleted',
        isEnabled: false,
      },
      {
        id: 3,
        eventParamName: 'eventId',
        eventType: 'DecisionTaskCompleted',
        isEnabled: false,
      },
      {
        id: 4,
        eventParamName: 'eventId',
        eventType: 'DecisionTaskScheduled',
        isEnabled: false,
      },
    ];

    const output = addOrUpdate({
      eventParamName: 'eventId',
      eventType: 'ActivityTaskScheduled',
      id: 1,
      isEnabled: true,
      workflowHistoryEventHighlightList,
    });
    expect(output.length).toEqual(5);
    expect(output[1]).toEqual({
      eventParamName: 'eventId',
      eventType: 'ActivityTaskScheduled',
      id: 1,
      isEnabled: true,
    });
  });

  it('should update item in list with eventType = "ActivityTaskScheduled" and eventParamName = "eventId" (no id specified).', () => {
    const workflowHistoryEventHighlightList = [
      {
        id: 0,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskCanceled',
        isEnabled: false,
      },
      {
        id: 1,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskScheduled',
        isEnabled: false,
      },
      {
        id: 2,
        eventParamName: 'eventId',
        eventType: 'ActivityTaskCompleted',
        isEnabled: false,
      },
      {
        id: 3,
        eventParamName: 'eventId',
        eventType: 'DecisionTaskCompleted',
        isEnabled: false,
      },
      {
        id: 4,
        eventParamName: 'eventId',
        eventType: 'DecisionTaskScheduled',
        isEnabled: false,
      },
    ];

    const output = addOrUpdate({
      eventParamName: 'eventId',
      eventType: 'ActivityTaskScheduled',
      isEnabled: true,
      workflowHistoryEventHighlightList,
    });
    expect(output.length).toEqual(5);
    expect(output[1]).toEqual({
      eventParamName: 'eventId',
      eventType: 'ActivityTaskScheduled',
      id: 1,
      isEnabled: true,
    });
  });
});
