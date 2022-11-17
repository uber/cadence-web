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

import getSummaryWorkflowStatus from './get-summary-workflow-status';
import parentWorkflowLink from './parent-workflow-link';
import { getJsonStringObject, getKeyValuePairs } from '~helpers';

const getSummary = ({ clusterName, events, isWorkflowRunning, workflow }) => {
  const formattedWorkflow = workflow.pendingActivities
    ? {
        ...workflow,
        pendingActivities: workflow.pendingActivities.map(item => ({
          ...item,
          kvps: getKeyValuePairs({ clusterName, item }),
        })),
      }
    : workflow;

  if (!events || !events.length) {
    return {
      input: undefined,
      isWorkflowRunning,
      parentWorkflowRoute: undefined,
      result: undefined,
      wfStatus: undefined,
      workflow: formattedWorkflow,
    };
  }

  const firstEvent = events[0];
  const lastEvent =
    workflow.workflowExecutionInfo.closeEvent ||
    (events.length > 1 && events[events.length - 1]);

  const input = getJsonStringObject(firstEvent.details.input);

  const workflowCompletedEvent =
    lastEvent && lastEvent.eventType.startsWith('WorkflowExecution')
      ? lastEvent
      : undefined;

  const result = workflowCompletedEvent
    ? getJsonStringObject(
        workflowCompletedEvent.details.result || workflowCompletedEvent.details
      )
    : undefined;

  const wfStatus = getSummaryWorkflowStatus({
    clusterName,
    isWorkflowRunning,
    workflow,
    workflowCompletedEvent,
  });

  const parentWorkflowRoute = parentWorkflowLink({
    clusterName,
    eventDetails: firstEvent.details,
  });

  return {
    input,
    isWorkflowRunning,
    parentWorkflowRoute,
    result,
    wfStatus,
    workflow: formattedWorkflow,
  };
};

export default getSummary;
