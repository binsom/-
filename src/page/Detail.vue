<template>
  <div>
    <div class="fixed-part detail-part">
      <x-header :left-options="{showBack: true}">{{pageTitle}}
        <a slot="right" @click="goLogin()" v-if="!userName">登录</a>
        <a slot="right" @click="goLogin()" v-if="userName">{{userName}}</a>
      </x-header>

      <button-tab>
        <button-tab-item selected @on-item-click="changeTab(1)">详情列表</button-tab-item>
        <button-tab-item @on-item-click="changeTab(2)">流程意见</button-tab-item>
        <button-tab-item @on-item-click="changeTab(3)">查看附件</button-tab-item>
      </button-tab>

    </div>

    <div class="scroll-part">
      <detail-page v-if="type" v-show="listShow" :idArr="[this.id,this.pageTitle,this.type]"></detail-page>

      <detail-msg v-if="auditData.length>0" v-show="msgShow" :auditData="this.auditData"></detail-msg>

      <div id="detail-file" v-show="fileShow">
        <x-table :cell-bordered="false" :content-bordered="true" style="background-color:#fff;">
          <thead>
          <tr style="background-color: #F7F7F7">
            <th style="width: 50%">附件名</th>
            <th>上传用户</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,key) in fileData" :key="key">
            <td>{{item.attachBatchName}}</td>
            <td>{{item.assigneeName}}</td>
            <td>
              <x-button mini @click.native="attachment(item.attachmentId)">查看</x-button>
            </td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </div>


    <!--处理待办-->
    <div id="footer" v-if="status=='todo'">
      <x-input placeholder="请签批" v-model="opinion" class="weui-vcode">
        <x-button slot="right" class="btn-refuse" @click.native="submitReview(true)" mini>提交</x-button>
        <x-button v-if="noPassShow" slot="right" class="btn-submit" @click.native="submitReview(false)" mini>驳回</x-button>
      </x-input>
    </div>

    <!--处理签收-->
    <div id="footer" v-if="status=='claim'">
      <x-button type="primary" @click.native="claim">签收</x-button>
    </div>

  </div>

</template>

