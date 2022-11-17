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

/**
 * Looks for a chronological or inferred child.
 * It is inferred if a DecisionTaskScheduled, otherwise its chronological.
 * External signals are not children and therefore they are skipped.
 * @method findChildEvent
 * @param {object} event
 * @param {string} event.eventId
 * @param {string} event.eventType
 * @param {array} workflowList
 */
function findChildEvent({ eventId, eventType }, workflowList) {
  const slicedWorkflowList = workflowList.slice(eventId);

  // We are at the end of the workflow, no children!
  if (!slicedWorkflowList.length) {
    return {};
  }

  if (slicedWorkflowList[0].eventType === 'DecisionTaskScheduled') {
    return {
      inferredChild: slicedWorkflowList[0].eventId,
    };
  }

  if (eventType === 'WorkflowExecutionSignaled') {
    for (const targetEvent of slicedWorkflowList) {
      switch (targetEvent.eventType) {
        case 'WorkflowExecutionSignaled':
        case 'WorkflowExecutionCancelRequested':
          break;
        case 'DecisionTaskScheduled':
          return {
            inferredChild: targetEvent.eventId,
          };
      }
    }
  } else {
    for (const targetEvent of slicedWorkflowList) {
      switch (targetEvent.eventType) {
        case 'WorkflowExecutionSignaled':
        case 'WorkflowExecutionCancelRequested':
          break;
        default:
          return {
            chronologicalChild: targetEvent.eventId,
          };
      }
    }
  }

  return {};
}

export default findChildEvent;
