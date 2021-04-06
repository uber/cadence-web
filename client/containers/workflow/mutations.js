import {
  WORKFLOW_CLEAR_EXECUTION,
  WORKFLOW_SET_EXECUTION,
} from './mutation-types';

const mutations = {
  [WORKFLOW_CLEAR_EXECUTION]: (state) => {
    state.workflow.execution = null;
  },
  [WORKFLOW_SET_EXECUTION]: (state, payload) => {
    state.workflow.execution = payload;
  },
};

export default mutations;
