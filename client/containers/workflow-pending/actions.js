import { ROUTE_REPLACE } from '../../store/route/action-types';
import { ROUTE_QUERY } from '../../store/route/getter-types';
import { WORKFLOW_PENDING_FILTER_CHANGED } from './action-types';

const actions = {
  [WORKFLOW_PENDING_FILTER_CHANGED]: ({ dispatch, getters }, filter) => {
    const query = getters[ROUTE_QUERY];
    dispatch(ROUTE_REPLACE, {
      query: { ...query, filter },
    });
  },
};

export default actions;
