<template>
  <div class="finance-pay-show">
    <NbExpanding>
      <div class="pay-page">

        <div class="row mt10 pay-location">

          <div class="col-lg-3 col-sm-12 bank-location">
            <div class="aliPayBackground cursor" @click="choosePay('AliPay')">
              <div class="radio">
                <NbRadio v-model="isPay" val="AliPay" name="pay"></NbRadio>
              </div>
              <div class="long-bar"></div>
              <div style="display: flex">
                <div class="ali-pay"></div>
                <div class="aliPayText">支付宝</div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-sm-12 bank-location">
            <div class="weChatPayBackground cursor" @click="choosePay('WeChat')">
              <div class="radio">
                <NbRadio v-model="isPay" val="WeChat" name="pay"></NbRadio>
              </div>
              <div class="long-bar"></div>
              <div style="display: flex">
                <div class="weChat-pay"></div>
                <div class="weChatPayText">微信支付</div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-sm-12 bank-location">
            <div class="bankPayBackground cursor" @click="choosePay('Bank')">
              <div class="radio">
                <NbRadio v-model="isPay" val="Bank" name="pay"></NbRadio>
              </div>
              <div class="long-bar"></div>
              <div style="display: flex">
                <div class="bank-pay"></div>
                <div class="bankPayText">招银一网通支付</div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-sm-12 bank-location">
            <div class="enterprisePayBackground cursor" @click="choosePay('Enterprise')">
              <div class="radio">
                <NbRadio v-model="isPay" val="Enterprise" name="pay"></NbRadio>
              </div>
              <div class="long-bar"></div>
              <div style="display: flex">
                <div class="enterprise-pay"></div>
                <div class="enterprisePayText">企业支付</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </NbExpanding>
    <div class="col-md-12 text-right but-location">
      <button title="发起支付" class="btn btn-success" @click="surePay(entity)">
        发起支付
      </button>

    </div>
    <el-dialog title="请扫描二维码支付" center fullscreen :visible.sync="DialogShowQRCode" top="35vh" :close-on-click-modal="true" :close-on-press-escape="true" @close="handleClose(entity)" class="el-dialog-size" >
      <div id="qrCode" class="code"></div>
    </el-dialog>

    <form id="form" action="http://121.15.180.66:801/netpayment/BaseHttp.dll?PC_EUserPay" method="post" target="_blank">
      <input type="hidden" id="jsonRequestData" name="jsonRequestData" />
      <input type="hidden" name="charset" value='utf-8' />
    </form>


  </div>
</template>

<script>
  import NbExpanding from '../../../../../common/widget/NbExpanding'
  import NbRadio from "../../../../../common/widget/NbRadio.vue";
  import QRCode from 'qrcodejs2'
  import {Notification, MessageBox} from 'element-ui';
  import $ from "jquery"
    export default {
      data () {
        return {
          name: "FinancePayShow",
          isPay: "",
          no:null,
          //0是待支付 1是支付中 2支付成功 3支付失败 4是未知 5是pos机支付
          payLoadingState: 0,
          codeClose: 0,
          DialogShowQRCode: false
        }
      },
      props: {
        closeCall: {
          type: Function
        },
        entity:{

        },
        successCallback: {
          type: Function,
          required: false
        },
        errorCallback: {
          type: Function,
          required: false
        }
      },
      components: {
        NbExpanding,
        NbRadio
      },
      methods: {
        choosePay(item) {
          this.isPay = item;
        },

        refresh(){
          this.entity.httpDetail();
        },
        refreshStateCall() {
          let that = this;
          if(this.queryLock || this.payLoadingState === 2) {
            return;
          }
          this.queryLock = true;
          this.entity.httpQueryPayState( this.entity.id,function (res) {
            if(res.data.status.status === "FINISH") {
              //支付成功了
              that.payLoadingState = 2;
              that.codeClose = 1;
              that.DialogShowQRCode = false;
              MessageBox.confirm('您已支付成功', '提示', {
                showCancelButton:false,
                confirmButtonText: '确定',
                type: 'success'
              }).then(function () {
                that.refresh();
              }, function () {
                that.refresh();
              });
            }
            if(res.data.status.status === "FAILED") {
              //支付失败了
              that.payLoadingState = 3;
              that.codeClose = 0;
              that.DialogShowQRCode = false;
              MessageBox.confirm('您支付失败，请重新支付', '提示', {
                showCancelButton:false,
                confirmButtonText: '确定',
                type: 'success'
              }).then(function () {
                that.DialogShowQRCode = true;
              }, function () {
                that.DialogShowQRCode = true;
              });
            }
            that.queryLock = false;
          }, function () {
            that.DialogShowQRCode = false;
            that.queryLock = false;
          });
        },
        refreshState() {
          this.refreshStateCall && this.refreshStateCall();
        },

        surePay(entity) {
          let that = this;
          if(this.payLoadingState === 2) {
            return;
          }
          this.queryLock = false;
          if(this.isPay === null || this.isPay === ""){
            Notification.error({
              message: '请选择支付方式!'
            });
            return;
          }
          if(this.isPay === "AliPay" || this.isPay === "WeChat"){
            this.DialogShowQRCode = true;
            if(this.isPay === "AliPay"){
              this.no = 3003;
            }else{
              this.no = 3004;
            }
            this.entity.httpFetchCode(this.no,entity,this.isPay, function (res) {
              that.text = res.data.qr_code;
              if (that.qrCode) {
                document.getElementById('qrCode').innerHTML = ''
              }
              that.createQrCode();
              that.interval = setInterval(that.refreshState, 2000);
            });
          }else if(this.isPay === "Bank"){
            if (entity.remark && entity.remark.length > 20) {
              Notification.info({
                message: '备注最长为20个字！'
              });
              return;
            }
            this.entity.httpPcPayment(entity,this.isPay, function (response) {
              $('#jsonRequestData').val(JSON.stringify(response.data));
              $('#form').submit();
              that.interval = setInterval(that.refreshState, 2000);
            })
          }else{
            Notification.info({
              message: '暂不支持企业支付，敬请期待!'
            });
            return;
          }
        },
        makeQRCode(){
          this.qrCode.makeCode(this.text);
        },
        createQrCode(){
          this.qrCode = new QRCode('qrCode', {
            width: 200,
            height: 200, // 高度
            text: this.text// 二维码内容
          });
        },
        handleClose(){
          let that = this;
          if(this.codeClose === 0){
            MessageBox.confirm('确定取消此次支付么？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function () {
              that.queryLock = true;
              that.DialogShowQRCode = false;
            }, function () {
              that.DialogShowQRCode = true;
            });
          }
        }
      },
      mounted(){

      },
      beforeDestroy() {
        if (this.interval) {
          clearInterval(this.interval)
        }
      }
    }

