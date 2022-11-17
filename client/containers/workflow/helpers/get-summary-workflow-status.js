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

import { WORKFLOW_EVENT_TYPE } from '~constants';

const getSummaryWorkflowStatus = ({
  clusterName,
  isWorkflowRunning,
  workflow,
  workflowCompletedEvent,
}) => {
  if (isWorkflowRunning) {
    return 'running';
  }

  if (!workflowCompletedEvent) {
    return (
      (workflow && workflow.workflowExecutionInfo.closeStatus) ||
      'running'
    ).toLowerCase();
  }

  if (
    workflowCompletedEvent.eventType ===
    WORKFLOW_EVENT_TYPE.WorkflowExecutionContinuedAsNew
  ) {
    return {
      to: {
        name: 'workflow/summary',
        params: {
          clusterName,
          runId: workflowCompletedEvent.details.newExecutionRunId,
        },
      },
      text: 'Continued As New',
      status: 'continued-as-new',
    };
  }

  return workflowCompletedEvent.eventType
    .replace('WorkflowExecution', '')
    .toLowerCase();
};

export default getSummaryWorkflowStatus;
