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

import actionCreator from './action-creator';
import { ROUTE_PUSH, ROUTE_REPLACE, ROUTE_UPDATE_QUERY } from './action-types';
import { ROUTE_QUERY } from './getter-types';

const getRouterMock = () => ({
  push: jest.fn(),
  replace: jest.fn(),
});

describe('route action creator', () => {
  describe('when calling actions[ROUTE_PUSH] with "/test"', () => {
    it('should call router.push with "/test".', () => {
      const router = getRouterMock();
      const actions = actionCreator(router);

      actions[ROUTE_PUSH](null, '/test');
      expect(router.push).toHaveBeenCalledWith('/test');
    });
  });

  describe('when calling actions[ROUTE_REPLACE] with "/test"', () => {
    it('should call router.replace with "/test".', () => {
      const router = getRouterMock();
      const actions = actionCreator(router);

      actions[ROUTE_REPLACE](null, '/test');
      expect(router.replace).toHaveBeenCalledWith('/test');
    });
  });

  describe('when calling actions[ROUTE_UPDATE_QUERY] with a getter and test object', () => {
    it('should call router.replace with the original getter query with the test object override.', () => {
      const router = getRouterMock();
      const getters = {
        [ROUTE_QUERY]: {
          otherQuery: 'otherValue',
          test: 'valueA',
        },
      };
      const actions = actionCreator(router);

      actions[ROUTE_UPDATE_QUERY]({ getters }, { test: 'valueB' });
      expect(router.replace).toHaveBeenCalledWith({
        query: {
          otherQuery: 'otherValue',
          test: 'valueB',
        },
      });
    });
  });
});
