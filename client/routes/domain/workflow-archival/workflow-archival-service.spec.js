import WorkflowArchivalService from './workflow-archival-service';

describe('WorkflowArchivalService', () => {
  it('should make an API request when fetchArchivalRecords is called', async () => {
    const workflowArchivalService = WorkflowArchivalService({
      domain: 'samples-domain',
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        executions: [
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
        ],
        nextPageToken: 'nextPageTokenValue',
      })
    );
    const output = await workflowArchivalService.fetchArchivalRecords({
      query: 'queryString',
    });

    expect(output).toEqual({
      nextPageToken: 'nextPageTokenValue',
      results: [
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
      ],
    });
  });
});
