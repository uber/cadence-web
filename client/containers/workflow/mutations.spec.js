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

import {
  WORKFLOW_CLEAR_EXECUTION,
  WORKFLOW_SET_EXECUTION,
} from './mutation-types';
import mutations from './mutations';

const initState = (workflow = {}) => {
  return {
    workflow,
  };
};

describe('workflow mutations', () => {
  describe('when calling mutations[WORKFLOW_CLEAR_EXECUTION]', () => {
    describe('and state.workflow.execution is defined and state.workflow.isLoading is false', () => {
      let state;

      beforeEach(() => {
        state = initState({
          execution: {},
          isLoading: false,
        });
      });

      it('should set state.workflow.execution to null', () => {
        expect(state.workflow.execution).toEqual({});
        mutations[WORKFLOW_CLEAR_EXECUTION](state);
        expect(state.workflow.execution).toEqual(null);
      });

      it('should set state.workflow.isLoading to true', () => {
        expect(state.workflow.isLoading).toEqual(false);
        mutations[WORKFLOW_CLEAR_EXECUTION](state);
        expect(state.workflow.isLoading).toEqual(true);
      });
    });
  });

  describe('when calling mutations[WORKFLOW_SET_EXECUTION]', () => {
    describe('and state.workflow.execution is not defined and state.workflow.isLoading is true', () => {
      let state;

      beforeEach(() => {
        state = initState({
          execution: null,
          isLoading: true,
        });
      });

      it('should set state.workflow.execution to what is in the payload', () => {
        expect(state.workflow.execution).toEqual(null);
        mutations[WORKFLOW_SET_EXECUTION](state, { key: 'value' });
        expect(state.workflow.execution).toEqual({ key: 'value' });
      });

      it('should set state.workflow.isLoading to false', () => {
        expect(state.workflow.isLoading).toEqual(true);
        mutations[WORKFLOW_SET_EXECUTION](state, { key: 'value' });
        expect(state.workflow.isLoading).toEqual(false);
      });
    });
  });
});
