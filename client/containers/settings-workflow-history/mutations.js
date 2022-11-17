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
  SETTINGS_WORKFLOW_HISTORY_ON_CHANGE_VALUE,
  SETTINGS_WORKFLOW_HISTORY_ON_MOUNTED,
  SETTINGS_WORKFLOW_HISTORY_ON_SUBMIT,
} from './mutation-types';

const mutations = {
  [SETTINGS_WORKFLOW_HISTORY_ON_CHANGE_VALUE]: (state, { name, value }) => {
    state.settingsWorkflowHistory = {
      ...state.settingsWorkflowHistory,
      [name]: value,
    };
  },
  [SETTINGS_WORKFLOW_HISTORY_ON_MOUNTED]: state => {
    state.settingsWorkflowHistory = {
      ...state.settingsWorkflowHistory,
      graphEnabled: state.workflowHistory.graphEnabled,
    };
  },
  [SETTINGS_WORKFLOW_HISTORY_ON_SUBMIT]: state => {
    state.workflowHistory = {
      ...state.workflowHistory,
      ...state.settingsWorkflowHistory,
    };
  },
};

export default mutations;
