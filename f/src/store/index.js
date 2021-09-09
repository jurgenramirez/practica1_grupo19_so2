import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'

Vue.use(Vuex)

const state = {
  services,
  user: {},
},
mutations = {
  setUser(state, user_info) {//no esta en uso
    state.user = user_info.user
  },
},
actions = {
  setUser({ commit }, user) {//no esta en uso
    commit("setUser", user)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
