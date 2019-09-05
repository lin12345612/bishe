import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutation';
import * as actions from './action';
import state from './state'

Vue.use(Vuex)

const store  = new Vuex.Store({
  state,actions,mutations
}) 

export default store;
