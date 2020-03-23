import moment from 'moment';

describe('Task List', () => {
  async function taskListTest(mochaTest, pollers) {
    const [testEl, scenario] = new Scenario(mochaTest)
      .withDomain('ci-test')
      .startingAt('/domains/ci-test/task-lists/ci_task_list')
      .withTaskListPollers('ci_task_list', pollers)
      .go();

    const taskListEl = await testEl.waitUntilExists('section.task-list');

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
          .format('ddd MMMM Do, h:mm:ss a')
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
