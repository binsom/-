import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import todo from '@/page/todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: todo
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
