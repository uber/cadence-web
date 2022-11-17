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

const formatLongToTimestamp = require('./format-long-to-timestamp');

const formatRequestWorkflowList = payload => {
  const {
    StartTimeFilter: { earliestTime, latestTime },
    statusFilter,
    ...restOfPayload
  } = payload;

  return {
    ...restOfPayload,
    startTimeFilter: {
      earliestTime: formatLongToTimestamp(earliestTime),
      latestTime: formatLongToTimestamp(latestTime),
    },
    ...(statusFilter && {
      statusFilter: {
        status: `WORKFLOW_EXECUTION_CLOSE_STATUS_${statusFilter}`,
      },
    }),
  };
};

module.exports = formatRequestWorkflowList;
