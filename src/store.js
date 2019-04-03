import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fontFamily:[
      'Droid Sans',
      'Droid Serif',
      'Roboto',
      'Heebo',
      'Open Sans',
      'Lato',
      'Source Sans Pro',
      'Ubuntu',
      'Ubuntu Mono'
    ],
    prefixText:'Edit',
    suffixText:'Me'
  },
  mutations: {
    updatePrefix(state,value){
      state.prefixText = value;
    },
    updateSuffix(state,value){
      state.suffixText = value;
    }
  },
  actions: {
  }
})
