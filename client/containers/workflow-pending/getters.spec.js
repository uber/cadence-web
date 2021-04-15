import { initGetters } from '~test';
import {
  WORKFLOW_PENDING_ACTIVE_FILTER,
  WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE,
} from './getter-types';
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

  describe('when calling getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE]', () => {
    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns "all"', () => {
      it('should return "No pending tasks".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => 'all',
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];
        expect(output).toEqual('No pending tasks');
      });
    });

    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns "activities"', () => {
      it('should return "No pending activities".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => 'activities',
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];
        expect(output).toEqual('No pending activities');
      });
    });

    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns "children"', () => {
      it('should return "No pending child workflows".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => 'children',
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];
        expect(output).toEqual('No pending child workflows');
      });
    });

    describe('and getters[WORKFLOW_PENDING_ACTIVE_FILTER] returns undefined', () => {
      it('should return "No results".', () => {
        const getterFns = {
          ...workflowPendingGetterFns,
          [WORKFLOW_PENDING_ACTIVE_FILTER]: () => undefined,
        };
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE];
        expect(output).toEqual('No results');
      });
    });
  });
});
