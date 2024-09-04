import { type TaskList } from '@/route-handlers/list-task-lists-by-domain/list-task-lists-by-domain.types';

export const mockDomainTaskLists: Array<TaskList> = [
  {
    name: 'tasklist-1',
    pollers: [
      {
        activityHandler: true,
        decisionHandler: true,
        identity: 'poller-1@mock-domain@tasklist-1',
        lastAccessTime: 1725370657336.2053,
        ratePerSecond: 100000,
      },
      {
        activityHandler: true,
        decisionHandler: true,
        identity: 'poller-2@mock-domain@tasklist-1',
        lastAccessTime: 1725370636402.4927,
        ratePerSecond: 100000,
      },
    ],
  },
  {
    name: 'tasklist-2',
    pollers: [
      {
        activityHandler: true,
        decisionHandler: false,
        identity: 'poller-1@mock-domain@tasklist-2',
        lastAccessTime: 1725370657336.2053,
        ratePerSecond: 100000,
      },
    ],
  },
];
