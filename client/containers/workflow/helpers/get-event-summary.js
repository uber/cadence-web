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

import { summarizeEvents } from './summarize-events';
import { getKeyValuePairs } from '~helpers';

const getEventSummary = ({ clusterName, event }) => {
  if (!event) {
    return event;
  }

  if (!event.details) {
    return event.details;
  }

  const { eventId, eventType } = event;

  const maps = summarizeEvents({ clusterName });

  const item =
    event.eventType in maps
      ? maps[event.eventType](event.details)
      : event.details;

  const kvps = getKeyValuePairs({ clusterName, item });

  return {
    ...item,
    eventId,
    eventType,
    kvps,
  };
};

export default getEventSummary;
