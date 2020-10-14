module.exports =[
  {
    "eventId": 1,
    "timestamp": 1599211109349670900,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048767,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreeting"
      },
      "taskList": {
        "name": "HelloAsyncActivityCompletion"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 15,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "18546f28-b06f-4fd2-a5b8-dfeeca5dd195",
      "identity": "",
      "firstExecutionRunId": "18546f28-b06f-4fd2-a5b8-dfeeca5dd195",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599211109349783000,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048768,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloAsyncActivityCompletion"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1599211109372614200,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048773,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "43344@etysk-C02ZH2TXLVDQ",
      "requestId": "154b3eb1-6e8d-4c50-b3fa-36a579b96360"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599211109498452900,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048776,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "43344@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599211109498489900,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1048777,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "GreetingActivities::composeGreeting"
      },
      "taskList": {
        "name": "HelloAsyncActivityCompletion"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "scheduleToCloseTimeoutSeconds": 10,
      "scheduleToStartTimeoutSeconds": 10,
      "startToCloseTimeoutSeconds": 10,
      "heartbeatTimeoutSeconds": 10,
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1599211109511806200,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1048781,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 5,
      "identity": "43344@etysk-C02ZH2TXLVDQ",
      "requestId": "5406a874-bea6-4418-9a45-599c7d5ea355",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 7,
    "timestamp": 1599211109536550600,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 1048784,
    "activityTaskCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "scheduledEventId": 5,
      "startedEventId": 6,
      "identity": ""
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599211109536602200,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048786,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:0a298609-34ca-4b41-8c17-e996f8684aa0"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599211109550995200,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048790,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "0a298609-34ca-4b41-8c17-e996f8684aa0",
      "requestId": "c3c9d267-ac20-4d85-ac45-80da9db2f20a"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599211109575839100,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048793,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "43344@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1599211109575872200,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048794,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 10
    }
  }
]