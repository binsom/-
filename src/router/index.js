import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import todo from '@/page/todo'
import Detail from '@/page/Detail'

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
    },
    {// 详情列表、流程意见、查看附件
      path: '/detail',
      name: 'Detail',
      meta: {
        requireAuth: true
      },
      component: Detail
    }
  ]
})
