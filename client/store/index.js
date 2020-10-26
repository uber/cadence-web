import Vue from 'vue'
import Vuex from 'vuex'

const getDefaultState = () => {
  return {
    childRoute: null,
    newExecutionId: null,
    parentRoute: null,
    hasChildBtn: false,
    hasChildBtnText: null,
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
      state.hasChildBtn = true;
      state.childBtnText = param.btnText;
    },
    newExecutionRoute(state, route) {
      state.newExecutionId = route,
        state.hasChildBtn = !state.hasChildBtn
    },
    toggleChildBtn(state) {
      state.hasChildBtn = false
    },
    parentRoute(state, route) {
      state.parentRoute = route
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {
    childRoute: state => state.childRoute,
    newExecutionId: state => state.newExecutionId,
    hasChildBtn: state => state.hasChildBtn,
    childBtnText: state => state.childBtnText,
    parentRoute: state => state.parentRoute
  }
})

export default store
