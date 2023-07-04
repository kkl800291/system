import Vue from 'vue'
import Vuex from 'vuex'
import { api_users_info } from "@/apis/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      account: "",
      ctime: "",
      id: 0,
      imgUrl: "",
      userGroup: "",
    },
    navList: [],
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = {
        ...state.userInfo,
        ...payload
      }
    },
    SET_NAV_LIST(state, payload) {
      state.navList = payload
    }
  },
  actions: {
    async getAcitonUserInfo({ commit }) {
      const res = await api_users_info();
      commit('SET_USER_INFO', res.data)
    }
  }
})
