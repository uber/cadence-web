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

import { connect } from 'vuex-connect';
import { SETTINGS_WORKFLOW_HISTORY_IS_SUBMIT_ENABLED } from './getter-types';
import {
  SETTINGS_WORKFLOW_HISTORY_ON_CHANGE_VALUE,
  SETTINGS_WORKFLOW_HISTORY_ON_MOUNTED,
  SETTINGS_WORKFLOW_HISTORY_ON_SUBMIT,
} from './mutation-types';

const gettersToProps = {
  isSubmitEnabled: SETTINGS_WORKFLOW_HISTORY_IS_SUBMIT_ENABLED,
};

const lifecycle = {
  mounted: ({ commit }) => commit(SETTINGS_WORKFLOW_HISTORY_ON_MOUNTED),
};

const stateToProps = {
  graphEnabled: state => state.settingsWorkflowHistory.graphEnabled,
};

const mutationsToEvents = {
  onChange: SETTINGS_WORKFLOW_HISTORY_ON_CHANGE_VALUE,
  onSubmit: SETTINGS_WORKFLOW_HISTORY_ON_SUBMIT,
};

export default connect({
  gettersToProps,
  lifecycle,
  mutationsToEvents,
  stateToProps,
});
