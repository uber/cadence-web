import { ROUTE_UPDATE_QUERY } from '../route/action-types';
import { WORKFLOW_LIST_ON_FILTER_CHANGE, WORKFLOW_LIST_ON_FILTER_MODE_CLICK } from './action-types';
import { WORKFLOW_LIST_FILTER_MODE } from './getter-types';

const actions = {
  [WORKFLOW_LIST_ON_FILTER_CHANGE]: ({ dispatch }, payload) => dispatch(ROUTE_UPDATE_QUERY, payload),
  [WORKFLOW_LIST_ON_FILTER_MODE_CLICK]: ({ dispatch, getters }) => {
    const filterMode = getters[WORKFLOW_LIST_FILTER_MODE] === 'advanced' ? 'basic' : 'advanced';
    dispatch(ROUTE_UPDATE_QUERY, { filterMode });
  },
};

export default actions;
