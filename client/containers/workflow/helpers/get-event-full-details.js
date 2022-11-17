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

import { eventFullTransforms } from './event-full-transforms';
import getEventKvpsHighlight from './get-event-kvps-highlight';
import { getKeyValuePairs } from '~helpers';

const getEventFullDetails = ({
  clusterName,
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
    kvps: getKeyValuePairs({ clusterName, item }),
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
