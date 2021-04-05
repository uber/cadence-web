import { get } from 'lodash-es';
import {
  WORKFLOW_EXECUTION,
  WORKFLOW_EXECUTION_TASK_LIST_NAME,
} from './getter-types';

const getters = {
  [WORKFLOW_EXECUTION]: ({ workflow }) => workflow.execution,
  [WORKFLOW_EXECUTION_TASK_LIST_NAME]: ({ workflow }) => get(workflow, 'execution.executionConfiguration.taskList.name'),
};

export default getters;
