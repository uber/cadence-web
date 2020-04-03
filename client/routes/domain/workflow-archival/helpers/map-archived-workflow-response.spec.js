import mapArchivedWorkflowResponse from './map-archived-workflow-response';

describe('mapArchivedWorkflowResponse', () => {
  describe('When passed nextPageToken = "123"', () => {
    it('should return nextPageToken = "123".', () => {
      const nextPageToken = '123';
      const output = mapArchivedWorkflowResponse({ nextPageToken });
      expect(output.nextPageToken).toEqual('123');
    });
  });

  describe('When passed executions with 1 item', () => {
    const executions = [
      {
        closeStatus: 'closeStatusValue',
        closeTime: '2020-03-30T00:00:00Z',
        execution: {
          runId: 'runIdValue',
          workflowId: 'workflowIdValue'
        },
        startTime: '2020-03-01T00:00:00Z',
        type: {
          name: 'workflowNameValue'
        },
      }
    ];

    it('should return a flattened results array', () => {
      const output = mapArchivedWorkflowResponse({ executions });
      expect(output.results[0].closeStatus).toEqual('closeStatusValue');
      expect(output.results[0].closeTime).toEqual('Mar 29, 2020 5:00 PM');
      expect(output.results[0].runId).toEqual('runIdValue');
      expect(output.results[0].startTime).toEqual('Feb 29, 2020 4:00 PM');
      expect(output.results[0].workflowId).toEqual('workflowIdValue');
      expect(output.results[0].workflowName).toEqual('workflowNameValue');
    });
  });
});
