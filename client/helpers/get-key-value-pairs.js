import moment from 'moment';
import { jsonKeys, preKeys } from '../constants';
import getJsonStringObject from './get-json-string-object';

const getKeyValuePairs = event => {
  const kvps = [];
  const flatten = (prefix, obj, root) => {
    Object.entries(obj).forEach(([k, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      const key = prefix ? `${prefix}.${k}` : k;

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
            name: 'execution/summary',
            params: {
              runId: value,
            },
          },
          value,
        });
      } else if (key === 'parentWorkflowExecution.runId') {
        kvps.push({
          key,
          routeLink: {
            name: 'execution/summary',
            params: {
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
            name: 'execution/summary',
            params: {
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

  flatten('', event || {}, event);

  return kvps;
};

export default getKeyValuePairs;
