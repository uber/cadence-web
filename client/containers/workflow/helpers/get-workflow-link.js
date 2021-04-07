const getWorkflowLink = ({
  domain,
  runID,
  workflowID,
}) => domain && runID && workflowID && ({
  routeLink: `/domains/${domain}/workflows/${workflowID}/${runID}/summary`,
  text: runID,
}) || undefined;

export default getWorkflowLink;
