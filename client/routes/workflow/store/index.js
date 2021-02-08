import * as mutations from './mutations';

const getDefaultState = () => ({
  workflowGraphEnabled: true,

  // TODO - Wire these up to history
  events: [],
  selectedEventId: null,
});

export {
  getDefaultState,
  mutations,
};
