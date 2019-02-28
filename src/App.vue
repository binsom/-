<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body{
    background: #ebebeb;
  }
  .vux-x-icon {
    fill: #ffffff;
  }
  .weui-cells{
    margin: 0 !important;
  }
  .weui-dialog__bd{
    display: none;
  }
  .weui-dialog__btn_primary{
    color: #459ffb;
  }
</style>
