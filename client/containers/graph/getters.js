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

import { get } from 'lodash-es';

const getters = {
  childRoute: state => get(state, 'graph.childRoute'),
  newExecutionId: state => get(state, 'graph.newExecutionId'),
  hasChildBtn: state => get(state, 'graph.hasChildBtn'),
  childBtnText: state => get(state, 'graph.childBtnText'),
  parentBtnText: state => get(state, 'graph.parentBtnText'),
  parentRoute: state => get(state, 'graph.parentRoute'),
};

export default getters;
