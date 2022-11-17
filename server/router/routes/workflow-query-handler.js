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

const workflowQueryHandler = async ctx => {
  // workaround implementation until https://github.com/uber/cadence/issues/382 is resolved
  try {
    await ctx.cadence.queryWorkflow({
      query: {
        queryType: '__cadence_web_list',
      },
    });

    ctx.throw(500);
  } catch (e) {
    ctx.body = ((e.message || '').match(
      /(KnownQueryTypes|knownTypes)=\[(.*)\]/
    ) || [null, null, ''])[2]
      .split(/, | /)
      .filter(q => q);
  }
};

module.exports = workflowQueryHandler;
