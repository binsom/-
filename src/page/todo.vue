<template>
  <div>
    <x-header :left-options="{showBack: false}">
      {{pageTitle}}
      <a slot="right" @click="goLogin()">{{userName}}</a>
    </x-header>

    <div class="list-part">
      <div class="msg-items" v-for="item in tabList">
        <p class="item-date">
          <span>{{item.applyTime}}</span>
        </p>
        <div class="item-detail">

          <router-link :to="{path:'detail',query:{id:item.procInsId,type:item.procDefKey,taskId:item.taskId}}">
            <p class="item-detail-type">{{item.procDefName}}
              <span v-if="item.status=='todo'">待处理</span>
              <span v-if="item.status=='claim'">待签收</span>
            </p>
            <p class="item-detail-subtitle">您有一个申请需要处理，请点击本信息进行处理</p>
            <p class="item-detail-title">标题：{{item.taskName}}</p>
            <p class="item-detail-user">申请人：{{item.applyUser}}</p>
          </router-link>
        </div>
      </div>
    </div>
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
      this.$vux.loading.show({text: "加载中"});
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
          this.$vux.loading.hide();
        })
        .catch(response => {
          this.$vux.loading.hide();
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
