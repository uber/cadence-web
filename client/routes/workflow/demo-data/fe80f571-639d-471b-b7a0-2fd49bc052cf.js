
module.exports = [
  {
    "eventId": 1,
    "timestamp": 1599221075283105700,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1057329,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreeting"
      },
      "taskList": {
        "name": "HelloSearchAttributes"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "fe80f571-639d-471b-b7a0-2fd49bc052cf",
      "identity": "",
      "firstExecutionRunId": "fe80f571-639d-471b-b7a0-2fd49bc052cf",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0,
      "searchAttributes": {
        "indexedFields": {
          "CustomStringField": "IlN0cmluZyBmaWVsZCBpcyBmb3IgdGV4dC4gV2hlbiBxdWVyeSwgaXQgd2lsbCBiZSB0b2tlbml6ZWQgZm9yIHBhcnRpYWwgbWF0Y2guIFN0cmluZ1R5cGVGaWVsZCBjYW5ub3QgYmUgdXNlZCBpbiBPcmRlciBCeSI=",
          "CustomBoolField": "dHJ1ZQ==",
          "CustomKeywordField": "Im9sZCB3b3JsZCI=",
          "CustomDatetimeField": "IjIwMjAtMDktMDRUMTU6MDQ6MzUuMTAzKzAzOjAwIg==",
          "CustomDoubleField": "MC4x",
          "CustomIntField": "MQ=="
        }
      }
    }
  },
  {
    "eventId": 2,
    "timestamp": 1599221075283201800,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1057330,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloSearchAttributes"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1599221075306721100,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1057335,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "58524@etysk-C02ZH2TXLVDQ",
      "requestId": "67f57fe1-38af-442e-91a5-730719750a5b"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1599221075451651500,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1057338,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "58524@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1599221075451702500,
    "eventType": "UpsertWorkflowSearchAttributes",
    "version": -24,
    "taskId": 1057339,
    "upsertWorkflowSearchAttributesEventAttributes": {
      "decisionTaskCompletedEventId": 4,
      "searchAttributes": {
        "indexedFields": {
          "CustomKeywordField": "IldvcmxkIg=="
        }
      }
    }
  },
  {
    "eventId": 6,
    "timestamp": 1599221075451730000,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1057340,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "GreetingActivities::composeGreeting"
      },
      "taskList": {
        "name": "HelloSearchAttributes"
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
    "eventId": 7,
    "timestamp": 1599221075464813300,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1057345,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 6,
      "identity": "58524@etysk-C02ZH2TXLVDQ",
      "requestId": "01e2a09e-616f-4822-8e1c-806749116a87",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 8,
    "timestamp": 1599221075495861100,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 1057348,
    "activityTaskCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "scheduledEventId": 6,
      "startedEventId": 7,
      "identity": "58524@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 9,
    "timestamp": 1599221075495925900,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1057350,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:f7d397de-392a-48a0-850a-57b7b0111bb4"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 10,
    "timestamp": 1599221075517706400,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1057354,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 9,
      "identity": "f7d397de-392a-48a0-850a-57b7b0111bb4",
      "requestId": "b151eb74-0c26-4fd4-8515-f8d613be3cc4"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1599221075550677700,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1057357,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 9,
      "startedEventId": 10,
      "identity": "58524@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 12,
    "timestamp": 1599221075550724800,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1057358,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 11
    }
  }
]