<script>
  import DetailPage from "../components/detail/DetailPages";
  import DetailMsg from "../components/detail/Msg";
  import {
      XHeader,
      XInput,
      ButtonTab,
      ButtonTabItem,
      XButton,
      XTable
  } from "vux";
  export default {
    name: 'Detail',
    data () {
      return {
        pageTitle: "详情",
        listShow: true, // 详情列表tab
        msgShow: false, // 流程意见tab
        fileShow: false, // 查看附件tab
        userName:false,
        pageTitle: this.$route.query.title, //待办标题
        id: this.$route.query.id, // 待办id查看详情
        type: this.$route.query.type, // 待办类型
        status: "", //待办的状态 （待办和签收两种）
        taskId: this.$route.query.taskId, //任务id
        noPassShow: false,
        auditData:[],
        fileData:[],//附件
        opinion: "", // 审批意见
        baseUrl: this.$store.state.url
      }
    },
    components: {
      XHeader,
      XInput,
      ButtonTab,
      ButtonTabItem,
      DetailPage,
      DetailMsg,
      XButton,
      XTable
    },
    mounted() {
      console.log(this.$route.query,'--------detail里面获取query');
      this.$store.commit("refresh");
      if (this.$store.state.userInfo.name) {
        this.userName = this.$store.state.userInfo.name;
      }
//      this.$vux.loading.show({text: "加载中"});
      this.getTaskInfo();
      this.getFlow(); // 流程意见

    },
    methods: {
      goLogin() {
        this.$router.push({ name: "Login" });
      },
      changeTab(v){
        console.log(v,'--------vvvvvvvv')
        // 切换tab页
        if (v === 1) {
          this.msgShow = false;
          this.fileShow = false;
          this.listShow = true;
        } else if (v === 2) {
          this.listShow = false;
          this.fileShow = false;
          this.msgShow = true;
        } else if (v === 3) {
          this.listShow = false;
          this.msgShow = false;
          this.fileShow = true;
          this.getFile();
        }
      },
      getTaskInfo(){
        this.axios({
          url: this.baseUrl + "/oa_api/act_task/getTaskInfo",
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params: {
            taskId: this.taskId
          }
        })
          .then(response => {
            this.status = response.data.data.status;
            console.log(this.status,'-----this.status');
            this.noPassShow = response.data.data.noPassShow;
          })
          .catch(response => {
          });

      },
      getFlow() {
        // 获取流程意见数据
        this.axios({
          url: this.baseUrl + "/oa_api/act_task/histoicFlow",
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params: {
            procInsId: this.id
          }
        })
          .then(response => {
            this.auditData = response.data.data;
            this.$vux.loading.hide();
          })
          .catch(response => {
            this.$vux.loading.hide();
          });
      },
      getFile() {
        // 获取附件数据
        this.$vux.loading.show({
          text: "加载中"
        });
        this.axios({
          url: this.baseUrl + "/oa_api/act_task/getAttachments",
          method: "get",
          params: {
            procInsId: this.id
          }
        })
          .then(response => {
            this.fileData = response.data.data;
            this.$vux.loading.hide();
          })
          .catch(response => {
            this.$vux.loading.hide();
          });
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .vux-button-group {
    margin: 10px;
  }
  .button-tab {
    text-align: center;
  }
  .vux-label {
    color: #999999;
  }
  .fixed-part {
    position: fixed;
    top: 0;
    width: 100%;
    background: #ebebeb;
    z-index: 100;
  }
  .detail-part .vux-header {
    position: relative !important;
  }
  .scroll-part {
    margin-top: 96px;
    padding-bottom: 80px;
  }
  .weui-cells__title {
    font-weight: 600;
  }
  .vux-cell-primary {
    color: #000000 !important;
  }
  .vux-button-tab-item-middle {
    border-left: 0.2px solid #459ffb;
  }
  .weui-wepay-flow {
    padding: 0px 20px !important;
  }
  .weui-wepay-flow__line,
  .weui-wepay-flow__state {
    background-color: #cccccc !important;
  }
  .weui-wepay-flow__li_done .weui-wepay-flow__state,
  .weui-wepay-flow__line_done .weui-wepay-flow__process {
    background-color: #45a8fb !important;
  }
  .state-start .weui-wepay-flow__state {
    background-color: transparent !important;
    border: 2px solid #45a8fb;
  }
  .state-end .weui-wepay-flow__state {
    background-color: transparent !important;
    border: 2px solid #cccccc !important;
  }
  .weui-wepay-flow__process {
    background-color: #45a8fb !important;
  }


  #detail-file {
    margin-bottom: 46px;
  }
  .fixed-part {
    position: fixed;
    top: 0;
    width: 100%;
    background: #ebebeb;
    z-index: 100;
  }
  .detail-part .vux-header {
    position: relative !important;
  }
  .scroll-part {
    margin-top: 96px;
    padding-bottom: 80px;
  }
  #footer {
    position: fixed;
    bottom: 0;
    height: 46px;
    width: 100%;
    background-color: #ffffff;
    border-top: 0.2px solid #d9d9d9;
    margin-top: 15px;
    z-index: 100;
  }
  #footer .btn-submit {
    color: #ffffff;
    background-color: #459ffb;
    margin-top: 0;
  }
  #footer .btn-refuse {
    color: #ffffff;
    background-color: #6bbd22;
    margin-right: 5px;
  }

  .vux-table {
    font-size: 13px;
    line-height: normal !important;
  }
  .vux-table thead tr {
    line-height: 40px;
  }
  .vux-table .weui-btn {
    margin: 10px 0px;
  }
  .vux-table th {
    width: 33%;
  }
  .weui-dialog__bd {
    display: none;
  }
  .submit-dialog {
  .weui-dialog {
    height: 95%;
    max-width: 95%;
    width: 95%;
  }
  }
  .dialog-content {
    max-height: 85%;
    overflow-y: scroll;
  }
  .dialog-title {
    color: #459ffb;
    padding: 3px;
  }
  .vux-checker-item {
    display: block !important;
    font-size: 14px;
    padding: 2px;
  }
  .selected-item {
    color: #ffffff;
    background-color: #459ffb;
  }
  .dialog-part {
    border: 1px solid #bbdafb;
  }
  .dialog-close-btn {
    text-align: right;
  }
  .weui-dialog__hd {
    word-break: break-all;
  }
  #copyUrl {
    border: none;
    outline: none;
  }
  .tag-read {
    background: none;
    display: inline-block;
    padding: 0 1.32em;
    line-height: 2.3;
    font-size: 13px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .urlPart {
    width: 300px;
    word-wrap: break-word;
    word-break: normal;
  }
  #checkType {
    border-top: 1px solid #e4e4e4;
    padding: 5px 10px;
  }
  #searchResult {
    background: #eaeaea;
    padding: 0px 50px;
    font-size: 12px;
  ul {
  li {
    list-style-type: none;
    padding: 2px 0px;
  .btnLink {
    cursor: pointer;
  }
  }
  }
  .btnl {
    float: left;
  }
  .btnr {
    float: right;
  .weui-btn {
    padding: 2px 8px;
    line-height: 17px;
  }
  }
  }
  #searchBar {
  .weui-cell {
    font-size: 14px;
  }
  }
  #searchResult {
  .weui-btn {
    font-size: 12px;
    line-height: 22px;
  }
  }
  #confirmSub {
    padding: 15px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
