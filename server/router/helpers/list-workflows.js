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
const buildQueryString = require('./build-query-string');
const injectDomainIntoWorkflowList = require('./inject-domain-into-workflow-list');
const isAdvancedVisibilityEnabled = require('./is-advanced-visibility-enabled');
const momentToLong = require('./moment-to-long');

async function listWorkflows({ clusterService, state }, ctx) {
  const { params = {}, query = {} } = ctx;
  const startTime = moment(query.startTime || NaN);
  const endTime = moment(query.endTime || NaN);

  ctx.assert(startTime.isValid() && endTime.isValid(), 400);

  const cluster = await clusterService.getCluster(ctx);

  const advancedVisibility = isAdvancedVisibilityEnabled(cluster);

  if (state === 'all') {
    ctx.assert(
      advancedVisibility,
      'Advanced visibility is not supported for cluster. Try using workflows open or closed APIs.',
      400
    );
  }

  const earliestTime = momentToLong(startTime);
  const latestTime = momentToLong(endTime);
  const { nextPageToken, status, workflowId, workflowName } = query;

  const requestArgs = advancedVisibility
    ? {
        query: buildQueryString(startTime, endTime, {
          ...query,
          state,
        }),
      }
    : {
        StartTimeFilter: {
          earliestTime,
          latestTime,
        },
        ...(workflowName && { typeFilter: { name: workflowName } }),
        ...(workflowId && { executionFilter: { workflowId } }),
        ...(status && { statusFilter: status }),
        nextPageToken,
      };

  const requestApi = advancedVisibility ? 'listWorkflows' : state + 'Workflows';

  const workflowListResponse = await ctx.cadence[requestApi](requestArgs);

  workflowListResponse.executions = injectDomainIntoWorkflowList(
    params.domain,
    workflowListResponse
  );

  ctx.body = workflowListResponse;
}

module.exports = listWorkflows;
