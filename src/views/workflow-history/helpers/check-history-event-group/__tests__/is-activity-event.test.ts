import differenceBy from 'lodash/differenceBy';

import { type HistoryEvent } from '@/__generated__/proto-ts/uber/cadence/api/v1/HistoryEvent';
import { allWorkflowEventTypesAttrs } from '@/views/workflow-history/__fixtures__/all-workflow-event-types-attributes';
import {
  cancelActivityTaskEvent,
  completeActivityTaskEvent,
  failedActivityTaskEvent,
  scheduleActivityTaskEvent,
  startActivityTaskEvent,
  timeoutActivityTaskEvent,
} from '@/views/workflow-history/__fixtures__/workflow-history-events';
import { type ActivityHistoryEvent } from '@/views/workflow-history/workflow-history.types';

import isActivityEvent from '../is-activity-event';

const validEvents: ActivityHistoryEvent[] = [
  scheduleActivityTaskEvent,
  startActivityTaskEvent,
  completeActivityTaskEvent,
  failedActivityTaskEvent,
  timeoutActivityTaskEvent,
  cancelActivityTaskEvent,
];

const invalidEvents: Pick<HistoryEvent, 'attributes'>[] = differenceBy(
  allWorkflowEventTypesAttrs,
  validEvents,
  'attributes'
);

describe('isActivityEvent', () => {
  test('should return true for valid activity events', () => {
    validEvents.forEach((event) => {
      expect(isActivityEvent(event)).toBe(true);
    });
  });

  test('should return false for invalid activity events', () => {
    invalidEvents.forEach((event) => {
      console.log(event, isActivityEvent(event));
      expect(isActivityEvent(event)).toBe(false);
    });
  });

  test('should return false for null, undefined, or missing attributes', () => {
    //@ts-expect-error null is not of type HistoryEvent
    expect(isActivityEvent(null)).toBe(false);
    //@ts-expect-error undefined is not of type HistoryEvent
    expect(isActivityEvent(undefined)).toBe(false);
    //@ts-expect-error {} is not of type HistoryEvent
    expect(isActivityEvent({})).toBe(false);
  });
});
