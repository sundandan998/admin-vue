import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from '@/assets/js/auth'
// @ 是src路径的别名  永远指代src 是webpack配置的一个别名
// 好处就是 不管index.js移动到哪里 路径都不需要改变
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import UserList from '@/components/user-list/user-list'
import RoleList from '@/components/role-list/role-list'
import RightsList from '@/components/rights-list/rights'
Vue.use(Router)
const router = new Router({
  routes: [
    // 登录组件
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    // 用户管理组件
    {
      // home组件会渲染到 跟组件 app.vue中
      name: 'home',
      path: '/',
      component: Home,
      // 我们可以通过配置子路由的方式让某个组件渲染到父路由中
      // 第一：需要在父路由中添加<router-viwe></router-viwe>
      // 第二:在路由中通过children来声明路由
      // children是一个数组，数组中是对象
      // 当你访问user-list组建的时候，则路由会先渲染他的父路由组件，然后将user-list组件
      // 渲染到父路由的router-view中
      // 角色管理组件
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        // 权限管理组件
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        },
        // 权限管理组件
        {
          name: 'rights-list',
          path: '/rights',
          component: RightsList
        }
      ]
    }
  ]
})
// 添加路由拦截器（守卫、导航钩子）
// 接下来所有的视图都必须经过这道关卡，进入以后需要告诉守卫
// to  去哪里
// from 从哪里来
// next()放行
router.beforeEach((to, from, next) => {
  // 拿到当前请求的视图路径标识
  // 如果是登录组件就让过去
  // 如果是非登录组件 就检查是否有token 如果有就让其过去  否则直接返回登录
  if (to.name === 'login') {
    next()
  } else {
    // 检查有无令牌
    if (!getUserInfo()) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})
export default router
