import { type GetTaskListsByDomainResponse } from '@/__generated__/proto-ts/uber/cadence/api/v1/GetTaskListsByDomainResponse';

export const getTaskListsByDomainResponse: GetTaskListsByDomainResponse = {
  decisionTaskListMap: {
    'tasklist-1': {
      pollers: [
        {
          lastAccessTime: {
            seconds: 1725370637,
            nanos: 431444568,
          },
          identity: 'poller-1@mock-domain@tasklist-1',
          ratePerSecond: 100000,
        },
        {
          lastAccessTime: {
            seconds: 1725370636,
            nanos: 402492620,
          },
          identity: 'poller-2@mock-domain@tasklist-1',
          ratePerSecond: 100000,
        },
      ],
      taskListStatus: null,
    },
  },
  activityTaskListMap: {
    'tasklist-1': {
      pollers: [
        {
          lastAccessTime: {
            seconds: 1725370657,
            nanos: 336205308,
          },
          identity: 'poller-1@mock-domain@tasklist-1',
          ratePerSecond: 100000,
        },
        {
          lastAccessTime: {
            seconds: 1725370630,
            nanos: 347193652,
          },
          identity: 'poller-2@mock-domain@tasklist-1',
          ratePerSecond: 100000,
        },
      ],
      taskListStatus: null,
    },
    'tasklist-2': {
      pollers: [
        {
          lastAccessTime: {
            seconds: 1725370670,
            nanos: 336205308,
          },
          identity: 'poller-1@mock-domain@tasklist-2',
          ratePerSecond: 100000,
        },
        {
          lastAccessTime: {
            seconds: 1725370680,
            nanos: 347193652,
          },
          identity: 'poller-2@mock-domain@tasklist-2',
          ratePerSecond: 100000,
        },
      ],
      taskListStatus: null,
    },
  },
} as const;
