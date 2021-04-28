import { WORKFLOW_LIST_ON_FILTER_CHANGE } from './action-types';
import { ROUTE_UPDATE_QUERY } from '../route/action-types';

const actions = {
  [WORKFLOW_LIST_ON_FILTER_CHANGE]: ({ dispatch }, payload) => {
    dispatch(ROUTE_UPDATE_QUERY, payload);
  },
};

export default actions;
