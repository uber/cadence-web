import { ROUTE_QUERY } from '../route/getter-types';
import { FILTER_MODE_ADVANCED, FILTER_MODE_BASIC } from './constants';
import wfListGetterFns from './getters';
import { WORKFLOW_LIST_FILTER_MODE } from './getter-types';
import { initGetters } from '~test';

describe('workflow list getters', () => {
  describe('when calling getters[WORKFLOW_LIST_FILTER_MODE]', () => {
    describe('and getters[ROUTE_QUERY].filterMode is set', () => {
      const getterFns = {
        ...wfListGetterFns,
        [ROUTE_QUERY]: () => ({
          filterMode: FILTER_MODE_ADVANCED,
        }),
      };

      it('should return the value set.', () => {
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_LIST_FILTER_MODE];
        expect(output).toEqual(FILTER_MODE_ADVANCED);
      });
    });

    describe('and getters[ROUTE_QUERY].filterMode is not set', () => {
      const getterFns = {
        ...wfListGetterFns,
        [ROUTE_QUERY]: () => ({
          filterMode: null,
        }),
      };

      it('should return FILTER_MODE_BASIC.', () => {
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_LIST_FILTER_MODE];
        expect(output).toEqual(FILTER_MODE_BASIC);
      });
    });
  });
});
