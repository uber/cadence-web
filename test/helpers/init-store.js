import Vuex from 'vuex';

const initStore = ({ actions = {}, getters = {}, mutations = {}, state = {} } = {}) => new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
});

export default initStore;
