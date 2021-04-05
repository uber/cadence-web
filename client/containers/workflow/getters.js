import { get } from 'lodash-es';
import {
  WORKFLOW_EXECUTION,
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_TASK_COUNT,
  WORKFLOW_EXECUTION_PENDING_TASKS,
  WORKFLOW_EXECUTION_TASK_LIST_NAME,
} from './getter-types';
import { mapPendingTaskList } from './helpers';

const getters = {
  [WORKFLOW_EXECUTION]: ({ workflow }) => workflow.execution,
  [WORKFLOW_EXECUTION_TASK_LIST_NAME]: ({ workflow }) => get(workflow, 'execution.executionConfiguration.taskList.name'),
  [WORKFLOW_EXECUTION_PENDING_ACTIVITIES]: ({ workflow }) => mapPendingTaskList({
    pendingTaskType: 'activity',
    pendingTaskList: get(workflow, 'execution.pendingActivities') || []
  }),
  [WORKFLOW_EXECUTION_PENDING_CHILDREN]: ({ workflow }) => mapPendingTaskList({
    pendingTaskType: 'childWorkflow',
    pendingTaskList: get(workflow, 'execution.pendingChildren') || []
  }),
  [WORKFLOW_EXECUTION_PENDING_TASK_COUNT]: (_, getters) => getters[WORKFLOW_EXECUTION_PENDING_TASKS].length,
  [WORKFLOW_EXECUTION_PENDING_TASKS]: (_, getters) => ([
    ...getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES],
    ...getters[WORKFLOW_EXECUTION_PENDING_CHILDREN],
  ]),
};

export default getters;
