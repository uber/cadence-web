// Copyright (c) 2020-2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import findChildEvent from './find-child-event';

const eventTypeMap = {
  ActivityTaskCanceled: event => ({
    parent: event.eventFullDetails.startedEventId,
  }),
  ActivityTaskCancelRequested: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  ActivityTaskCompleted: (event, workflow) => {
    const eventDetails = event.eventFullDetails;
    const { inferredChild, chronologicalChild } = findChildEvent(
      event,
      workflow
    );

    return {
      parent: eventDetails.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
    };
  },
  ActivityTaskFailed: (event, workflow) => {
    const eventDetails = event.eventFullDetails;
    const { inferredChild, chronologicalChild } = findChildEvent(
      event,
      workflow
    );

    return {
      parent: eventDetails.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
      status: 'failed',
    };
  },
  ActivityTaskScheduled: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  ActivityTaskStarted: event => ({
    parent: event.eventFullDetails.scheduledEventId,
  }),
  ActivityTaskTimedOut: (event, workflow) => {
    const { inferredChild, chronologicalChild } = findChildEvent(
      event,
      workflow
    );

    return {
      parent: event.eventFullDetails.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
    };
  },
  CancelTimerFailed: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
    status: 'failed',
  }),
  ChildWorkflowExecutionCanceled: event => ({
    parent: event.eventFullDetails.startedEventId,
  }),
  ChildWorkflowExecutionCompleted: (event, workflow) => {
    const eventDetails = event.eventFullDetails;
    const { inferredChild, chronologicalChild } = findChildEvent(
      event,
      workflow
    );

    return {
      parent: eventDetails.startedEventId,
      status: 'completed',
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      childRoute: eventDetails.workflowExecution,
    };
  },
  ChildWorkflowExecutionFailed: (event, workflow) => {
    const eventDetails = event.eventFullDetails;
    const { inferredChild, chronologicalChild } = findChildEvent(
      event,
      workflow
    );

    return {
      parent: eventDetails.startedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      childRoute: eventDetails.workflowExecution,
      status: 'failed',
    };
  },
  ChildWorkflowExecutionStarted: (event, workflow) => {
    const eventDetails = event.eventFullDetails;
    const { inferredChild, chronologicalChild } = findChildEvent(
      event,
      workflow
    );

    return {
      parent: eventDetails.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      childRoute: eventDetails.workflowExecution,
    };
  },
  ChildWorkflowExecutionTerminated: event => ({
    parent: event.eventFullDetails.startedEventId,
  }),
  ChildWorkflowExecutionTimedOut: event => ({
    parent: event.eventFullDetails.startedEventId,
  }),
  DecisionTaskCompleted: (event, workflow) => {
    const eventInfo = event.eventFullDetails;
    const { chronologicalChild } = findChildEvent(event, workflow);

    return {
      parent: eventInfo.startedEventId,
      chronologicalChild: chronologicalChild,
    };
  },
  DecisionTaskFailed: event => ({
    status: 'failed',
    parent: event.eventFullDetails.startedEventId,
  }),
  DecisionTaskScheduled: () => ({}),
  DecisionTaskStarted: event => ({
    parent: event.eventFullDetails.scheduledEventId,
  }),
  DecisionTaskTimedOut: event => ({
    parent: event.eventFullDetails.scheduledEventId,
  }),
  ExternalWorkflowExecutionCancelRequested: (event, workflow) => {
    const { inferredChild, chronologicalChild } = findChildEvent(
      event,
      workflow
    );

    return {
      parent: event.eventFullDetails.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
    };
  },
  ExternalWorkflowExecutionSignaled: (event, workflow) => {
    const eventDetails = event.eventFullDetails;
    const { inferredChild } = findChildEvent(event, workflow);

    return {
      parent: eventDetails.initiatedEventId,
      inferredChild: inferredChild,
    };
  },
  MarkerRecorded: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  RequestCancelActivityTaskFailed: event => ({
    status: 'failed',
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  RequestCancelExternalWorkflowExecutionFailed: event => ({
    status: 'failed',
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  RequestCancelExternalWorkflowExecutionInitiated: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  SignalExternalWorkflowExecutionFailed: event => ({
    status: 'failed',
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  SignalExternalWorkflowExecutionInitiated: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  StartChildWorkflowExecutionFailed: event => ({
    status: 'failed',
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  StartChildWorkflowExecutionInitiated: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  TimerCanceled: event => ({
    parent: event.eventFullDetails.startedEventId,
  }),
  TimerFired: (event, workflow) => {
    const { inferredChild } = findChildEvent(event, workflow);

    return {
      parent: event.eventFullDetails.startedEventId,
      inferredChild: inferredChild,
    };
  },
  TimerStarted: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  UpsertWorkflowSearchAttributes: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  WorkflowExecutionCanceled: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
  }),
  WorkflowExecutionCancelRequested: (event, workflow) => {
    const { inferredChild } = findChildEvent(event, workflow);

    return {
      inferredChild: inferredChild,
    };
  },
  WorkflowExecutionCompleted: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
    status: 'completed',
  }),
  WorkflowExecutionContinuedAsNew: event => {
    const eventDetails = event.eventFullDetails;

    return {
      parent: eventDetails.decisionTaskCompletedEventId,
      newExecutionRunId: eventDetails.newExecutionRunId,
      status: 'completed',
    };
  },
  WorkflowExecutionFailed: event => ({
    parent: event.eventFullDetails.decisionTaskCompletedEventId,
    status: 'failed',
  }),
  WorkflowExecutionSignaled: (event, workflow) => {
    const { inferredChild } = findChildEvent(event, workflow);

    return {
      inferredChild: inferredChild,
    };
  },
  WorkflowExecutionStarted: event => {
    const eventDetails = event.eventFullDetails;

    return {
      inferredChild: event.eventId + 1,
      parentWorkflowExecution: eventDetails.parentWorkflowExecution,
      previousExecutionRunId: eventDetails.continuedExecutionRunId,
    };
  },
  WorkflowExecutionTerminated: () => ({}),
  WorkflowExecutionTimedOut: event => ({
    parent: event.eventId - 1,
  }),
};

const getEventConnections = (event, workflow) =>
  eventTypeMap[event.eventType](event, workflow);

export default getEventConnections;
