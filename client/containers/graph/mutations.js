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

import getDefaultState from './get-default-state';

const mutations = {
  childRoute(state, param) {
    state.graph.childRoute = param.route;
    state.graph.hasChildBtn = true;
    state.graph.childBtnText = param.btnText;
  },
  newExecutionRoute(state, route) {
    (state.graph.newExecutionId = route),
      (state.graph.hasChildBtn = !state.graph.hasChildBtn);
  },
  previousExecutionRoute(state, route) {
    (state.graph.parentRoute = route),
      (state.graph.parentBtnText = 'previous execution');
  },
  toggleChildBtn(state) {
    state.graph.hasChildBtn = false;
  },
  parentRoute(state, route) {
    state.graph.parentRoute = route;
  },
  resetGraphState(state) {
    Object.assign(state.graph, getDefaultState());
  },
};

export default mutations;
