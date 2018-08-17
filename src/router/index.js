import Vue from 'vue'
import Router from 'vue-router'
// @ 是src路径的别名  永远指代src 是webpack配置的一个别名
// 好处就是 不管index.js移动到哪里 路径都不需要改变
import Login from '@/components/login/login'
import Home from '@/components/home/home'
Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
})
