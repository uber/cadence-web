module.exports =[
  {
    "eventId": 1,
    "timestamp": 1599210588915581900,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048860,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreeting"
      },
      "taskList": {
        "name": "HelloActivityRetry"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "3432067e-fed0-4c4d-9a16-a3395e1eb1d8",
      "identity": "",
      "firstExecutionRunId": "3432067e-fed0-4c4d-9a16-a3395e1eb1d8",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599210588915700300,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048861,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloActivityRetry"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1599210588943570300,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048866,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "42670@etysk-C02ZH2TXLVDQ",
      "requestId": "cf3c6bcd-f7a8-4115-8564-3a1dce4440a0"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599210589113643600,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048869,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "42670@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599210589113704300,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1048870,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "GreetingActivities::composeGreeting"
      },
      "taskList": {
        "name": "HelloActivityRetry"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "scheduleToCloseTimeoutSeconds": 60,
      "scheduleToStartTimeoutSeconds": 60,
      "startToCloseTimeoutSeconds": 10,
      "heartbeatTimeoutSeconds": 10,
      "decisionTaskCompletedEventId": 4,
      "retryPolicy": {
        "initialIntervalInSeconds": 1,
        "backoffCoefficient": 2,
        "maximumIntervalInSeconds": 0,
        "maximumAttempts": 0,
        "nonRetriableErrorReasons": [
          "java.lang.IllegalArgumentException"
        ],
        "expirationIntervalInSeconds": 60
      }
    }
  },
  {
    "eventId": 6,
    "timestamp": 1599210596233537700,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1048884,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 5,
      "identity": "42670@etysk-C02ZH2TXLVDQ",
      "requestId": "58dd07ac-e9d9-4beb-8ac9-efa63f6680c3",
      "attempt": 3,
      "lastFailureReason": "java.lang.IllegalStateException",
      "lastFailureDetails": "eyJkZXRhaWxNZXNzYWdlIjoibm90IHlldCIsInN0YWNrVHJhY2UiOiJjb20udWJlci5jYWRlbmNlLnNhbXBsZXMuaGVsbG8uSGVsbG9BY3Rpdml0eVJldHJ5JEdyZWV0aW5nQWN0aXZpdGllc0ltcGwuY29tcG9zZUdyZWV0aW5nKEhlbGxvQWN0aXZpdHlSZXRyeS5qYXZhOjk0KVxuc3VuLnJlZmxlY3QuTmF0aXZlTWV0aG9kQWNjZXNzb3JJbXBsLmludm9rZTAoTmF0aXZlIE1ldGhvZClcbnN1bi5yZWZsZWN0Lk5hdGl2ZU1ldGhvZEFjY2Vzc29ySW1wbC5pbnZva2UoTmF0aXZlTWV0aG9kQWNjZXNzb3JJbXBsLmphdmE6NjIpXG5zdW4ucmVmbGVjdC5EZWxlZ2F0aW5nTWV0aG9kQWNjZXNzb3JJbXBsLmludm9rZShEZWxlZ2F0aW5nTWV0aG9kQWNjZXNzb3JJbXBsLmphdmE6NDMpXG5qYXZhLmxhbmcucmVmbGVjdC5NZXRob2QuaW52b2tlKE1ldGhvZC5qYXZhOjQ5OClcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwuc3luYy5QT0pPQWN0aXZpdHlUYXNrSGFuZGxlciRQT0pPQWN0aXZpdHlJbXBsZW1lbnRhdGlvbi5leGVjdXRlKFBPSk9BY3Rpdml0eVRhc2tIYW5kbGVyLmphdmE6MjE0KVxuY29tLnViZXIuY2FkZW5jZS5pbnRlcm5hbC5zeW5jLlBPSk9BY3Rpdml0eVRhc2tIYW5kbGVyLmhhbmRsZShQT0pPQWN0aXZpdHlUYXNrSGFuZGxlci5qYXZhOjE5MClcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwud29ya2VyLkFjdGl2aXR5V29ya2VyJFRhc2tIYW5kbGVySW1wbC5oYW5kbGUoQWN0aXZpdHlXb3JrZXIuamF2YToxNzUpXG5jb20udWJlci5jYWRlbmNlLmludGVybmFsLndvcmtlci5BY3Rpdml0eVdvcmtlciRUYXNrSGFuZGxlckltcGwuaGFuZGxlKEFjdGl2aXR5V29ya2VyLmphdmE6MTQ2KVxuY29tLnViZXIuY2FkZW5jZS5pbnRlcm5hbC53b3JrZXIuUG9sbFRhc2tFeGVjdXRvci5sYW1iZGEkcHJvY2VzcyQwKFBvbGxUYXNrRXhlY3V0b3IuamF2YTo3MSlcbmphdmEudXRpbC5jb25jdXJyZW50LlRocmVhZFBvb2xFeGVjdXRvci5ydW5Xb3JrZXIoVGhyZWFkUG9vbEV4ZWN1dG9yLmphdmE6MTE0OSlcbmphdmEudXRpbC5jb25jdXJyZW50LlRocmVhZFBvb2xFeGVjdXRvciRXb3JrZXIucnVuKFRocmVhZFBvb2xFeGVjdXRvci5qYXZhOjYyNClcbmphdmEubGFuZy5UaHJlYWQucnVuKFRocmVhZC5qYXZhOjc0OClcbiIsInN1cHByZXNzZWRFeGNlcHRpb25zIjpbXSwiY2xhc3MiOiJqYXZhLmxhbmcuSWxsZWdhbFN0YXRlRXhjZXB0aW9uIn0="
    }
  },
  {
    "eventId": 7,
    "timestamp": 1599210596254225800,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 1048885,
    "activityTaskCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "scheduledEventId": 5,
      "startedEventId": 6,
      "identity": "42670@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599210596254285700,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048888,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:4164ffa2-3744-470f-9090-5d32738e063d"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599210596267780400,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048892,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "4164ffa2-3744-470f-9090-5d32738e063d",
      "requestId": "a8ae4621-b19f-4fce-9971-c93412a022fa"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599210596299083000,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048895,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "42670@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1599210596299231300,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048896,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 10
    }
  }
]