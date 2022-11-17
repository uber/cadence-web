// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { httpService } from '~services';

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

      const { executions: results, nextPageToken } = await httpService.get(
        `/api/domains/${domain}/workflows/archived`,
        {
          query,
          signal,
        }
      );

      requests.fetchArchivalRecords = null;

      return { results, nextPageToken };
    },
  };
};
