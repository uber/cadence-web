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

describe('Task List Pollers', function() {
  it('should aggregate decision and activity pollers together by instance', function() {
    this.test.DescribeTaskList = ({ request }) => {
      request.domain.should.equal('canary');
      request.taskList.name.should.equal('demo-task-list');

      const response = {
        tchannel: {
          pollers:
            request.taskListType === 'Activity'
              ? [
                  {
                    identity: '100@node1@demo-task-list',
                    lastAccessTime: dateToLong('2018-03-22T20:21:40.000Z'),
                  },
                  {
                    identity: '102@node3@demo-task-list',
                    lastAccessTime: dateToLong('2018-03-22T20:21:32.000Z'),
                  },
                ]
              : [
                  {
                    identity: '100@node1@demo-task-list',
                    lastAccessTime: dateToLong('2018-03-22T20:20:40.000Z'),
                  },
                  {
                    identity: '101@node2@demo-task-list',
                    lastAccessTime: dateToLong('2018-03-22T20:22:05.000Z'),
                  },
                ],
        },
        grpc: {
          pollers:
            request.taskListType === 'TASK_LIST_TYPE_ACTIVITY'
              ? [
                  {
                    identity: '100@node1@demo-task-list',
                    lastAccessTime: dateToTimestamp('2018-03-22T20:21:40.000Z'),
                  },
                  {
                    identity: '102@node3@demo-task-list',
                    lastAccessTime: dateToTimestamp('2018-03-22T20:21:32.000Z'),
                  },
                ]
              : [
                  {
                    identity: '100@node1@demo-task-list',
                    lastAccessTime: dateToTimestamp('2018-03-22T20:20:40.000Z'),
                  },
                  {
                    identity: '101@node2@demo-task-list',
                    lastAccessTime: dateToTimestamp('2018-03-22T20:22:05.000Z'),
                  },
                ],
        },
      };

      return response[process.env.TRANSPORT_CLIENT_TYPE];
    };

    return request()
      .get('/api/domains/canary/task-lists/demo-task-list/pollers')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        '100@node1@demo-task-list': {
          lastAccessTime: '2018-03-22T20:21:40.000Z',
          taskListTypes: ['decision', 'activity'],
        },
        '101@node2@demo-task-list': {
          lastAccessTime: '2018-03-22T20:22:05.000Z',
          taskListTypes: ['decision'],
        },
        '102@node3@demo-task-list': {
          lastAccessTime: '2018-03-22T20:21:32.000Z',
          taskListTypes: ['activity'],
        },
      });
  });
});
