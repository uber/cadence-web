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
  PENDING_TASK_KVPS_EXCLUDE_KEYS,
  PENDING_TASK_TYPE_TO_ID_MAP,
  PENDING_TASK_TYPE_TO_DISPLAY_MAP,
} from '../constants';

import getWorkflowLink from './get-workflow-link';
import { getKeyValuePairs } from '~helpers';

const mapPendingTaskItem = ({ clusterName, domain }) => item => {
  const { pendingTaskType, runID } = item;

  const mappedItem = {
    ...item,
    pendingTaskId: `${pendingTaskType}_${
      item[PENDING_TASK_TYPE_TO_ID_MAP[pendingTaskType]]
    }`,
    pendingTaskTypeDisplay: PENDING_TASK_TYPE_TO_DISPLAY_MAP[pendingTaskType],
    ...(runID && {
      runID: getWorkflowLink({ ...item, clusterName, domain }) || runID,
    }),
  };

  return {
    ...mappedItem,
    kvps: getKeyValuePairs({
      clusterName,
      excludes: PENDING_TASK_KVPS_EXCLUDE_KEYS,
      item: mappedItem,
    }),
  };
};

const mapPendingTaskList = ({ clusterName, domain, pendingTaskList }) =>
  pendingTaskList.map(mapPendingTaskItem({ clusterName, domain }));

export default mapPendingTaskList;
