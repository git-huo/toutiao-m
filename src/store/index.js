import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //tokenObj: JSON.parse(localStorage.getItem("HEIMA_TOUTIAO_TOKEN",)) || {}
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, value) {
      //存入vuex仓库中
      state.tokenObj = value
      //存入本地仓库中
      //本地操作是JSON格式字符串
      // localStorage.setItem("HEIMA_TOUTIAO_TOKEN", JSON.stringify(value))
      setToken(value)
    }
  },
  actions: {},
  modules: {}
})
