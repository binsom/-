<!--项目登记-->
<template>
  <div>
    <x-table>
      <tbody>
      <tr>
        <td colspan="4"  class="detail-page-title">基本信息</td>
      </tr>
      <tr>
        <td class="detail-page-name">项目编号</td>
        <td>{{info.projectCode}}</td>
        <td class="detail-page-name">招标人名称</td>
        <td>{{info.tenderer}}</td>
      </tr>
      <tr>
        <td class="detail-page-name">项目名称</td>
        <td colspan="3">{{info.projectName}}</td>
      </tr>
      <tr>
        <td class="detail-page-name">项目所属地区</td>
        <td colspan="3">{{info.address}}</td>
      </tr>
      <tr>
        <td class="detail-page-name">承办部门</td>
        <td>{{info.officeName}}</td>
        <td class="detail-page-name">项目负责人</td>
        <td>{{info.managerName}}</td>
      </tr>
      <tr>
        <td class="detail-page-name">预算金额（元）</td>
        <td>{{info.budgetAmount}}</td>
        <td class="detail-page-name">预计公司收入（元）</td>
        <td>{{info.forcastIncome }}</td>
      </tr>
      <tr>
        <td class="detail-page-name">交易平台</td>
        <td>{{info.platformName}}</td>
        <td class="detail-page-name">交易标的</td>
        <td>{{info.tenderObjectName}}</td>
      </tr>
      <tr>
        <td class="detail-page-name">招标方式</td>
        <td>{{info.tenderMode}}</td>
        <td class="detail-page-name">投标模式</td>
        <td>{{info.bidMode}}</td>
      </tr>
      <tr>
        <td class="detail-page-name">开标模式</td>
        <td>{{info.bidOpenMode}}</td>
        <td class="detail-page-name">评标模式</td>
        <td>{{info.evaluationModel}}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { XTable,XButton } from 'vux'
  var AssetBuyPage = Vue.extend({})
  Vue.component('ProjectRegistration-page', AssetBuyPage)
  export default {
    name: 'ProjectRegistration',
    components: {
      XTable,XButton
    },
    props: {
      idArr: Array
    },
    data () {
      return {
        baseUrl: this.$store.state.url,
        info: {}
      }
    },
    mounted () {
      this.$vux.loading.show({
        text: '加载中'
      });
      this.axios({
        url: this.baseUrl+'/oa_api/act_task/auditInfo',
        method: 'get',
        params: {
          procInsId:this.idArr[0]
        }
      }).then((response) => {
        this.info = response.data.data;
        this.$vux.loading.hide();
        }).catch((response) => {
            this.$vux.loading.hide();
        });
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

