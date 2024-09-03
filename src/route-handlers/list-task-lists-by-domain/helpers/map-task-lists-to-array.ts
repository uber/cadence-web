import { type GetTaskListsByDomainResponse } from '@/__generated__/proto-ts/uber/cadence/api/v1/GetTaskListsByDomainResponse';

import { type TaskList } from '../list-task-lists-by-domain.types';

import getPollersForTaskList from './get-pollers-for-task-list';

export default function mapTaskListsToArray(
  response: GetTaskListsByDomainResponse
): Array<TaskList> {
  const taskListNames = Array.from(
    new Set([
      ...Object.keys(response.decisionTaskListMap),
      ...Object.keys(response.activityTaskListMap),
    ])
  );

  return taskListNames.map((taskListName) => ({
    name: taskListName,
    pollers: getPollersForTaskList({
      decisionTaskList: response.decisionTaskListMap[taskListName],
      activityTaskList: response.activityTaskListMap[taskListName],
    }),
  }));
}
