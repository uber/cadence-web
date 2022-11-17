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

const moment = require('moment');
const {
  buildQueryString,
  injectDomainIntoWorkflowList,
} = require('../helpers');

const workflowArchivedListHandler = async ctx => {
  const { nextPageToken, ...query } = ctx.query || {};
  const { params = {} } = ctx;
  let queryString;

  if (query.queryString) {
    queryString = query.queryString;
  } else {
    const startTime = moment(query.startTime || NaN);
    const endTime = moment(query.endTime || NaN);

    ctx.assert(startTime.isValid() && endTime.isValid(), 400);
    queryString = buildQueryString(startTime, endTime, query);
  }

  const archivedWorkflowsResponse = await ctx.cadence.archivedWorkflows({
    query: queryString,
    nextPageToken,
  });

  archivedWorkflowsResponse.executions = injectDomainIntoWorkflowList(
    params.domain,
    archivedWorkflowsResponse
  );

  ctx.body = archivedWorkflowsResponse;
};

module.exports = workflowArchivedListHandler;
