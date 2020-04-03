import { mapArchivedWorkflowResponse } from './helpers';
import { http } from '~helpers';

export default ({ domain }) => {
  const requests = {
    fetchArchivalRecords: null,
  };

  return {
    fetchArchivalRecords: async query => {
      if (requests.fetchArchivalRecords) {
        requests.fetchArchivalRecords.abort();
      }

      const controller = new AbortController();
      const { signal } = controller;

      requests.fetchArchivalRecords = controller;

      const response = await http(
        window.fetch,
        `/api/domains/${domain}/workflows/archived`,
        { query, signal }
      );

      const mappedResponse = mapArchivedWorkflowResponse(response);

      requests.fetchArchivalRecords = null;

      return mappedResponse;
    },
  };
};
