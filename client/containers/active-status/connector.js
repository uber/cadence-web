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
import { DOMAIN_IS_READY } from '../domain/getter-types';
import { CROSS_REGION } from '../cross-region/getter-types';
import {
  ACTIVE_STATUS_CLUSTER,
  ACTIVE_STATUS_SELECT_LIST,
  ACTIVE_STATUS_CLASSNAME,
  ACTIVE_STATUS_LABEL,
  ACTIVE_STATUS_TAG,
} from './getter-types';
import { ACTIVE_STATUS_ON_CHANGE } from './action-types';

const actionsToEvents = {
  change: ACTIVE_STATUS_ON_CHANGE,
};

const gettersToProps = {
  classname: ACTIVE_STATUS_CLASSNAME,
  cluster: ACTIVE_STATUS_CLUSTER,
  crossRegion: CROSS_REGION,
  selectList: ACTIVE_STATUS_SELECT_LIST,
  isReady: DOMAIN_IS_READY,
  label: ACTIVE_STATUS_LABEL,
  tag: ACTIVE_STATUS_TAG,
};

export default connect({
  actionsToEvents,
  gettersToProps,
});
