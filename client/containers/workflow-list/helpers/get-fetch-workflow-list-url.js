import { FILTER_MODE_ADVANCED } from '../constants';

const getFetchWorkflowListUrl = ({
  domain,
  filterMode,
  state,
}) => {
  const workflowsBaseUrl = `/api/domains/${domain}/workflows`;
  return filterMode === FILTER_MODE_ADVANCED
    ? `${workflowsBaseUrl}/list`
    : `${workflowsBaseUrl}/${state}`;
};

export default getFetchWorkflowListUrl;
