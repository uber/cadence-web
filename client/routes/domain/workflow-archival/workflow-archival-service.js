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

      const controller = new window.AbortController();
      const { signal } = controller;

      requests.fetchArchivalRecords = controller;

      const { executions: results, nextPageToken } = await http(
        window.fetch,
        `/api/domains/${domain}/workflows/archived`,
        { query, signal }
      );

      requests.fetchArchivalRecords = null;

      return { results, nextPageToken };
    },
  };
};
