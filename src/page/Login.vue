<template>
  <div>
      <x-header :left-options="{showBack: true}">{{pageTitle}}</x-header>
      <div class="login-part" v-if="isLogin==false">
        <p class="login-in">
          <group>
            <x-input title="用户名" v-model="accountsVal">
              <img class="img-user" slot="label" style="padding-right:10px;display:block;" src="../assets/icon/user.png" width="24" height="24">
            </x-input>
          </group>
        </p>
        <p class="login-in">
          <group>
            <x-input title="密码" v-model="passwordVal" type="password">
              <img class="img-lock" slot="label" style="padding-right:10px;display:block;" src="../assets/icon/lock.png" width="24">
            </x-input>
          </group>
        </p>
        <p>
          <x-button class="login-button" action-type="button" @click.native="goLogin">登 录</x-button>
        </p>
      </div>

      <div class="logout-part" v-else>
        <p>
          <x-button type="warn" class="logout-button" @click.native="goLogout">退出登录</x-button>
        </p>
      </div>
  </div>
</template>

<script>
  import { Group, XButton, XInput, XHeader } from "vux";
  export default {
    components: {
      XHeader,
      Group,
      XButton,
      XInput
    },
    name: 'Login',
    data () {
      return {
        pageTitle:"",
        accountsVal: "",
        passwordVal: "",
        isLogin: false
      }
    },
    mounted() {
      this.$store.commit("refresh");
      if (this.$store.state.token.length > 0) {
        this.isLogin = true;
        this.pageTitle =this.$store.state.userInfo.name;
      } else {
        this.isLogin = false;
        this.pageTitle ='登录';
      }
    },
    methods: {
      goLogin() {
          this.$store.commit("login",{
              username:this.accountsVal,
              password:this.passwordVal
          })
      },
      goLogout() {
        this.$store.commit("logout", {});
        this.accountsVal = "";
        this.passwordVal = "";
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
