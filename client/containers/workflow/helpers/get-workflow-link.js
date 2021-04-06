const getWorkflowLink = ({
  domain,
  runID,
  workflowID,
}) => domain && runID && workflowID && `/domains/${domain}/workflows/${workflowID}/${runID}/summary` || undefined;

export default getWorkflowLink;
