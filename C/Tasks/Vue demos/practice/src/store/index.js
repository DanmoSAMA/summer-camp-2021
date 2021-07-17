import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const actions = {};

const mutations = {
  ADDSAN(state) {
    state.sanity++;
  },
  ADDPER(state) {
    state.perNum++;
  }
};

const state = {
  perNum: 0,
  sanity: 0
}

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})