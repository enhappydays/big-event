import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/Login'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import Reg from '@/views/Reg'
import ArtCategory from '@/views/ArtCategory'
import ArtList from '@/views/ArtList'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/Login', component: Login },
    { path: '/Reg', component: Reg },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/', component: Home },
        { path: '/ArtCategory', component: ArtCategory },
        { path: '/ArtList', component: ArtList }
      ]
    }

  ]
})

// - 我们思考一个问题,如果一个用户未登录,进入到首页,能成功获取到用户的个人信息么?
// - 我们要求用户未登录,我们禁止用户访问首页
// - 可以使用  [路由前置导航守卫]  来进行页面拦截
// 路由前置导航守卫
// 白名单列表
const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // 先判断是否访问的是有权限的页面
  if (whiteList.includes(to.path)) {
    // 用户访问的是登录或者注册页面 不需要拦截 直接放行
    next()
  } else {
    // 进入else分支说明用户访问的是有权限的页面, 先判断是否有token
    // 如果有token直接放行
    if (token) {
      next()
    } else {
      // 没有token拦截到登录页面让用户重新登录
      next({ path: '/login' })
    }
  }
})

export default router
