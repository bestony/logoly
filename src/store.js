import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prefixText:'edit',
    suffixText:'me'
  },
  mutations: {
      updatePrefix(state,text){
        state.prefix = text
      },
      updateSuffix(state,text){
        state.suffix = text
      }
  },
  actions: {

  }
})
