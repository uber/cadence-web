import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRouteId: null,
    newExecutionId: null,
    parentRouteId: null,
    childBtn: false,
    btnText: null,
    selectedNode: null,
    selectedNodeInfo: {},
    renderedNodes: []
  }
}
// initial state
const state = getDefaultState()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
  mutations: {
    childRoute(state, param) {
      state.childRouteId = param.routeId;
      state.childBtn = true;
      state.btnText = param.btnText;
    },
    newExecutionRoute(state, route) {
      state.newExecutionId = route,
        state.childBtn = !state.childBtn
    },
    toggleChildBtn(state) {
      state.childBtn = false
    },
    parentRoute(state, route) {
      state.parentRouteId = route
    },
    displayNodeInformation(state, info) {
      state.selectedNodeInfo = info
    },
    setSelectedNode(state, node) {
      state.selectedNode = node
    },
    setRenderedNodes(state, nodes) {
      state.renderedNodes = nodes
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {
    childRouteId: state => state.childRouteId,
    newExecutionId: state => state.newExecutionId,
    childBtn: state => state.childBtn,
    btnText: state => state.btnText,
    parentRoute: state => state.parentRouteId,
    selectedNodeInfo: state => state.selectedNodeInfo,
    selectedNode: state => state.selectedNode,
    renderedNodes: state => state.renderedNodes,
  }
})

export default store
