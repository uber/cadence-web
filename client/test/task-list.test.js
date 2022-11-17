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

import moment from 'moment';

describe('Task List', () => {
  async function taskListTest(mochaTest, pollers) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domains/ci-test/task-lists/ci_task_list')
      .withFeatureFlags()
      .withEmptyNewsFeed()
      .withTaskListPollers('ci_task_list', pollers)
      .go();

    const taskListEl = await testEl.waitUntilExists(
      'section.task-list-pollers'
    );

    return [taskListEl, scenario];
  }

  it('should show a table of the pollers of the task list', async function test() {
    const [taskListEl] = await taskListTest(this.test);

    await Promise.delay(1);

    taskListEl.querySelectorAll('table tbody tr').should.have.length(3);
    taskListEl
      .textNodes('tbody tr td:first-child')
      .should.deep.equal(['node1', 'node2', 'node3']);
    taskListEl.textNodes('tbody tr td:nth-child(2)').should.deep.equal(
      [5, 3, 4].map(m =>
        moment()
          .startOf('hour')
          .add(m, 'minutes')
          .format('MMM D, YYYY h:mm:ss A')
      )
    );
    taskListEl
      .attrValues('tbody td:nth-child(3)', 'data-handled')
      .should.deep.equal(['true', 'true', null]);
    taskListEl
      .attrValues('tbody td:nth-child(4)', 'data-handled')
      .should.deep.equal(['true', null, 'true']);
  });
});
