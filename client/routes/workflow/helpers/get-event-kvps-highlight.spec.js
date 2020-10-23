import getEventKvpsHighlight from './get-event-kvps-highlight';

describe('getEventKvpsHighlight', () => {
  it('should return isHighlighted = false when workflowHistoryEventHighlightListEnabled = false.', () => {
    const output = getEventKvpsHighlight({
      eventType: 'ActivityTaskScheduled',
      kvps: [],
      workflowHistoryEventHighlightList: [],
      workflowHistoryEventHighlightListEnabled: false,
    });

    expect(output).toEqual({
      kvps: [],
      isHighlighted: false,
    });
  });

  it('should return isHighlighted = false when workflowHistoryEventHighlightListEnabled = true and workflowHistoryEventHighlightList items are not enabled.', () => {
    const workflowHistoryEventHighlightList = [
      {
        eventType: 'ActivityTaskScheduled',
        eventParamName: 'eventId',
        isEnabled: false,
      },
    ];

    const output = getEventKvpsHighlight({
      eventType: 'ActivityTaskScheduled',
      kvps: [],
      workflowHistoryEventHighlightList,
      workflowHistoryEventHighlightListEnabled: true,
    });

    expect(output).toEqual({
      kvps: [],
      isHighlighted: false,
    });
  });

  it('should return isHighlighted = true and kvp.isHighlighted = true when workflowHistoryEventHighlightListEnabled = true and workflowHistoryEventHighlightList items are matching and enabled.', () => {
    const workflowHistoryEventHighlightList = [
      {
        eventType: 'ActivityTaskScheduled',
        eventParamName: 'eventId',
        isEnabled: true,
      },
    ];
    const kvps = [
      {
        key: 'eventId',
        value: 1,
      },
      {
        key: 'scheduledEventId',
        value: 0,
      },
    ];

    const output = getEventKvpsHighlight({
      eventType: 'ActivityTaskScheduled',
      kvps,
      workflowHistoryEventHighlightList,
      workflowHistoryEventHighlightListEnabled: true,
    });

    expect(output).toEqual({
      kvps: [
        {
          isHighlighted: true,
          key: 'eventId',
          value: 1,
        },
        {
          isHighlighted: false,
          key: 'scheduledEventId',
          value: 0,
        },
      ],
      isHighlighted: true,
    });
  });

  it('should return isHighlighted = false and kvp.isHighlighted = false when workflowHistoryEventHighlightListEnabled = true and workflowHistoryEventHighlightList items are not matching and enabled.', () => {
    const workflowHistoryEventHighlightList = [
      {
        eventType: 'ActivityTaskScheduled',
        eventParamName: 'eventId',
        isEnabled: true,
      },
    ];
    const kvps = [
      {
        key: 'scheduledEventId',
        value: 0,
      },
    ];

    const output = getEventKvpsHighlight({
      eventType: 'ActivityTaskScheduled',
      kvps,
      workflowHistoryEventHighlightList,
      workflowHistoryEventHighlightListEnabled: true,
    });

    expect(output).toEqual({
      kvps: [
        {
          isHighlighted: false,
          key: 'scheduledEventId',
          value: 0,
        },
      ],
      isHighlighted: false,
    });
  });
});
