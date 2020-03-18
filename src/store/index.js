import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
    keywords: '',   // 关键词
    refresh: false,
    haslogin: false,  // 是否登录
    user_start: 1,  // 默认pc端
    dynamicBg: '0',   // 默认关闭背景
    dyWaterVal: 0,   // 水球上升的
}

export default new Vuex.Store({
    state
})
