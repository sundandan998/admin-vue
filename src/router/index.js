import Vue from 'vue'
import Router from 'vue-router'
// @ 是src路径的别名  永远指代src 是webpack配置的一个别名
// 好处就是 不管index.js移动到哪里 路径都不需要改变
import Login from '@/components/login/login'
import Home from '@/components/home/home'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home
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
    // 检查令牌状态
    const token = window.localStorage.getItem('admin-token')
    if (!token) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})
export default router
