import { initGetters } from '~test';
import { WORKFLOW_PENDING_ACTIVE_FILTER } from './getter-types';
import workflowPendingGetterFns from './getters';
import { ROUTE_QUERY } from '../route/getter-types';

describe('workflow pending getters', () => {
  describe('when calling getters[WORKFLOW_PENDING_ACTIVE_FILTER]', () => {
    describe('and getters[ROUTE_QUERY] returns empty object', () => {
      it('should return "all".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [ROUTE_QUERY]: () => ({}),
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER];
        expect(output).toEqual('all');
      });
    });

    describe('and getters[ROUTE_QUERY] returns { filter: "activity" }', () => {
      it('should return "activity".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [ROUTE_QUERY]: () => ({ filter: 'activity' }),
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER];
        expect(output).toEqual('activity');
      });
    });
  });
});
