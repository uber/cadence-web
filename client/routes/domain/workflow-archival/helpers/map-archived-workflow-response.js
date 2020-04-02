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
          workflowId,
          runId,
          workflowName: name,
          closeStatus,
          startTime: moment(startTime).format('lll'),
          closeTime: moment(closeTime).format('lll'),
        })
      ),
  nextPageToken,
});
