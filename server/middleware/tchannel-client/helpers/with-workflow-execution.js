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

const get = require('lodash.get');

const withWorkflowExecution = ctx => body => {
  const { domain, runId, workflowId } = get(ctx, 'params', {});

  const execution = (workflowId || runId) && {
    workflowId,
    runId,
  };

  return Object.assign(
    {
      domain,
      execution,
    },
    body
  );
};

module.exports = withWorkflowExecution;
