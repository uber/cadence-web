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

import ActivityTaskCancelRequested from './activity-task-cancel-requested';
import ActivityTaskCanceled from './activity-task-canceled';
import ActivityTaskCompleted from './activity-task-completed';
import ActivityTaskFailed from './activity-task-failed';
import ActivityTaskScheduled from './activity-task-scheduled';
import ActivityTaskStarted from './activity-task-started';
import ActivityTaskTimedOut from './activity-task-timed-out';
import CancelTimerFailed from './cancel-timer-failed';
import ChildWorkflowExecutionCanceled from './child-workflow-execution-canceled';
import ChildWorkflowExecutionCompleted from './child-workflow-execution-completed';
import ChildWorkflowExecutionFailed from './child-workflow-execution-failed';
import ChildWorkflowExecutionStarted from './child-workflow-execution-started';
import ChildWorkflowExecutionTerminated from './child-workflow-execution-terminated';
import ChildWorkflowExecutionTimedOut from './child-workflow-execution-timed-out';
import DecisionTaskCompleted from './decision-task-completed';
import DecisionTaskFailed from './decision-task-failed';
import DecisionTaskStarted from './decision-task-started';
import DecisionTaskTimedOut from './decision-task-timed-out';
import ExternalWorkflowExecutionCancelRequested from './external-workflow-execution-cancel-requested';
import ExternalWorkflowExecutionSignaled from './external-workflow-execution-signaled';
import MarkerRecorded from './marker-recorded';
import RequestCancelActivityTaskFailed from './request-cancel-activity-task-failed';
import RequestCancelExternalWorkflowExecutionFailed from './request-cancel-external-workflow-execution-failed';
import RequestCancelExternalWorkflowExecutionInitiated from './request-cancel-external-workflow-execution-initiated';
import SignalExternalWorkflowExecutionFailed from './signal-external-workflow-execution-failed';
import SignalExternalWorkflowExecutionInitiated from './signal-external-workflow-execution-initiated';
import StartChildWorkflowExecutionFailed from './start-child-workflow-execution-failed';
import StartChildWorkflowExecutionInitiated from './start-child-workflow-execution-initiated';
import TimerCanceled from './timer-canceled';
import TimerFired from './timer-fired';
import TimerStarted from './timer-started';
import UpsertWorkflowSearchAttributes from './upsert-workflow-search-attributes';
import WorkflowExecutionCancelRequested from './workflow-execution-cancel-requested';
import WorkflowExecutionCanceled from './workflow-execution-canceled';
import WorkflowExecutionCompleted from './workflow-execution-completed';
import WorkflowExecutionContinuedAsNew from './workflow-execution-continued-as-new';
import WorkflowExecutionFailed from './workflow-execution-failed';
import WorkflowExecutionSignaled from './workflow-execution-signaled';
import WorkflowExecutionStarted from './workflow-execution-started';
import WorkflowExecutionTimedOut from './workflow-execution-timed-out';

const eventTypeMap = {
  ActivityTaskCancelRequested,
  ActivityTaskCanceled,
  ActivityTaskCompleted,
  ActivityTaskFailed,
  ActivityTaskScheduled,
  ActivityTaskStarted,
  ActivityTaskTimedOut,
  CancelTimerFailed,
  ChildWorkflowExecutionCanceled,
  ChildWorkflowExecutionCompleted,
  ChildWorkflowExecutionFailed,
  ChildWorkflowExecutionStarted,
  ChildWorkflowExecutionTerminated,
  ChildWorkflowExecutionTimedOut,
  DecisionTaskCompleted,
  DecisionTaskFailed,
  DecisionTaskScheduled: () => ({}),
  DecisionTaskStarted,
  DecisionTaskTimedOut,
  ExternalWorkflowExecutionCancelRequested,
  ExternalWorkflowExecutionSignaled,
  MarkerRecorded,
  RequestCancelActivityTaskFailed,
  RequestCancelExternalWorkflowExecutionFailed,
  RequestCancelExternalWorkflowExecutionInitiated,
  SignalExternalWorkflowExecutionFailed,
  SignalExternalWorkflowExecutionInitiated,
  StartChildWorkflowExecutionFailed,
  StartChildWorkflowExecutionInitiated,
  TimerCanceled,
  TimerFired,
  TimerStarted,
  UpsertWorkflowSearchAttributes,
  WorkflowExecutionCancelRequested,
  WorkflowExecutionCanceled,
  WorkflowExecutionCompleted,
  WorkflowExecutionContinuedAsNew,
  WorkflowExecutionFailed,
  WorkflowExecutionSignaled,
  WorkflowExecutionStarted,
  WorkflowExecutionTerminated: () => ({}),
  WorkflowExecutionTimedOut,
};

const getEventConnections = (event, workflow) =>
  eventTypeMap[event.eventType](event, workflow);

export default getEventConnections;
