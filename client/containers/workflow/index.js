import Component from './component';
import Connector from './connector';
import getDefaultState from './get-default-state';
import getters from './getters';
import mutations from './mutations';

const container = Connector('Workflow', Component);

export {
  container,
  getDefaultState,
  getters,
  mutations,
};
