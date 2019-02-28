import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // url:'http://121.8.235.162:9009/sgjbid',//测试环境
    // url:'http://192.168.0.214:33333',//开发者环境
    url:'https://jy.gzebid.cn/bid/',//生产环境
    token: '',
    userInfo: {},
    isLogin: false,
    todoTabType: ''// 待办详情页回退时，待办页tab切换到之前状态
  },
  mutations: {
    login (state, payload) {
      axios({
        url: state.url+'/appLogin',
        method: 'post',
        transformRequest: [
          function (data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret;
          }
        ],
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
          username: payload.username,
          password: payload.password
        }
      }).then((response) => {
        console.log(response,'---------response');
        if(response.data){
          if(response.data.success === true){
            state.isLogin = true;
            state.userInfo.name = response.data.data.name;
            state.userInfo.sessionId=response.data.data.sessionId;
            state.token = response.data.data.sessionId;
            //登录时获取的信息存起来
            let userInfo={
              'token':state.token,
              'isLogin':state.isLogin,
              'name':state.userInfo.name
            }
            console.log(userInfo,'---------userInfo');
            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            router.push({ name: "todo" });
          }else if(response.data.success === false){
            state.isLogin = false;
          }
        }
        Vue.$vux.alert.show({
          title: response.data.message
        });
        setTimeout(() => {
          Vue.$vux.alert.hide();
        }, 2000);
      }).catch((response) => {
        console.log(response);
      });

    },
    // 退出
    logout (state) {
      axios({
        url: state.url+'/appLogout',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        state.isLogin = false;
        state.userInfo = {};
        state.token = '';
        //退出时置空
        localStorage.setItem('userInfo','');
        Vue.$vux.alert.show({title: response.data.message});
        setTimeout(() => {
          Vue.$vux.alert.hide();
          window.location.reload();
        }, 1000);
      }).catch((response) => {
        console.log(response);
      });
    },
    //界面刷新后赋值
    refresh(state){
      //获取本地存储的登录信息
      let userInfo=localStorage.getItem('userInfo');
      if(userInfo){
        userInfo=JSON.parse(userInfo);
        state.isLogin = userInfo.isLogin;
        state.userInfo.name = userInfo.name;
        state.token =  userInfo.token;
      }
    }
  }
});
export default store;

// http response 服务器响应拦截器，这里拦截登录过期，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    if(response.data.message=='no_login'){
      console.log('111');
      //退出时置空
      localStorage.setItem('userInfo','');
      store.state.isLogin = false;
      store.state.userInfo = {};
      store.state.token = '';
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
//http request 请求前拦截
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

