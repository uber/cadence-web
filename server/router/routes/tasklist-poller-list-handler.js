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

const tasklistPollerListHandler = async function(ctx) {
  const descTaskList = async taskListType =>
    (
      await ctx.cadence.describeTaskList({
        domain: ctx.params.domain,
        taskList: { name: ctx.params.taskList },
        taskListType,
      })
    ).pollers || [];

  const r = type => (o, poller) => {
    const i = o[poller.identity] || {};

    o[poller.identity] = {
      lastAccessTime:
        !i.lastAccessTime || i.lastAccessTime < poller.lastAccessTime
          ? poller.lastAccessTime
          : i.lastAccessTime,
      taskListTypes: i.taskListTypes ? i.taskListTypes.concat([type]) : [type],
    };

    return o;
  };

  const activityL = await descTaskList('Activity'),
    decisionL = await descTaskList('Decision');

  ctx.body = activityL.reduce(
    r('activity'),
    decisionL.reduce(r('decision'), {})
  );
};

module.exports = tasklistPollerListHandler;
