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

//挂载axios
Vue.prototype.$http = axios

//设置访问root
axios.defaults.baseURL = "http://localhost:9090"

Vue.config.productionTip = false

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
