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

export const jsonKeys = ['result', 'input', 'details', 'data', 'Error'];
export const preKeys = jsonKeys.concat(['stackTrace', 'details.stackTrace']);

export const DATE_FORMAT_MMM_D_YYYY = 'DATE_FORMAT_MMM_D_YYYY';
export const DATE_FORMAT_D_MMM_YYYY = 'DATE_FORMAT_D_MMM_YYYY';
export const DATE_FORMAT_YYYY_MM_DD = 'DATE_FORMAT_YYYY_MM_DD';
export const DATE_FORMAT_OPTIONS = [
  { label: 'Month Day, Year', value: DATE_FORMAT_MMM_D_YYYY },
  { label: 'Day Month, Year', value: DATE_FORMAT_D_MMM_YYYY },
  { label: 'Year-Month-Day', value: DATE_FORMAT_YYYY_MM_DD },
];

export const ENVIRONMENT_LIST = [
  // Make sure to enable "environmentSelect" in feature-flags.json to enable environment select.
  //
  // Examples:
  //
  // {
  //   label: 'Production',
  //   value: 'http://<production-url>.com',
  // },
  // {
  //   label: 'Staging',
  //   value: 'http://<staging-url>.com',
  // },
  // {
  //   label: 'Development',
  //   value: 'http://<development-url>.com',
  // },
  // {
  //   label: 'Localhost',
  //   value: 'http://localhost:8088',
  // },
];

export const LOCAL_STORAGE_NEWS_LAST_VIEWED_AT = 'news-last-viewed-at';
export const LOCAL_STORAGE_SETTINGS = {
  dateFormat: 'settings-date-format',
  timeFormat: 'settings-time-format',
  timezone: 'settings-timezone',
  workflowHistoryEventHighlightList:
    'settings-workflow-history-event-highlight-list',
  workflowHistoryEventHighlightListEnabled:
    'settings-workflow-history-event-highlight-list-enabled',
};

export const MAXIMUM_JSON_CHARACTER_LIMIT = 5000;
export const MAXIMUM_JSON_MESSAGE =
  '\n ... to see more open full screen mode from top right arrow.';

export const NOTIFICATION_TYPE_ERROR = 'error';
export const NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT =
  'An unexpected error has occurred. Please try again. If problems persist contact cadence-support.';
export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_WARNING = 'warning';
export const NOTIFICATION_TIMEOUT = 5000;

export const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

export const TIME_FORMAT_12 = 'TIME_FORMAT_12';
export const TIME_FORMAT_24 = 'TIME_FORMAT_24';
export const TIME_FORMAT_OPTIONS = [
  { label: '12 hour', value: TIME_FORMAT_12 },
  { label: '24 hour', value: TIME_FORMAT_24 },
];

export const TIMEZONE_LOCAL = 'TIMEZONE_LOCAL';
export const TIMEZONE_UTC = 'TIMEZONE_UTC';
export const TIMEZONE_OPTIONS = [
  { label: 'Local', value: TIMEZONE_LOCAL },
  { label: 'UTC', value: TIMEZONE_UTC },
];

export const WORKFLOW_EVENT_TYPE = {
  ActivityTaskCanceled: 'ActivityTaskCanceled',
  ActivityTaskCancelRequested: 'ActivityTaskCancelRequested',
  ActivityTaskCompleted: 'ActivityTaskCompleted',
  ActivityTaskFailed: 'ActivityTaskFailed',
  ActivityTaskScheduled: 'ActivityTaskScheduled',
  ActivityTaskStarted: 'ActivityTaskStarted',
  ActivityTaskTimedOut: 'ActivityTaskTimedOut',
  CancelTimerFailed: 'CancelTimerFailed',
  ChildWorkflowExecutionCanceled: 'ChildWorkflowExecutionCanceled',
  ChildWorkflowExecutionCompleted: 'ChildWorkflowExecutionCompleted',
  ChildWorkflowExecutionFailed: 'ChildWorkflowExecutionFailed',
  ChildWorkflowExecutionStarted: 'ChildWorkflowExecutionStarted',
  ChildWorkflowExecutionTerminated: 'ChildWorkflowExecutionTerminated',
  ChildWorkflowExecutionTimedOut: 'ChildWorkflowExecutionTimedOut',
  DecisionTaskCompleted: 'DecisionTaskCompleted',
  DecisionTaskFailed: 'DecisionTaskFailed',
  DecisionTaskScheduled: 'DecisionTaskScheduled',
  DecisionTaskStarted: 'DecisionTaskStarted',
  DecisionTaskTimedOut: 'DecisionTaskTimedOut',
  ExternalWorkflowExecutionCancelRequested:
    'ExternalWorkflowExecutionCancelRequested',
  ExternalWorkflowExecutionSignaled: 'ExternalWorkflowExecutionSignaled',
  MarkerRecorded: 'MarkerRecorded',
  RequestCancelActivityTaskFailed: 'RequestCancelActivityTaskFailed',
  RequestCancelExternalWorkflowExecutionFailed:
    'RequestCancelExternalWorkflowExecutionFailed',
  RequestCancelExternalWorkflowExecutionInitiated:
    'RequestCancelExternalWorkflowExecutionInitiated',
  SignalExternalWorkflowExecutionFailed:
    'SignalExternalWorkflowExecutionFailed',
  SignalExternalWorkflowExecutionInitiated:
    'SignalExternalWorkflowExecutionInitiated',
  StartChildWorkflowExecutionFailed: 'StartChildWorkflowExecutionFailed',
  StartChildWorkflowExecutionInitiated: 'StartChildWorkflowExecutionInitiated',
  TimerCanceled: 'TimerCanceled',
  TimerFired: 'TimerFired',
  TimerStarted: 'TimerStarted',
  UpsertWorkflowSearchAttributes: 'UpsertWorkflowSearchAttributes',
  WorkflowExecutionCanceled: 'WorkflowExecutionCanceled',
  WorkflowExecutionCancelRequested: 'WorkflowExecutionCancelRequested',
  WorkflowExecutionCompleted: 'WorkflowExecutionCompleted',
  WorkflowExecutionContinuedAsNew: 'WorkflowExecutionContinuedAsNew',
  WorkflowExecutionFailed: 'WorkflowExecutionFailed',
  WorkflowExecutionSignaled: 'WorkflowExecutionSignaled',
  WorkflowExecutionStarted: 'WorkflowExecutionStarted',
  WorkflowExecutionTerminated: 'WorkflowExecutionTerminated',
  WorkflowExecutionTimedOut: 'WorkflowExecutionTimedOut',
};

export const WORKFLOW_EVENT_TYPES = Object.values(WORKFLOW_EVENT_TYPE);
