import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/reset.css'
import './assets/styles/globle.css'
import './assets/styles/fonticon/iconfont.css'
import './assets/styles/subject.less'
import './util/iconfont'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: 'dist/loading.gif',
  error: 'dist/404.jpg' // 加载失败图片
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
