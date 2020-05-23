import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue' // 引入login组件
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue' // 子路由方式 存在 home中
import Users from '../components/user/users.vue'

Vue.use(Router)

// 挂载导航守卫
const router = new Router({
  routes: [
    {path: "/",redirect: '/login' },//..做一个重定向
    {path: "/login",component: Login},
    { path:'/home',
    component: Home , 
    redirect: '/welcome',
    children: [ 
      {path: '/welcome' , component: Welcome},
      {path: '/userList' , component: Users}
    ]}
  ]
})

//挂载导航守卫 ， 访问权限控制
router.beforeEach( (to , form , next) => {
    // to 去
    //form 来自
    //next 放行 带参数就是强制跳转

    //排除
    if( to.path === '/login') return next()

    //得到 token
    const tokenStorage = window.sessionStorage.getItem('token');
    // 判断token 存在？
    if( !tokenStorage) return next('/login');
    // 直接放行
    next()
})

export default router
