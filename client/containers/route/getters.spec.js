// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { ROUTE_PARAMS, ROUTE_QUERY } from './getter-types';
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
