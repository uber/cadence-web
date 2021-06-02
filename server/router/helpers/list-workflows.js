// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const moment = require('moment');
const isAdvancedVisibilityEnabled = require('./is-advanced-visibility-enabled');
const momentToLong = require('./moment-to-long');

async function listWorkflows({ clusterHandler, state }, ctx) {
  const q = ctx.query || {},
    startTime = moment(q.startTime || NaN),
    endTime = moment(q.endTime || NaN);

  ctx.assert(startTime.isValid() && endTime.isValid(), 400);

  const cluster = await clusterHandler.getCluster(ctx);
  const advancedVisibility = isAdvancedVisibilityEnabled(cluster);

  const requestArgs = advancedVisibility
    ? {
        query: 'WorkflowID = "cron_1614b8d6-5282-4f09-be27-f151bfb96a76"',
      }
    : {
        StartTimeFilter: {
          earliestTime: momentToLong(startTime),
          latestTime: momentToLong(endTime),
        },
        typeFilter: q.workflowName ? { name: q.workflowName } : undefined,
        executionFilter: q.workflowId
          ? { workflowId: q.workflowId }
          : undefined,
        statusFilter: q.status || undefined,
        nextPageToken: q.nextPageToken
          ? Buffer.from(q.nextPageToken, 'base64')
          : undefined,
      };

  const requestApi = advancedVisibility ? 'listWorkflows' : state + 'Workflows';

  ctx.body = await ctx.cadence[requestApi](requestArgs);
}

module.exports = listWorkflows;
