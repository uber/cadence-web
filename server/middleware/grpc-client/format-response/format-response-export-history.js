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

const { cliTransform } = require('../transform');
const formatHistoryEventDetails = require('./format-history-event-details');
const formatHistoryEventType = require('./format-history-event-type');
const formatTimestampToLong = require('./format-timestamp-to-long');

const formatResponseExportHistory = ({
  archived,
  history: { events },
  rawHistory,
  ...response
}) => ({
  ...response,
  archived: archived || null,
  history: {
    events: events.map(
      ({ attributes, eventId, eventTime, taskId, version, ...event }) => {
        return cliTransform({
          eventId: parseInt(eventId),
          timestamp: formatTimestampToLong(eventTime),
          eventType: formatHistoryEventType({ attributes }),
          ...event,
          ...formatHistoryEventDetails({ ...event, attributes }),
        });
      }
    ),
  },
  rawHistory: rawHistory?.length ? rawHistory : null,
});

module.exports = formatResponseExportHistory;
