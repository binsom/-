<template>
  <div id="detail-page">
    <component :is="who" :idArr="this.idArr"></component>
  </div>
</template>

<script>
  import Vue from 'vue'
  //项目登记
  import ProjectRegistration from './todo/guangzi_todo/ProjectRegistration'
  import Announcement from  './todo/guangzi_todo/announcement'
  import bidWinnerNotice from './todo/guangzi_todo/bidWinnerNotice'

  Vue.component('detail-page', {})
  export default {
    name: 'DetailPage',
    props: {
      idArr: Array
    },
    components:{
      //项目登记
      ProjectRegistration,
      //中标公告、中标公示审核、答疑澄清、招标公告（通用）
      Announcement,
      //中标通知书
      bidWinnerNotice
    },
    data () {
      return {
        baseUrl: this.$store.state.url,
        who: '',
        id:'',
        type: '',
        businessName:''
      }
    },
    mounted () {
      //用type判断打开哪个详情页面，用id传入详情页面请求数据
      this.id = this.idArr[0];//用于查看业务详情
      this.businessName = this.idArr[1];
      this.type = this.idArr[2];
      this.changePageCom(this.type);//跳转对应组件
    },
    methods: {
      changePageCom:function(v){
        console.log(v,'---------v');
        switch (v)
        {
          // 行政
          case 'bidWinnerNotice':
            this.who='bidWinnerNotice';//中标通知书
            break;
          case 'ProjectEntry':
            this.who='ProjectRegistration';//项目登记
            break;

          case 'WinBidNoticeAudit':
            this.who='Announcement';//中标公告
            break;
          case 'WinBidPublicityAudit':
            this.who='Announcement';//中标公示审核
            break;
          case 'queriesClarify':
            this.who='Announcement';//答疑澄清
            break;
          case 'TenderNoticeAudit':
            this.who='Announcement';//招标公告
            break;
          default:
            console.log('不匹配',v);
        }
      }
    }
  }
</script>

<style lang="less">
  #detail-page{
    width: 100%;
    margin-bottom: 46px;
    background: white;
  }
  td{
    width: 30%;
  }
  .detail-page-name{
    width: 20%;
  }
  table{
    width:100% !important;
  }
</style>
