import getDefaultState from './get-default-state';

const mutations = {
  childRoute(state, param) {
    state.graph.childRoute = param.route;
    state.graph.hasChildBtn = true;
    state.graph.childBtnText = param.btnText;
  },
  newExecutionRoute(state, route) {
    (state.graph.newExecutionId = route),
      (state.graph.hasChildBtn = !state.graph.hasChildBtn);
  },
  previousExecutionRoute(state, route) {
    (state.graph.parentRoute = route),
      (state.graph.parentBtnText = 'previous execution');
  },
  toggleChildBtn(state) {
    state.graph.hasChildBtn = false;
  },
  parentRoute(state, route) {
    state.graph.parentRoute = route;
  },
  resetGraphState(state) {
    Object.assign(state.graph, getDefaultState());
  },
};

export default mutations;
