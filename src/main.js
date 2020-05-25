// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 添加element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 添加全局样式
import './assets/css/style.css'
//导入axios
import axios from 'axios'
// 导入 ZTree
import ZKTree from 'vue-table-with-tree-grid'

//挂载axios
Vue.prototype.$http = axios

//设置访问root
axios.defaults.baseURL = "http://localhost:9090"

//添加 菜单api权限令牌
axios.interceptors.request.use(config => {
  console.log(config)
  //颁发令牌
  config.headers.Authorization = window.sessionStorage.getItem('token')

  //must
  return config
}) 

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(ZKTree);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
