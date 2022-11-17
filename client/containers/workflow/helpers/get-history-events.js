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

import moment from 'moment';
import getTimeElapsedDisplay from './get-time-elapsed-display';
import getTimeStampDisplay from './get-time-stamp-display';
import getEventDetails from './get-event-details';
import getEventFullDetails from './get-event-full-details';
import getEventSummary from './get-event-summary';

const getHistoryEvents = ({
  clusterName,
  dateFormat,
  events,
  timeFormat,
  timezone,
  workflowHistoryEventHighlightList,
  workflowHistoryEventHighlightListEnabled,
}) => {
  if (!events) {
    return [];
  }

  return events
    .map(event => {
      const timestamp = moment(event.timestamp);

      return {
        ...event,
        timestamp,
      };
    })
    .map((event, index, eventList) => {
      const timeStampDisplay = getTimeStampDisplay({
        dateFormat,
        event,
        index,
        timeFormat,
        timezone,
      });
      const timeElapsedDisplay = getTimeElapsedDisplay({
        dateFormat,
        event,
        eventList,
        index,
        timeFormat,
        timezone,
      });

      return {
        ...event,
        timeStampDisplay,
        timeElapsedDisplay,
      };
    })
    .map(event => {
      const details = getEventDetails({
        clusterName,
        event,
        workflowHistoryEventHighlightList,
        workflowHistoryEventHighlightListEnabled,
      });
      const eventSummary = getEventSummary({ clusterName, event });
      const eventFullDetails = getEventFullDetails({
        clusterName,
        event,
        workflowHistoryEventHighlightList,
        workflowHistoryEventHighlightListEnabled,
      });

      return {
        ...event,
        details,
        eventSummary,
        eventFullDetails,
      };
    });
};

export default getHistoryEvents;
