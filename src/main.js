// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import httpPlugin from '@/assets/js/http'
// 引入我们的公共样式
import './assets/css/style.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 给vue添加原型成员时 最好给成员名加$前缀
/* eslint-disable no-new */
// 加载httpPlugin插件 （封装自己axios)
// 使用插件
Vue.use(httpPlugin)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
