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

import { ROUTE_UPDATE_QUERY } from '../route/action-types';
import actions from './actions';
import { WORKFLOW_LIST_ON_FILTER_CHANGE } from './action-types';
import { STATUS_CLOSED } from './constants';

describe('workflow list actions', () => {
  describe('when calling actions[WORKFLOW_LIST_ON_FILTER_CHANGE]', () => {
    it('should call dispatch with ROUTE_UPDATE_QUERY & payload', () => {
      const dispatch = jest.fn();
      const payload = {
        status: STATUS_CLOSED,
      };

      actions[WORKFLOW_LIST_ON_FILTER_CHANGE]({ dispatch }, payload);
      expect(dispatch).toHaveBeenCalledWith(ROUTE_UPDATE_QUERY, payload);
    });
  });
});
