describe('Task List Pollers', function() {
  it('should aggregate decision and activity pollers together by instance', function() {
    this.test.DescribeTaskList = ({ request }) => {
      request.domain.should.equal('canary')
      request.taskList.name.should.equal('demo-task-list')

      return {
        pollers: request.taskListType === 'Activity' ? [{
          identity: '100@node1@demo-task-list',
          lastAccessTime: dateToLong('2018-03-22T20:21:40.000Z')
        }, {
          identity: '102@node3@demo-task-list',
          lastAccessTime: dateToLong('2018-03-22T20:21:32.000Z')
        }] : [{
          identity: '100@node1@demo-task-list',
          lastAccessTime: dateToLong('2018-03-22T20:20:40.000Z')
        }, {
          identity: '101@node2@demo-task-list',
          lastAccessTime: dateToLong('2018-03-22T20:22:05.000Z')
        }]
      }
    }

    return request()
      .get('/api/domains/canary/task-lists/demo-task-list/pollers')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        '100@node1@demo-task-list': {
          lastAccessTime: '2018-03-22T20:21:40.000Z',
          taskListTypes: ['decision', 'activity']
        },
        '101@node2@demo-task-list': {
          lastAccessTime: '2018-03-22T20:22:05.000Z',
          taskListTypes: ['decision']
        },
        '102@node3@demo-task-list': {
          lastAccessTime: '2018-03-22T20:21:32.000Z',
          taskListTypes: ['activity']
        },
      })
  })
})