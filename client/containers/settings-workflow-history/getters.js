import {
  SUBMIT_CHANGE_KEYS
} from './constants';
import {
  SETTINGS_WORKFLOW_HISTORY_IS_SUBMIT_ENABLED,
} from './getterTypes';

const getters = {
  [SETTINGS_WORKFLOW_HISTORY_IS_SUBMIT_ENABLED]: ({ settingsWorkflowHistory, workflowHistory }) => SUBMIT_CHANGE_KEYS.reduce((accumulator, key) => accumulator || settingsWorkflowHistory[key] !== workflowHistory[key], false),
};

export default getters;
