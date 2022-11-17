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
import { ROUTE_PARAMS, ROUTE_QUERY } from './getter-types';
import getters from './getters';

const actionTypes = {
  ROUTE_PUSH,
  ROUTE_REPLACE,
  ROUTE_UPDATE_QUERY,
};

const getterTypes = {
  ROUTE_PARAMS,
  ROUTE_QUERY,
};

export { actionCreator, actionTypes, getterTypes, getters };
