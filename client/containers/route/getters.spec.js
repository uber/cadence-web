// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { ROUTE_PARAMS, ROUTE_PARAMS_DOMAIN, ROUTE_QUERY } from './getter-types';
import getterFns from './getters';
import { initGetters } from '~test';

describe('route getters', () => {
  describe('calling getters[ROUTE_PARAMS]', () => {
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
        const getters = initGetters({ getterFns, state });
        const output = getters[ROUTE_PARAMS];

        expect(output.paramA).toEqual('valueA');
        expect(output.paramB).toEqual('valueB');
      });
    });

    describe('and state.route.params is not defined', () => {
      const state = {
        route: {},
      };

      it('should return an empty object.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[ROUTE_PARAMS];

        expect(output).toEqual({});
      });
    });
  });

  describe('calling getters[ROUTE_PARAMS_DOMAIN]', () => {
    describe('and state.route.params.domain is defined', () => {
      const state = {
        route: {
          params: {
            domain: 'domainA',
          },
        },
      };

      it('should return the value from state.route.params.domain', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[ROUTE_PARAMS_DOMAIN];

        expect(output).toEqual('domainA');
      });
    });
  });

  describe('calling getters[ROUTE_QUERY]', () => {
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
        const getters = initGetters({ getterFns, state });
        const output = getters[ROUTE_QUERY];

        expect(output.queryA).toEqual('valueA');
        expect(output.queryB).toEqual('valueB');
      });
    });

    describe('and state.route.query is not defined', () => {
      const state = {
        route: {},
      };

      it('should return an empty object.', () => {
        const getters = initGetters({ getterFns, state });
        const output = getters[ROUTE_QUERY];

        expect(output).toEqual({});
      });
    });
  });
});
