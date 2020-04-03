import moment from 'moment';

export default ({ executions, nextPageToken }) => ({
  results: !executions
    ? []
    : executions.map(
        ({
          closeStatus,
          closeTime,
          execution: { runId, workflowId },
          startTime,
          type: { name },
        }) => ({
          closeStatus,
          closeTime: moment(closeTime).format('lll'),
          runId,
          startTime: moment(startTime).format('lll'),
          workflowId,
          workflowName: name,
        })
      ),
  nextPageToken,
});
