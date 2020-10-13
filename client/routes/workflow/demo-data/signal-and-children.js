module.exports =[
  {
    "eventId": 1,
    "timestamp": 1597823914097219846,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 978420961,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "workflow.signal"
      },
      "parentWorkflowDomain": "cadence-canary",
      "parentWorkflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-19T07:58:33Z",
        "runId": "9fe65281-e382-4684-84fd-e1c4244594d1"
      },
      "parentInitiatedEventId": 9,
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyMzkxMzg0MjEwODE1MgoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "46a64bdc-571a-4ec6-a7b8-0afc15a82a69",
      "identity": "",
      "firstExecutionRunId": "46a64bdc-571a-4ec6-a7b8-0afc15a82a69",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0,
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597823914202801095,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978420965,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "canary-task-queue"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1597823914222032985,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978420968,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "60cc4f6e-01c0-4998-a840-d76dae514fdd"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597823914229139732,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978420971,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597823914229204813,
    "eventType": "MarkerRecorded",
    "version": -24,
    "taskId": 978420972,
    "markerRecordedEventAttributes": {
      "markerName": "Version",
      "details": "ImluaXRpYWwgdmVyc2lvbiIKMwo=",
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1597823914229320364,
    "eventType": "UpsertWorkflowSearchAttributes",
    "version": -24,
    "taskId": 978420973,
    "upsertWorkflowSearchAttributesEventAttributes": {
      "decisionTaskCompletedEventId": 4,
      "searchAttributes": {
        "indexedFields": {
          "CadenceChangeVersion": "WyJpbml0aWFsIHZlcnNpb24tMyJd"
        }
      }
    }
  },
  {
    "eventId": 7,
    "timestamp": 1597823914229336787,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 978420974,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "activity.signal.SignalWorkflow"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyMzkxNDIyMjAzMjk4NQp7IklEIjoiY2FkZW5jZS5jYW5hcnkuY3Jvbi13b3JrZmxvdy5zYW5pdHktMjAyMC0wOC0xOVQwNzo1ODozM1ovd29ya2Zsb3cuc2lnbmFsIiwiUnVuSUQiOiI0NmE2NGJkYy01NzFhLTRlYzYtYTdiOC0wYWZjMTVhODJhNjkifQoic2lnLjQ2YTY0YmRjLTU3MWEtNGVjNi1hN2I4LTBhZmMxNWE4MmE2OSIK",
      "scheduleToCloseTimeoutSeconds": 360,
      "scheduleToStartTimeoutSeconds": 180,
      "startToCloseTimeoutSeconds": 180,
      "heartbeatTimeoutSeconds": 0,
      "decisionTaskCompletedEventId": 4,
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 8,
    "timestamp": 1597823914236569668,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 978420980,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 7,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "5cbe4b56-4b60-4df5-8a1c-00da0a7d56c0",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 9,
    "timestamp": 1597823914243083251,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 978420983,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "sig.46a64bdc-571a-4ec6-a7b8-0afc15a82a69",
      "input": "ImNhbmFyeS5zaWduYWwiCg==",
      "identity": "80@compute6823-dca1@"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1597823914243092642,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978420985,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 11,
    "timestamp": 1597823914248947906,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978420989,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 10,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "8624d391-4a17-4bd8-99fc-371ae75b71a5"
    }
  },
  {
    "eventId": 12,
    "timestamp": 1597823914256736827,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978420992,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 10,
      "startedEventId": 11,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 13,
    "timestamp": 1597823914253118744,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 978420993,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "sig.46a64bdc-571a-4ec6-a7b8-0afc15a82a69",
      "input": "ImNhbmFyeS5zaWduYWwiCg==",
      "identity": "80@compute6823-dca1@"
    }
  },
  {
    "eventId": 14,
    "timestamp": 1597823914256795425,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978420996,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 15,
    "timestamp": 1597823914256808746,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978420997,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 14,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "request-from-RespondDecisionTaskCompleted"
    }
  },
  {
    "eventId": 16,
    "timestamp": 1597823914265164394,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421000,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 14,
      "startedEventId": 15,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 17,
    "timestamp": 1597823914261602521,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 978421001,
    "activityTaskCompletedEventAttributes": {
      "scheduledEventId": 7,
      "startedEventId": 8,
      "identity": "80@compute6823-dca1@canary-task-queue"
    }
  },
  {
    "eventId": 18,
    "timestamp": 1597823914265243526,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421004,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 19,
    "timestamp": 1597823914265260213,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421005,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 18,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "request-from-RespondDecisionTaskCompleted"
    }
  },
  {
    "eventId": 20,
    "timestamp": 1597823914272125344,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421008,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 18,
      "startedEventId": 19,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 21,
    "timestamp": 1597823914272244049,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 978421009,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.signal.external-child",
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyMzkxNDI2NTI2MDIxMwoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 20,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 22,
    "timestamp": 1597823914301269006,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 978421012,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 21,
      "workflowExecution": {
        "workflowId": "workflow.signal.external-child",
        "runId": "1fa30ff1-8f79-4133-87d0-ad96a3032793"
      },
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 23,
    "timestamp": 1597823914301287068,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421014,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 24,
    "timestamp": 1597823914318622701,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421018,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 23,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "0487de53-8fdc-42c1-9196-f3d2636b80da"
    }
  },
  {
    "eventId": 25,
    "timestamp": 1597823914325766615,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421021,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 23,
      "startedEventId": 24,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 26,
    "timestamp": 1597823914325865262,
    "eventType": "SignalExternalWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 978421022,
    "signalExternalWorkflowExecutionInitiatedEventAttributes": {
      "decisionTaskCompletedEventId": 25,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-child",
        "runId": ""
      },
      "signalName": "signal-name",
      "input": "ImNhbmFyeS5zaWduYWwiCg==",
      "control": "MQ==",
      "childWorkflowOnly": true
    }
  },
  {
    "eventId": 27,
    "timestamp": 1597823914337322807,
    "eventType": "ExternalWorkflowExecutionSignaled",
    "version": -24,
    "taskId": 978421025,
    "externalWorkflowExecutionSignaledEventAttributes": {
      "initiatedEventId": 26,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-child",
        "runId": ""
      },
      "control": "MQ=="
    }
  },
  {
    "eventId": 28,
    "timestamp": 1597823914337338864,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421027,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 29,
    "timestamp": 1597823914343386310,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421031,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 28,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "72c5354a-a87a-496a-898c-a27e04b02dcf"
    }
  },
  {
    "eventId": 30,
    "timestamp": 1597823914350256079,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421034,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 28,
      "startedEventId": 29,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 31,
    "timestamp": 1597823914350341637,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 978421035,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.signal.external-without-run-ID",
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyMzkxNDM0MzM4NjMxMAoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 30,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 32,
    "timestamp": 1597823914355593804,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 978421038,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-child",
        "runId": "1fa30ff1-8f79-4133-87d0-ad96a3032793"
      },
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "initiatedEventId": 21,
      "startedEventId": 22
    }
  },
  {
    "eventId": 33,
    "timestamp": 1597823914355605066,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421040,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 34,
    "timestamp": 1597823914384283906,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 978421044,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 31,
      "workflowExecution": {
        "workflowId": "workflow.signal.external-without-run-ID",
        "runId": "4a25ba3e-e4b3-4bc3-842f-54e1800809df"
      },
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 35,
    "timestamp": 1597823914394493889,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421046,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 33,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "636de7a6-6b74-4c9c-8ac8-4e4e61ec2558"
    }
  },
  {
    "eventId": 36,
    "timestamp": 1597823914401577914,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421049,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 33,
      "startedEventId": 35,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 37,
    "timestamp": 1597823914401638466,
    "eventType": "SignalExternalWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 978421050,
    "signalExternalWorkflowExecutionInitiatedEventAttributes": {
      "decisionTaskCompletedEventId": 36,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-without-run-ID",
        "runId": ""
      },
      "signalName": "signal-name",
      "input": "ImNhbmFyeS5zaWduYWwiCg==",
      "control": "Mg==",
      "childWorkflowOnly": false
    }
  },
  {
    "eventId": 38,
    "timestamp": 1597823914413552171,
    "eventType": "ExternalWorkflowExecutionSignaled",
    "version": -24,
    "taskId": 978421053,
    "externalWorkflowExecutionSignaledEventAttributes": {
      "initiatedEventId": 37,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-without-run-ID",
        "runId": ""
      },
      "control": "Mg=="
    }
  },
  {
    "eventId": 39,
    "timestamp": 1597823914413573964,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421055,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 40,
    "timestamp": 1597823914419662184,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421059,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 39,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "4d858bea-8070-4d11-9aa3-d36bd9a47720"
    }
  },
  {
    "eventId": 41,
    "timestamp": 1597823914425745753,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421062,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 39,
      "startedEventId": 40,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 42,
    "timestamp": 1597823914430255403,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 978421064,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-without-run-ID",
        "runId": "4a25ba3e-e4b3-4bc3-842f-54e1800809df"
      },
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "initiatedEventId": 31,
      "startedEventId": 34
    }
  },
  {
    "eventId": 43,
    "timestamp": 1597823914430271080,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421066,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 44,
    "timestamp": 1597823914436263824,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421070,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 43,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "e9e2b6f6-3b36-480d-97bd-c4ad729971a5"
    }
  },
  {
    "eventId": 45,
    "timestamp": 1597823914442532509,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421073,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 43,
      "startedEventId": 44,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 46,
    "timestamp": 1597823914442615174,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 978421074,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.signal.external-with-run-ID",
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyMzkxNDQzNjI2MzgyNAoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 45,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 47,
    "timestamp": 1597823914456825892,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 978421077,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 46,
      "workflowExecution": {
        "workflowId": "workflow.signal.external-with-run-ID",
        "runId": "e3de0354-fb3a-4f4b-b7cc-8cc3e7e404c3"
      },
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "Nzg1YThlNjM3ZGY5YTNkYTozZGQzNzFiOGJkNGRiN2Q1Ojc4NWE4ZTYzN2RmOWEzZGE6MA=="
        }
      }
    }
  },
  {
    "eventId": 48,
    "timestamp": 1597823914456840202,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421079,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 49,
    "timestamp": 1597823914505538791,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421083,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 48,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "a292dff2-87cc-4ea4-9b4c-f143abbdab0e"
    }
  },
  {
    "eventId": 50,
    "timestamp": 1597823914513656584,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421086,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 48,
      "startedEventId": 49,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 51,
    "timestamp": 1597823914513763448,
    "eventType": "SignalExternalWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 978421087,
    "signalExternalWorkflowExecutionInitiatedEventAttributes": {
      "decisionTaskCompletedEventId": 50,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-with-run-ID",
        "runId": "e3de0354-fb3a-4f4b-b7cc-8cc3e7e404c3"
      },
      "signalName": "signal-name",
      "input": "ImNhbmFyeS5zaWduYWwiCg==",
      "control": "Mw==",
      "childWorkflowOnly": false
    }
  },
  {
    "eventId": 52,
    "timestamp": 1597823914525489634,
    "eventType": "ExternalWorkflowExecutionSignaled",
    "version": -24,
    "taskId": 978421090,
    "externalWorkflowExecutionSignaledEventAttributes": {
      "initiatedEventId": 51,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-with-run-ID",
        "runId": "e3de0354-fb3a-4f4b-b7cc-8cc3e7e404c3"
      },
      "control": "Mw=="
    }
  },
  {
    "eventId": 53,
    "timestamp": 1597823914525521977,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421092,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 54,
    "timestamp": 1597823914539262371,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421096,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 53,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "3fb603bf-3b4d-40ab-aef7-8b76b29ede59"
    }
  },
  {
    "eventId": 55,
    "timestamp": 1597823914549242148,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421099,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 53,
      "startedEventId": 54,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 56,
    "timestamp": 1597823914545198429,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 978421100,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.signal.external-with-run-ID",
        "runId": "e3de0354-fb3a-4f4b-b7cc-8cc3e7e404c3"
      },
      "workflowType": {
        "name": "workflow.signal.external"
      },
      "initiatedEventId": 46,
      "startedEventId": 47
    }
  },
  {
    "eventId": 57,
    "timestamp": 1597823914549295624,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 978421103,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6823-dca1:78bf446f-3f50-407e-8ff9-818b1809aa47"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 58,
    "timestamp": 1597823914549323763,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 978421104,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 57,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "request-from-RespondDecisionTaskCompleted"
    }
  },
  {
    "eventId": 59,
    "timestamp": 1597823914555959975,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 978421107,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 57,
      "startedEventId": 58,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 60,
    "timestamp": 1597823914556024144,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 978421108,
    "workflowExecutionCompletedEventAttributes": {
      "decisionTaskCompletedEventId": 59
    }
  }
]