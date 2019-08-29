import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teamArr  : []
  },
  mutations: {
    changeTeam(state,arr){
      state.teamArr = arr; 
    }
  },
  actions: {

  }
})
