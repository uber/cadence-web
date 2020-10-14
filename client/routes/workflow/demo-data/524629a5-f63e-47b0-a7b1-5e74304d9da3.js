module.exports = [
  {
    "eventId": 1,
    "timestamp": 1599210442815483700,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048576,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreeting"
      },
      "taskList": {
        "name": "HelloActivity"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "524629a5-f63e-47b0-a7b1-5e74304d9da3",
      "identity": "",
      "firstExecutionRunId": "524629a5-f63e-47b0-a7b1-5e74304d9da3",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599210442815675600,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048577,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloActivity"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1599210442840877800,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048582,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "42441@etysk-C02ZH2TXLVDQ",
      "requestId": "54a6926c-22ba-4582-92c9-8a87bcfb0c59"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599210442984572800,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048585,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "42441@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599210442984612600,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1048586,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "GreetingActivities::composeGreeting"
      },
      "taskList": {
        "name": "HelloActivity"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "scheduleToCloseTimeoutSeconds": 2,
      "scheduleToStartTimeoutSeconds": 2,
      "startToCloseTimeoutSeconds": 2,
      "heartbeatTimeoutSeconds": 2,
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1599210442997061200,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1048590,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 5,
      "identity": "42441@etysk-C02ZH2TXLVDQ",
      "requestId": "ddf7c18b-b5d4-4af2-80b0-a0e9b5eec3fb",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 7,
    "timestamp": 1599210443025761900,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 1048593,
    "activityTaskCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "scheduledEventId": 5,
      "startedEventId": 6,
      "identity": "42441@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599210443025818000,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048595,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:a839fae6-bf35-4b44-947a-1b8a882d05fb"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599210443040719600,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048599,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "a839fae6-bf35-4b44-947a-1b8a882d05fb",
      "requestId": "cb453be6-81b2-47cc-a618-8bc92bea60d7"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599210443071877300,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048602,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "42441@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1599210443071917700,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048603,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 10
    }
  }
]