<template>
  <div>
    <x-header :left-options="{showBack: false}">
      {{pageTitle}}
      <a slot="right" @click="goLogin()">{{userName}}</a>
    </x-header>
  </div>
</template>

<script>
  import { XHeader} from "vux";
  export default{
    components: {
      XHeader
    },
    data() {
      return {
        pageTitle:"",
        userName: "",
        baseUrl: this.$store.state.url,
        tabList:[]
      };
    },
    mounted() {
      this.$store.commit("refresh");
      this.userName =this.$store.state.userInfo.name;
//      this.$vux.loading.show({text: "加载中"});
      this.axios({
        url: this.baseUrl + "/oa_api/act_task/todoList", //个人待办的业务数据列表
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
            console.log(response,'----todo555');
          this.tabList = response.data.data;
//          this.$vux.loading.hide();
        })
        .catch(response => {
//          this.$vux.loading.hide();
        });
    },
    methods: {
      goLogin() {
        this.$router.push({ name: "Login" });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vux-header {
    z-index: 9;
    position: fixed !important;
    top: 0;
    width: 100%;
  }
</style>
