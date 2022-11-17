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

const getEventKvpsHighlight = ({
  eventType,
  kvps,
  workflowHistoryEventHighlightList,
  workflowHistoryEventHighlightListEnabled,
}) => {
  let eventIsHighlighted = false;

  if (!workflowHistoryEventHighlightListEnabled) {
    return {
      kvps,
      isHighlighted: false,
    };
  }

  const filteredWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightList.filter(
    highlight => highlight.isEnabled && highlight.eventType === eventType
  );

  if (!filteredWorkflowHistoryEventHighlightList.length) {
    return {
      kvps,
      isHighlighted: false,
    };
  }

  return {
    kvps: kvps.map(kvp => {
      const isHighlighted =
        filteredWorkflowHistoryEventHighlightList.find(
          ({ eventParamName }) => eventParamName === kvp.key
        ) !== undefined;

      if (isHighlighted) {
        eventIsHighlighted = true;
      }

      return {
        ...kvp,
        isHighlighted,
      };
    }),
    isHighlighted: eventIsHighlighted,
  };
};

export default getEventKvpsHighlight;
