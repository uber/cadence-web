// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
