import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
    keywords: '',   // 关键词
    refresh: false,
    haslogin: false,  // 是否登录
    user_start: 1,  // 默认pc端
}

export default new Vuex.Store({
    state
})
