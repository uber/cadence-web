import { get } from 'lodash-es';
import {
  WORKFLOW_EXECUTION,
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_TASKS,
  WORKFLOW_EXECUTION_TASK_LIST_NAME,
} from './getter-types';

const getters = {
  [WORKFLOW_EXECUTION]: ({ workflow }) => workflow.execution,
  [WORKFLOW_EXECUTION_TASK_LIST_NAME]: ({ workflow }) => get(workflow, 'execution.executionConfiguration.taskList.name'),
  [WORKFLOW_EXECUTION_PENDING_ACTIVITIES]: ({ workflow }) => get(workflow, 'execution.pendingActivities') || [],
  [WORKFLOW_EXECUTION_PENDING_CHILDREN]: ({ workflow }) => get(workflow, 'execution.pendingChildren') || [],
  [WORKFLOW_EXECUTION_PENDING_TASKS]: (_, getters) => ([
    ...getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES],
    ...getters[WORKFLOW_EXECUTION_PENDING_CHILDREN],
  ]),
};

export default getters;
