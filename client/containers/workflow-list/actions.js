import { WORKFLOW_LIST_ON_STATUS_CHANGE } from './action-types';
import { ROUTE_UPDATE_QUERY } from '../route/action-types';

const actions = {
  [WORKFLOW_LIST_ON_STATUS_CHANGE]: ({ dispatch }, status) => {
    if (status) {
      dispatch(ROUTE_UPDATE_QUERY, { status: status.value });
    }
  }
};

export default actions;
