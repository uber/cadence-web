module.exports = [
  {
    "eventId": 1,
    "timestamp": 1599211522356096800,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048665,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreetings"
      },
      "taskList": {
        "name": "HelloSignal"
      },
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "05538fc1-7c7e-4a0b-99a9-3e86e6feca03",
      "identity": "",
      "firstExecutionRunId": "05538fc1-7c7e-4a0b-99a9-3e86e6feca03",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599211522356288600,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048666,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloSignal"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1599211522380344500,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048671,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "44102@etysk-C02ZH2TXLVDQ",
      "requestId": "82d58a5a-3699-4505-bff5-478ad793d42b"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599211522490444100,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048674,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "44102@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599211522408767600,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 1048675,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "GreetingWorkflow::waitForName",
      "input": "IldvcmxkIg==",
      "identity": ""
    }
  },
  {
    "eventId": 6,
    "timestamp": 1599211522428500900,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 1048676,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "GreetingWorkflow::waitForName",
      "input": "IlVuaXZlcnNlIg==",
      "identity": ""
    }
  },
  {
    "eventId": 7,
    "timestamp": 1599211522443773800,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 1048677,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "GreetingWorkflow::exit",
      "identity": ""
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599211522490525900,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048682,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:8babd773-316c-4778-aad5-c9fc50d66cdc"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599211522505633400,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048686,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "8babd773-316c-4778-aad5-c9fc50d66cdc",
      "requestId": "56f42f30-135f-4098-9257-4378face0b67"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599211522539921800,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048689,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "44102@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1599211522539959300,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048690,
    "workflowExecutionCompletedEventAttributes": {
      "result": "WyJIZWxsbyBXb3JsZCEiLCJIZWxsbyBVbml2ZXJzZSEiXQ==",
      "decisionTaskCompletedEventId": 10
    }
  }
]