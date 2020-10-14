module.exports = [
  {
    "eventId": 1,
    "timestamp": 1599232020577550100,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048607,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "CronWorkflow::greetPeriodically"
      },
      "taskList": {
        "name": "HelloCron"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "continuedExecutionRunId": "a57bb2c9-1f78-4cf8-b0b4-063932953deb",
      "initiator": "CronSchedule",
      "lastCompletionResult": "",
      "originalExecutionRunId": "52e884d4-e002-4a9b-b0d7-9fe2dfd45e16",
      "identity": "",
      "firstExecutionRunId": "a57bb2c9-1f78-4cf8-b0b4-063932953deb",
      "attempt": 0,
      "cronSchedule": "*/1 * * * *",
      "firstDecisionTaskBackoffSeconds": 60,
      "prevAutoResetPoints": {}
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599232080589582600,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048619,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloCron"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1599232080619715900,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048622,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "70837@etysk-C02ZH2TXLVDQ",
      "requestId": "b2fd8572-e3d7-4038-b25e-2bc897a8ecda"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599232080766652400,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048625,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "70837@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599232080766688200,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1048626,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "GreetingActivities::greet"
      },
      "taskList": {
        "name": "HelloCron"
      },
      "input": "IkhlbGxvIFdvcmxkISI=",
      "scheduleToCloseTimeoutSeconds": 10,
      "scheduleToStartTimeoutSeconds": 10,
      "startToCloseTimeoutSeconds": 10,
      "heartbeatTimeoutSeconds": 10,
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1599232080783867600,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1048630,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 5,
      "identity": "70837@etysk-C02ZH2TXLVDQ",
      "requestId": "8cf5ee83-0fa2-49e7-81d5-3e5ed948f7d8",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 7,
    "timestamp": 1599232080816469900,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 1048633,
    "activityTaskCompletedEventAttributes": {
      "scheduledEventId": 5,
      "startedEventId": 6,
      "identity": "70837@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599232080816537800,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048635,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:63a56f32-39df-4587-ba70-577eae885240"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599232080834610000,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048639,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "63a56f32-39df-4587-ba70-577eae885240",
      "requestId": "e7b45c0b-f076-45cc-92d4-ea2f30a67b02"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599232080872901700,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048642,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "70837@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1599232080873133800,
    "eventType": "WorkflowExecutionContinuedAsNew",
    "version": -24,
    "taskId": 1048643,
    "workflowExecutionContinuedAsNewEventAttributes": {
      "newExecutionRunId": "4c8e5568-803d-4da7-804a-ac3548e7f3b5",
      "workflowType": {
        "name": "CronWorkflow::greetPeriodically"
      },
      "taskList": {
        "name": "HelloCron"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "decisionTaskCompletedEventId": 10,
      "backoffStartIntervalInSeconds": 60,
      "initiator": "CronSchedule",
      "lastCompletionResult": ""
    }
  }
]