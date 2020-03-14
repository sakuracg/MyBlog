import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/reset.css'
import './assets/styles/globle.css'
import './assets/styles/fonticon/iconfont.css'
import './util/iconfont'
import Highlight from './util/highlight'


Vue.config.productionTip = false
Vue.use(Highlight)



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
