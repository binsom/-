// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './store/index'
import { AlertPlugin } from 'vux'

axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

Vue.config.productionTip = false
Vue.use(AlertPlugin);
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    console.log(111);
    if (store.state.token.length > 0) {  // 通过store获取当前的token是否存在
      next();
    }else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
