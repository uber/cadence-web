const getters = {
  childRoute: state => state.graph.childRoute,
  newExecutionId: state => state.graph.newExecutionId,
  hasChildBtn: state => state.graph.hasChildBtn,
  childBtnText: state => state.graph.childBtnText,
  parentBtnText: state => state.graph.parentBtnText,
  parentRoute: state => state.graph.parentRoute,
};

export default getters;
