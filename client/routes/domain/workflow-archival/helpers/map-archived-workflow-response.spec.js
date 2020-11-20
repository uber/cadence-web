import mapArchivedWorkflowResponse from './map-archived-workflow-response';

describe('mapArchivedWorkflowResponse', () => {
  it('should return a flattened results array when passed executions with 1 item', () => {
    const results = [
      {
        closeStatus: 'closeStatusValue',
        closeTime: '2020-03-30T00:00:00Z',
        execution: {
          runId: 'runIdValue',
          workflowId: 'workflowIdValue',
        },
        startTime: '2020-03-01T00:00:00Z',
        type: {
          name: 'workflowNameValue',
        },
      },
    ];
    const output = mapArchivedWorkflowResponse({ results });

    expect(output[0].closeStatus).toEqual('closeStatusValue');
    expect(output[0].closeTime).toEqual('Mar 30, 2020 12:00:00 AM');
    expect(output[0].runId).toEqual('runIdValue');
    expect(output[0].startTime).toEqual('Mar 1, 2020 12:00:00 AM');
    expect(output[0].workflowId).toEqual('workflowIdValue');
    expect(output[0].workflowName).toEqual('workflowNameValue');
  });
});
