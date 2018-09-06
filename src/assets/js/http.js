import axios from 'axios'
import {getToken} from './auth'
// export default axios.create({
//   baseURL: `http://localhost:8888/api/private/v1/`
// })
const httpPlugin = {}
const http = axios.create({
  baseURL: `http://localhost:8888/api/private/v1/`
})
http.interceptors.request.use(function (config) {
  if (config.url !== 'login') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
httpPlugin.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$http = http
}
// 导出插件对象
export default httpPlugin
// 在入口文件 man.js中 加载使插件生效
// Vue.use(httpPlugin)
