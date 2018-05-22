import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',      //访问路径不带井号
    linkActiveClass: "active",
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['@/view/index.vue'], resolve)   //使用懒加载
        },
        {
            path: '/index',
            name: 'index',
            component: resolve => require(['@/view/index.vue'], resolve),   //使用懒加载
            children:[
                {
                    path: 'goodList',
                    name: 'goodsList',
                    component: resolve => require(['@/view/goodList/goodList.vue'], resolve),
                },
                {
                    path: 'createGood',
                    name: 'createGood',
                    component: resolve => require(['@/view/createGood/createGood.vue'], resolve),
                },
                {
                    path: 'classifyList',
                    name: 'classifyList',
                    component: resolve => require(['@/view/classifyList/classifyList.vue'], resolve),
                },
                {
                    path: 'createClassify',
                    name: 'createClassify',
                    component: resolve => require(['@/view/createClassify/createClassify.vue'], resolve),
                },
                {
                    path: 'orderList',
                    name: 'orderList',
                    component: resolve => require(['@/view/orderList/orderList.vue'], resolve),
                }
            ]
        },
        /*{
            path: '/goodList',
            name: 'goodsList',
            component: resolve => require(['@/view/goodList/goodList.vue'], resolve),
        },
        {
            path: '/userList',
            name: 'userList',
            component: resolve => require(['@/view/userList/userList.vue'], resolve),
        }*/
    ]
})
