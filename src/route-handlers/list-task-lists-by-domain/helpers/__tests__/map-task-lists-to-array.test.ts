import { getTaskListsByDomainResponse } from '../../__fixtures__/get-task-lists-by-domain-response';
import { type Poller } from '../../list-task-lists-by-domain.types';
import mapTaskListsToArray from '../map-task-lists-to-array';

const GET_POLLERS_FOR_TASK_LIST_MOCK_RESPONSE = [
  {
    identity: 'poller1',
    ratePerSecond: 100000,
    decisionHandler: true,
    activityHandler: true,
    lastAccessTime: 1725371772799,
  },
  {
    identity: 'poller2',
    ratePerSecond: 100000,
    decisionHandler: true,
    activityHandler: true,
    lastAccessTime: 1725371772799,
  },
];

jest.mock('../get-pollers-for-task-list', () => ({
  __esModule: true,
  default: jest.fn(
    (): Array<Poller> => GET_POLLERS_FOR_TASK_LIST_MOCK_RESPONSE
  ),
}));

describe(mapTaskListsToArray.name, () => {
  it('should map task lists to array', () => {
    const res = mapTaskListsToArray(getTaskListsByDomainResponse);
    expect(res).toEqual([
      {
        name: 'tasklist-1',
        pollers: GET_POLLERS_FOR_TASK_LIST_MOCK_RESPONSE,
      },
      {
        name: 'tasklist-2',
        pollers: GET_POLLERS_FOR_TASK_LIST_MOCK_RESPONSE,
      },
    ]);
  });
});
