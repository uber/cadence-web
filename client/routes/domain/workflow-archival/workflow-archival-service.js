import { mapArchivedWorkflowResponse } from './helpers';
import { http } from '~helpers';

export default ({ domain }) => {
  return {
    fetchArchivalRecords: async query => {
      const response = await http(
        window.fetch,
        `/api/domains/${domain}/workflows/archived`,
        { query }
      );

      return mapArchivedWorkflowResponse(response);
    },
  };
};
