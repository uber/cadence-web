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
import {
  WORKFLOW_LIST_ON_FILTER_CHANGE,
  WORKFLOW_LIST_ON_FILTER_MODE_CLICK,
} from './action-types';
import { WORKFLOW_LIST_FILTER_MODE } from './getter-types';
import { toggleFilterMode } from './helpers';

const actions = {
  [WORKFLOW_LIST_ON_FILTER_CHANGE]: ({ dispatch }, payload) =>
    dispatch(ROUTE_UPDATE_QUERY, payload),
  [WORKFLOW_LIST_ON_FILTER_MODE_CLICK]: ({ dispatch, getters }) =>
    dispatch(ROUTE_UPDATE_QUERY, {
      filterMode: toggleFilterMode(getters[WORKFLOW_LIST_FILTER_MODE]),
    }),
};

export default actions;
