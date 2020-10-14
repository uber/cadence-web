module.exports = [
  {
    "eventId": 1,
    "timestamp": 1599231974342504800,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048576,
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
      "originalExecutionRunId": "a57bb2c9-1f78-4cf8-b0b4-063932953deb",
      "identity": "",
      "firstExecutionRunId": "a57bb2c9-1f78-4cf8-b0b4-063932953deb",
      "attempt": 0,
      "cronSchedule": "*/1 * * * *",
      "firstDecisionTaskBackoffSeconds": 46
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599232020349130600,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048581,
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
    "timestamp": 1599232020362181500,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048584,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "70778@etysk-C02ZH2TXLVDQ",
      "requestId": "f3765c64-538f-4ad7-8c06-3ce20b8178f7"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599232020481163400,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048587,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "70778@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599232020481478100,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1048588,
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
    "timestamp": 1599232020500286900,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1048592,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 5,
      "identity": "70778@etysk-C02ZH2TXLVDQ",
      "requestId": "61da3c26-b44f-4b3d-9994-484c39910916",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 7,
    "timestamp": 1599232020527625300,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 1048595,
    "activityTaskCompletedEventAttributes": {
      "scheduledEventId": 5,
      "startedEventId": 6,
      "identity": "70778@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599232020527679600,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048597,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:5dff323c-3268-4c6b-8e36-a493b466cdec"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599232020542238900,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048601,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "5dff323c-3268-4c6b-8e36-a493b466cdec",
      "requestId": "d8347e2d-cc6f-4c9a-a14b-a00f51dc999a"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599232020577225500,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048604,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "70778@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1599232020577476500,
    "eventType": "WorkflowExecutionContinuedAsNew",
    "version": -24,
    "taskId": 1048605,
    "workflowExecutionContinuedAsNewEventAttributes": {
      "newExecutionRunId": "52e884d4-e002-4a9b-b0d7-9fe2dfd45e16",
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