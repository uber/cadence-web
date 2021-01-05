// Copyright (c) 2017-2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { eventFullTransforms } from './event-full-transforms';
import getEventKvpsHighlight from './get-event-kvps-highlight';
import { getKeyValuePairs } from '~helpers';

const getEventFullDetails = ({
  event,
  workflowHistoryEventHighlightList,
  workflowHistoryEventHighlightListEnabled,
} = {}) => {
  if (!event) {
    return event;
  }

  const { eventId, eventType } = event;

  const maps = eventFullTransforms;

  const item =
    event.eventType in maps
      ? maps[event.eventType](event.details)
      : event.details;

  const { kvps, isHighlighted } = getEventKvpsHighlight({
    eventType,
    kvps: getKeyValuePairs(item),
    workflowHistoryEventHighlightList,
    workflowHistoryEventHighlightListEnabled,
  });

  return {
    ...item,
    eventId,
    eventType,
    isHighlighted,
    kvps,
  };
};

export default getEventFullDetails;
