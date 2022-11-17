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

import moment from 'moment';
import getJsonStringObject from './get-json-string-object';
import { jsonKeys, preKeys } from '~constants';

const getKeyValuePairs = ({ clusterName, excludes = [], item }) => {
  const kvps = [];
  const flatten = (prefix, obj, root) => {
    Object.entries(obj).forEach(([k, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      const key = prefix ? `${prefix}.${k}` : k;

      if (excludes.includes(key)) {
        return;
      }

      if (value.routeLink) {
        kvps.push({
          key,
          routeLink: value.routeLink,
          value: value.text,
        });
      } else if (typeof value === 'object' && !jsonKeys.includes(key)) {
        flatten(key, value, root);
      } else if (key === 'newExecutionRunId') {
        kvps.push({
          key,
          routeLink: {
            name: 'workflow/summary',
            params: {
              clusterName,
              runId: value,
            },
          },
          value,
        });
      } else if (key === 'parentWorkflowExecution.runId') {
        kvps.push({
          key,
          routeLink: {
            name: 'workflow/summary',
            params: {
              clusterName,
              domain: root.parentWorkflowDomain,
              runId: value,
              workflowId: root.parentWorkflowExecution.workflowId,
            },
          },
          value,
        });
      } else if (key === 'workflowExecution.runId') {
        kvps.push({
          key,
          routeLink: {
            name: 'workflow/summary',
            params: {
              clusterName,
              domain: root.domain,
              runId: value,
              workflowId: root.workflowExecution.workflowId,
            },
          },
          value,
        });
      } else if (key === 'taskList.name' || key === 'Tasklist') {
        kvps.push({
          key,
          routeLink: {
            name: 'task-list',
            params: {
              clusterName,
              taskList: value,
            },
          },
          value,
        });
      } else if (/.+TimeoutSeconds/.test(key)) {
        kvps.push({
          key: key.replace(/Seconds$/, ''),
          value: moment.duration(value, 'seconds').format(),
        });
      } else if (preKeys.includes(k)) {
        kvps.push({
          key,
          value: getJsonStringObject(value),
        });
      } else {
        kvps.push({
          key,
          value,
        });
      }
    });
  };

  flatten('', item || {}, item);

  return kvps;
};

export default getKeyValuePairs;
