import { getKeyValuePairs } from '~helpers';
import { ROUTE_QUERY } from '../../store/route/getter-types';
import {
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_TASKS,
} from '../workflow/getter-types';
import {
  WORKFLOW_PENDING_ACTIVE_FILTER,
  WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST,
} from './getter-types';

const mapFilterToGetterType = filter => {
  switch (filter) {
    case 'activities':
      return WORKFLOW_EXECUTION_PENDING_ACTIVITIES;
    case 'children':
      return WORKFLOW_EXECUTION_PENDING_CHILDREN;
    default:
      return WORKFLOW_EXECUTION_PENDING_TASKS;
  };
};

const mapWithKvps = item => {
  const kvps = getKeyValuePairs({ item });
  return {
    ...item,
    kvps,
  }
};

const getters = {
  [WORKFLOW_PENDING_ACTIVE_FILTER]: (_, getters) => getters[ROUTE_QUERY].filter || 'all',
  [WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST]: (_, getters) => {
    const filter = getters[WORKFLOW_PENDING_ACTIVE_FILTER];
    const getterType = mapFilterToGetterType(filter);
    const pendingTaskList = getters[getterType];
    const mappedPendingTaskList = pendingTaskList.map(mapWithKvps);
    return mappedPendingTaskList;
  },
};

export default getters;
