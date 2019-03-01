<template>

  <div id="detail-msg">
    <x-table full-bordered style="background-color:#fff;">
      <tbody>
      <tr>
        <td colspan="4"  class="detail-page-title">审批记录</td>
      </tr>
      <tr>
        <td class="detail-page-name">审批人</td>
        <td class="detail-page-name">审批时间</td>
        <td class="detail-page-name">审批结果</td>
        <td class="detail-page-name">审批意见</td>
      </tr>
      <tr v-for="item in auditData2">
        <td class="detail-page-name">{{item.assigneeName}}</td>
        <td>{{item.auditTime}}</td>
        <td class="detail-page-name">{{item.isPass}}</td>
        <td v-html="item.comments"></td>
      </tr>
      </tbody>
    </x-table>
  </div>

</template>

<script>
  import {XTable} from 'vux'
  import Vue from 'vue'

  var DetailMsgCom = Vue.extend({})

  Vue.component('detail-msg', DetailMsgCom)

  export default {
    name: 'DetailMsg',
    props: {
      auditData: Array
    },
    components: {
      XTable
    },
    data () {
      return {
        baseUrl: this.$store.state.url
      }
    },
    mounted () {
      console.log(this.auditData,'--msg子组件的aduitData');
    },
    methods: {

    },
    computed:{//计算属性
      auditData2:function(){
          for(let i=0;i<this.auditData.length;i++){
              if(typeof this.auditData[i].isPass== 'string'){

              }else {
                if (this.auditData[i].isPass) {
                  this.auditData[i].isPass = '同意'
                }
                if(!this.auditData[i].isPass){
                  this.auditData[i].isPass = '否决'
                }
              }
          }
          return this.auditData;
      }
  }
  }
</script>
<style scoped lang="less">
  .detail-page-title,.detail-page-name{
    background: #edf7ff;
  }
  .vux-table td, .vux-table th{
    padding: 5px;
  }
  .vux-table td{
    font-size: 12px;
  }
  .detail-page-remark{
    font-size: 13px !important;
  }
</style>
