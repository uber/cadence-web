const buildQueryString = (
  startTime,
  endTime,
  { status, workflowId, workflowName }
) =>
  [
    `CloseTime >= "${startTime.toISOString()}"`,
    `CloseTime <= "${endTime.toISOString()}"`,
    status && `CloseStatus = "${status}"`,
    workflowId && `WorkflowID = "${workflowId}"`,
    workflowName && `WorkflowType = "${workflowName}"`,
  ]
    .filter(subQuery => !!subQuery)
    .join(' and ');

module.exports = buildQueryString;