</script>

<style lang="less" rel="stylesheet/less">
  .finance-pay-show{
    .pay-page{
      background: #fff;
      border: 1px solid  #ddd;
      border-radius: 2px;
      padding: 20px;
      position: relative;
      top: 0px;

      .pay-location{
        margin-top: -10px;
        .aliPayBackground{
          border: 1px solid #c1c1c1;
          height: 61px;
          width: 189px;
          display: flex;
          justify-content: space-between;
          .radio{
            margin-left: 15px;
            margin-top: 19px;
          }
          .long-bar{
            margin-left: -125px;
            margin-top: 13px;
            height: 35px;
            border: 0.5px solid  #c1c1c1;
          }
          .aliPayText{
            font-size: 17px;
            color: #6c6d6e;
            margin-left: 12px;
            margin-top: 19px;
          }
          .ali-pay{
            height: 37px;
            width: 37px;
            border-radius:25px;
            margin-top: 12px;
            margin-left:-133px;
            background: url("../../../../../common/assets/img/pay/alipay.png")no-repeat center content-box;
            background-size: 100%;
          }
        }

        .weChatPayBackground{
          border: 1px solid #c1c1c1;
          height: 61px;
          width: 189px;
          display: flex;
          justify-content: space-between;
          .radio{
            margin-left: 15px;
            margin-top: 19px;
          }
          .long-bar{
            margin-right: 126px;
            margin-top: 13px;
            height: 35px;
            border: 0.5px solid  #c1c1c1;
          }
          .weChatPayText{
            font-size: 17px;
            color: #6c6d6e;
            margin-left: 12px;
            margin-top: 19px;
          }
          .weChat-pay{
            height: 37px;
            width: 37px;
            border-radius:25px;
            margin-top: 12px;
            margin-left:-133px;
            background: url("../../../../../common/assets/img/pay/weChat.jpg")no-repeat center content-box;
            background-size: 100%;
          }
        }

        .bank-location{
          margin-top: 10px;
          @media(max-width: 1440px) {
            width: 50%;
          }
          .bankPayBackground{
            border: 1px solid #c1c1c1;
            height: 61px;
            width: 237px;
            display: flex;
            justify-content: space-between;
            .radio{
              margin-left: 15px;
              margin-top: 19px;
            }
            .long-bar{
              margin-right: 173px;
              margin-top: 13px;
              height: 35px;
              border: 0.5px solid  #c1c1c1;
            }
            .bankPayText{
              font-size: 17px;
              color: #6c6d6e;
              margin-left: 12px;
              margin-top: 19px;
            }
            .bank-pay{
              height: 37px;
              width: 37px;
              border-radius:25px;
              margin-top: 12px;
              margin-left:-182px;
              background: url("../../../../../common/assets/img/pay/bank-logo.jpg")no-repeat center content-box;
              background-size: 100%;
            }
          }
        }

        .enterprisePayBackground{
          border: 1px solid #c1c1c1;
          height: 61px;
          width: 189px;
          display: flex;
          justify-content: space-between;
          .radio{
            margin-left: 15px;
            margin-top: 19px;
          }
          .long-bar{
            margin-left: -125px;
            margin-top: 13px;
            height: 35px;
            border: 0.5px solid  #c1c1c1;
          }
          .enterprisePayText{
            font-size: 17px;
            color: #6c6d6e;
            margin-left: 12px;
            margin-top: 19px;
          }
          .enterprise-pay{
            height: 37px;
            width: 37px;
            border-radius:25px;
            margin-top: 12px;
            margin-left:-133px;
            background: url("../../../../../common/assets/img/pay/bank-logo.jpg")no-repeat center content-box;
            background-size: 100%;
          }
        }
      }
    }
    .but-location{
      margin-top: 10px;
    }
    .el-dialog-size{
      width: 100%;
      .el-dialog--small {
        width: 25%;
        min-width: 300px;
      }
      .code{
        width:200px;
        height: 200px;
        background:white;
        margin: 0 auto 17px;
      }
    }
  }

</style>
