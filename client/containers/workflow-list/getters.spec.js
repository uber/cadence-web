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

import { ROUTE_QUERY } from '../route/getter-types';
import { FILTER_MODE_ADVANCED, FILTER_MODE_BASIC } from './constants';
import wfListGetterFns from './getters';
import {
  WORKFLOW_LIST_FILTER_MODE,
  WORKFLOW_LIST_QUERY_STRING,
  WORKFLOW_LIST_WORKFLOW_NAME,
} from './getter-types';
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

  describe('when calling getters[WORKFLOW_LIST_QUERY_STRING]', () => {
    describe('and getters[ROUTE_QUERY].queryString is set', () => {
      const getterFns = {
        ...wfListGetterFns,
        [ROUTE_QUERY]: () => ({
          queryString: 'WorkflowId = "1234"',
        }),
      };

      it('should return the value set.', () => {
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_LIST_QUERY_STRING];

        expect(output).toEqual('WorkflowId = "1234"');
      });
    });

    describe('and getters[ROUTE_QUERY].queryString is not set', () => {
      const getterFns = {
        ...wfListGetterFns,
        [ROUTE_QUERY]: () => ({
          queryString: null,
        }),
      };

      it('should return "".', () => {
        const getters = initGetters({ getterFns });
        const output = getters[WORKFLOW_LIST_QUERY_STRING];

        expect(output).toEqual('');
      });
    });
  });

  describe('when calling getters[WORKFLOW_LIST_WORKFLOW_NAME] and getters[ROUTE_QUERY].workflowName = "wf-name"', () => {
    const getterFns = {
      ...wfListGetterFns,
      [ROUTE_QUERY]: () => ({
        workflowName: 'wf-name',
      }),
    };

    it('should return "wf-name".', () => {
      const getters = initGetters({ getterFns });
      const output = getters[WORKFLOW_LIST_WORKFLOW_NAME];

      expect(output).toEqual('wf-name');
    });
  });
});
