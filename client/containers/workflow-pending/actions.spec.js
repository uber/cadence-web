import { ROUTE_UPDATE_QUERY } from '../route/action-types';
import actions from './actions';
import { WORKFLOW_PENDING_FILTER_CHANGED } from './action-types';

describe('workflow pending actions', () => {
  describe('when actions[WORKFLOW_PENDING_FILTER_CHANGED] is called', () => {
    it('should dispatch ROUTE_UPDATE_QUERY with the filter that is changed.', () => {
      const dispatch = jest.fn();
      const filter = 'activity';
      actions[WORKFLOW_PENDING_FILTER_CHANGED]({ dispatch }, filter);
      expect(dispatch).toHaveBeenCalledWith(ROUTE_UPDATE_QUERY, { filter: 'activity' });
    });
  });
});
