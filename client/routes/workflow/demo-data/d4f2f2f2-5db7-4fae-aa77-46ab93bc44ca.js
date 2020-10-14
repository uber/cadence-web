module.exports = [
  {
    "eventId": 1,
    "timestamp": 1599211426776915700,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048638,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::createGreeting"
      },
      "taskList": {
        "name": "HelloQuery"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "d4f2f2f2-5db7-4fae-aa77-46ab93bc44ca",
      "identity": "",
      "firstExecutionRunId": "d4f2f2f2-5db7-4fae-aa77-46ab93bc44ca",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599211426777111700,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048639,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloQuery"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1599211426796538000,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048644,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "44024@etysk-C02ZH2TXLVDQ",
      "requestId": "66c95bf6-3c08-436e-a133-dc4b8ba2e47a"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599211426933670400,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048647,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "44024@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599211426933711900,
    "eventType": "TimerStarted",
    "version": -24,
    "taskId": 1048648,
    "timerStartedEventAttributes": {
      "timerId": "0",
      "startToFireTimeoutSeconds": 2,
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1599211428939413100,
    "eventType": "TimerFired",
    "version": -24,
    "taskId": 1048651,
    "timerFiredEventAttributes": {
      "timerId": "0",
      "startedEventId": 5
    }
  },
  {
    "eventId": 7,
    "timestamp": 1599211428939477300,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048653,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:4920f209-2477-48e9-8de2-744f2e770bb0"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599211428955668500,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048657,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 7,
      "identity": "4920f209-2477-48e9-8de2-744f2e770bb0",
      "requestId": "8704f5c6-960a-41ac-b0b8-3ae8c1c8a27c"
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599211428984055400,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048660,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 7,
      "startedEventId": 8,
      "identity": "44024@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599211428984173800,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048661,
    "workflowExecutionCompletedEventAttributes": {
      "result": "",
      "decisionTaskCompletedEventId": 9
    }
  }
]