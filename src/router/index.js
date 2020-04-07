import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/Home.vue'], resolve)
  },
  {
    path: '/Artical/:aid',
    name: 'Artical',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/Artical.vue'], resolve)
  },
  {
    path: '/ArticalType/:cateId',
    name: 'ArticalType',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/ArticalType.vue'], resolve)
  },
  {
    path: '/ArticalType/:cateId/:cateSecId',
    name: 'ArticalTypeSec',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/ArticalType.vue'], resolve)
  },
  {
    path: '/ArticalType',
    name: 'ArticalTypeKeyWords',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/ArticalType.vue'], resolve)
  },
  {
    path: '/Login/:type',
    name: 'Login',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/Login.vue'], resolve)
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/UserInfo.vue'], resolve)
  },
  {
    path: '/LikeCollect',
    name: 'LikeCollect',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/LikeCollect.vue'], resolve),
    children: [
      {
        path: '/LikeCollect/:type',
        name: 'Like',
        component: resolve => require(['../components/Like.vue'], resolve)
      },
      {
        path: '/LikeCollect/:type',
        name: 'Collect',
        component: resolve => require(['../components/Collect.vue'], resolve)
      }
    ]
  },
  {
    path: '/MessageBoard',
    name: 'MessageBoard',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/MessageBoard.vue'], resolve)
  },
  {
    path: '/Aboutme',
    name: 'AboutMe',
    meta: {
      auth: true,
      title: '沫雪没有夏'
    },
    component: resolve => require(['../pages/AboutMe.vue'], resolve)
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      var top
      if (window.innerWidth >= 700) {
        top = 670
      } else {
        top = 267
      }
      return {
        x: 0,
        y: top
      }
    }
  },
  mode: 'history'
})

router.beforeEach((to, form, next) => {
  document.title = to.meta.title ? to.meta.title : '沫雪没有夏'
  next()
})

router.afterEach((to, from) => {
  if (from.name === 'Login') {
    store.state.refresh = true
    // console.log(store.state.refresh)
  } else {
    store.state.refresh = false
  }
  // next(to)
})
export default router
