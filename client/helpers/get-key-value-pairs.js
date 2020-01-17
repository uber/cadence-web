import {
  jsonKeys,
  preKeys,
} from '../constants';
import moment from 'moment';
import getJsonStringObject from './get-json-string-object';

const getKeyValuePairs = event => {
  var kvps = []
  const flatten = (prefix, obj, root) => {
    Object.entries(obj).forEach(([k, value]) => {
      if (value == null) return
      var key = prefix ? `${prefix}.${k}` : k;

      if (value.routeLink) {
        kvps.push({ key, value: value.text, routeLink: value.routeLink })
      } else if (typeof value === 'object' && !jsonKeys.includes(key)) {
        flatten(key, value, root)
      } else if (key === 'newExecutionRunId') {
        kvps.push({
          key, value, routeLink: {
            name: 'execution/summary', params: { runId: value }
          }
        })
      } else if (key === 'parentWorkflowExecution.runId') {
        kvps.push({
          key, value, routeLink: {
            name: 'execution/summary',
            params: {
              domain: root.parentWorkflowDomain,
              workflowId: root.parentWorkflowExecution.workflowId,
              runId: value,
            }
          }
        })
      } else if (key === 'workflowExecution.runId') {
        kvps.push({
          key, value, routeLink: {
            name: 'execution/summary',
            params: {
              domain: root.domain,
              workflowId: root.workflowExecution.workflowId,
              runId: value,
            }
          }
        })
      } else if (key === 'taskList.name' || key === 'Tasklist') {
        kvps.push({
          key, value, routeLink: {
            name: 'task-list', params: { taskList: value }
          }
        })
      } else if (/.+TimeoutSeconds/.test(key)) {
        kvps.push({ key: key.replace(/Seconds$/, ''), value: moment.duration(value, 'seconds').format() })
      } else if (preKeys.includes(k)) {
        kvps.push({
          key,
          value: getJsonStringObject(value)
        });
      } else {
        kvps.push({ key, value });
      }
    })
  }

  flatten('', event || {}, event)
  return kvps
};

export default getKeyValuePairs;
