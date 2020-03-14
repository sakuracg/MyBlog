import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/Home.vue'], resolve)
    },
    {
        path: '/Artical/:aid',
        name: 'Artical',
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/Artical.vue'], resolve)
    },
    {
        path: '/ArticalType/:cateId',
        name: 'ArticalType',
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/ArticalType.vue'], resolve)
    },
    {
        path: '/ArticalType/:cateId/:cateSecId',
        name: 'ArticalTypeSec',
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/ArticalType.vue'], resolve)
    },
    {
        path: '/ArticalType',
        name: 'ArticalTypeKeyWords',
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/ArticalType.vue'], resolve)
    },
    {
        path: '/Login/:type',
        name: 'Login',
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
        path: '/UserInfo',
        name: 'UserInfo',
        component: resolve => require(['../pages/UserInfo.vue'], resolve)
    },
    {
        path: '/LikeCollect',
        name: 'LikeCollect',
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
        component: resolve => require(['../pages/MessageBoard.vue'], resolve)
    },
    {
        path: '/Aboutme',
        name: 'AboutMe',
        component: resolve => require(['../pages/AboutMe.vue'], resolve)
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            var top;
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
