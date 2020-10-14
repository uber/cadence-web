module.exports = [
  {
    "eventId": 1,
    "timestamp": 1598539132433777900,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 2097152,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      },
      "parentWorkflowDomain": "sample",
      "parentWorkflowExecution": {
        "workflowId": "b7aa2521-9605-4028-9e27-730762c1e869",
        "runId": "957bad90-9c99-4afb-8ccc-0e550a439a60"
      },
      "parentInitiatedEventId": 5,
      "taskList": {
        "name": "HelloChild"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "a783dad6-7225-4a0c-838d-65f6d6ba1472",
      "identity": "",
      "firstExecutionRunId": "a783dad6-7225-4a0c-838d-65f6d6ba1472",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1598539132452556500,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 2097156,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloChild"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1598539132465523000,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 2097159,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "72719@etysk-C02ZH2TXLVDQ",
      "requestId": "e616d43a-a76c-4b36-a382-cf6ca25aebf6"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1598539132486702700,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 2097162,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "72719@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1598539132486778400,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 2097163,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 4
    }
  }
]