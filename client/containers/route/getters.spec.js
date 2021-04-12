import {
  ROUTE_PARAMS,
  ROUTE_QUERY,
} from './getter-types';
import getters from './getters';

describe('route getters', () => {
  describe('calling getters[ROUTE_PARAMS](state)', () => {
    describe('and state.route.params is defined', () => {
      const state = {
        route: {
          params: {
            paramA: 'valueA',
            paramB: 'valueB',
          },
        },
      };

      it('should return the value from state.route.params', () => {
        const output = getters[ROUTE_PARAMS](state);
        expect(output.paramA).toEqual('valueA');
        expect(output.paramB).toEqual('valueB');
      });
    });

    describe('and state.route.params is not defined', () => {
      const state = {
        route: {},
      };

      it('should return an empty object.', () => {
        const output = getters[ROUTE_PARAMS](state);
        expect(output).toEqual({});
      });
    });
  });

  describe('calling getters[ROUTE_QUERY](state)', () => {
    describe('and state.route.query is defined', () => {
      const state = {
        route: {
          query: {
            queryA: 'valueA',
            queryB: 'valueB',
          },
        },
      };

      it('should return the value from state.route.query', () => {
        const output = getters[ROUTE_QUERY](state);
        expect(output.queryA).toEqual('valueA');
        expect(output.queryB).toEqual('valueB');
      });
    });

    describe('and state.route.query is not defined', () => {
      const state = {
        route: {},
      };

      it('should return an empty object.', () => {
        const output = getters[ROUTE_QUERY](state);
        expect(output).toEqual({});
      });
    });
  });
});
