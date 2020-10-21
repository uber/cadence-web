import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRoute: null,
    newExecutionId: null,
    parentRouteId: null,
    childBtn: false,
    btnText: null,
  }
}
// initial state
const state = getDefaultState()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
  mutations: {
    childRoute(state, param) {
      state.childRoute = param.route;
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
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {
    childRoute: state => state.childRoute,
    newExecutionId: state => state.newExecutionId,
    childBtn: state => state.childBtn,
    btnText: state => state.btnText,
    parentRoute: state => state.parentRouteId
  }
})

export default store
