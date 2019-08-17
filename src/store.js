import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prefixText: 'edit',
    postfixText: 'me',
  },
  mutations: {
    updatePrefix(state, text) {
      state.prefix = text
    },
    updatePostfix(state, text) {
      state.postfix = text
    },
  },
  actions: {},
})
