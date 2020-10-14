module.exports = [
  {
    "eventId": 1,
    "timestamp": 1598539132254678000,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 2097152,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreeting"
      },
      "taskList": {
        "name": "HelloChild"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "957bad90-9c99-4afb-8ccc-0e550a439a60",
      "identity": "",
      "firstExecutionRunId": "957bad90-9c99-4afb-8ccc-0e550a439a60",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1598539132254814900,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 2097153,
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
    "timestamp": 1598539132274617200,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 2097158,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "72719@etysk-C02ZH2TXLVDQ",
      "requestId": "5c537460-c3ea-452a-b08c-0ff354c38227"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1598539132417622200,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 2097161,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "72719@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1598539132417688100,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 2097162,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "sample",
      "workflowId": "46aed52e-3745-3a8e-87b0-499b82d894c4",
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      },
      "taskList": {
        "name": "HelloChild"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "TERMINATE",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicateFailedOnly"
    }
  },
  {
    "eventId": 6,
    "timestamp": 1598539132443198900,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 2097165,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "sample",
      "initiatedEventId": 5,
      "workflowExecution": {
        "workflowId": "46aed52e-3745-3a8e-87b0-499b82d894c4",
        "runId": "a783dad6-7225-4a0c-838d-65f6d6ba1472"
      },
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      }
    }
  },
  {
    "eventId": 7,
    "timestamp": 1598539132443391400,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 2097167,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:baf88f47-2e1f-4b03-8d8d-e30088607261"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 8,
    "timestamp": 1598539132463867400,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 2097171,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 7,
      "identity": "baf88f47-2e1f-4b03-8d8d-e30088607261",
      "requestId": "0f50dbaf-510a-4acc-989e-ad0d8819933b"
    }
  },
  {
    "eventId": 9,
    "timestamp": 1598539132490838500,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 2097174,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 7,
      "startedEventId": 8,
      "identity": "72719@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1598539132519370300,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 2097176,
    "childWorkflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "domain": "sample",
      "workflowExecution": {
        "workflowId": "46aed52e-3745-3a8e-87b0-499b82d894c4",
        "runId": "a783dad6-7225-4a0c-838d-65f6d6ba1472"
      },
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      },
      "initiatedEventId": 5,
      "startedEventId": 6
    }
  },
  {
    "eventId": 11,
    "timestamp": 1598539132519439400,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 2097178,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:baf88f47-2e1f-4b03-8d8d-e30088607261"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 12,
    "timestamp": 1598539132534625300,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 2097182,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 11,
      "identity": "baf88f47-2e1f-4b03-8d8d-e30088607261",
      "requestId": "aa68a348-5d8f-48f4-bf95-a74a6b4fc4ae"
    }
  },
  {
    "eventId": 13,
    "timestamp": 1598539132557310900,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 2097185,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 11,
      "startedEventId": 12,
      "identity": "72719@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 14,
    "timestamp": 1598539132557357800,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 2097186,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 13
    }
  }
]