import axios from 'axios'

// export default axios.create({
//   baseURL: 'http://localhost:8888/api/private/v1/'
// })
// 1.定义一个插件对象
const httpPlugin = {}
// 2.为插件添加一个成员 install install是一个函数 有两个参数Vue, options
httpPlugin.install = function (Vue, options) {
  // 3. 添加实例方法
  Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
}
// 4.导出插件对象
export default httpPlugin
// 5.在main.js中加载使插件生效
// Vue.use(httpPlugin)
