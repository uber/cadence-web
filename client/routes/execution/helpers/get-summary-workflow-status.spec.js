import getSummaryWorkflowStatus from './get-summary-workflow-status';

describe('getSummaryWorkflowStatus', () => {
  describe('When passed an event with isWorkflowRunning = true', () => {
    it('should return "running".', () => {
      const event = {
        isWorkflowRunning: true,
      };
      const output = getSummaryWorkflowStatus(event);

      expect(output).toEqual('running');
    });
  });

  describe('When passed an event with workflowCompletedEvent = false and workflow.workflowExecutionInfo.closeStatus is defined', () => {
    it('should return workflow.workflowExecutionInfo.closeStatus in lower case.', () => {
      const event = {
        workflow: {
          workflowExecutionInfo: {
            closeStatus: 'closeStatusValue',
          },
        },
        workflowCompletedEvent: false,
      };
      const output = getSummaryWorkflowStatus(event);

      expect(output).toEqual('closestatusvalue');
    });
  });

  describe('When passed an event with workflowCompletedEvent = false and workflow.workflowExecutionInfo.closeStatus is not defined', () => {
    it('should return "running".', () => {
      const event = {
        workflowCompletedEvent: false,
      };
      const output = getSummaryWorkflowStatus(event);

      expect(output).toEqual('running');
    });
  });

  describe('When passed an event with workflowCompletedEvent.eventType === "WorkflowExecutionContinuedAsNew" and workflowCompletedEvent.details.newExecutionRunId is defined', () => {
    let event;

    beforeEach(() => {
      event = {
        workflowCompletedEvent: {
          eventType: 'WorkflowExecutionContinuedAsNew',
          details: {
            newExecutionRunId: 'newExecutionRunIdValue',
          },
        },
      };
    });

    it('should return an object with to.name = "execution/summary".', () => {
      const output = getSummaryWorkflowStatus(event);

      expect(output.to.name).toEqual('execution/summary');
    });

    it('should return an object with to.params.runId.', () => {
      const output = getSummaryWorkflowStatus(event);

      expect(output.to.params.runId).toEqual('newExecutionRunIdValue');
    });

    it('should return an object with text = "Continued As New".', () => {
      const output = getSummaryWorkflowStatus(event);

      expect(output.text).toEqual('Continued As New');
    });

    it('should return an object with status = "continued-as-new".', () => {
      const output = getSummaryWorkflowStatus(event);

      expect(output.status).toEqual('continued-as-new');
    });
  });

  describe('When passed an workflowCompletedEvent.eventType !== "WorkflowExecutionContinuedAsNew"', () => {
    it('should return workflowCompletedEvent.eventType without WorkflowExecution and in lower case.', () => {
      const event = {
        workflowCompletedEvent: {
          eventType: 'NotWorkflowExecutionContinuedAsNew',
        },
      };
      const output = getSummaryWorkflowStatus(event);

      expect(output).toEqual('notcontinuedasnew');
    });
  });
});
