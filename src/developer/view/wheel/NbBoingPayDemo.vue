<template>
  <div class="nb-boing-pay-demo">
    <h1>支付功能 Demo</h1>

    <div>
      <div>
        <button class="btn btn-primary btn-sm btn-file mb30" @click="fetchCode('3003')">
          生成支付宝二维码
        </button>
        <button class="btn btn-primary btn-sm btn-file mb30" @click="fetchCode('3004')">
          生成微信二维码
        </button>
        <button class="btn btn-primary btn-sm btn-file mb30" @click="payOnline">
          招银一网通支付
        </button>
      </div>
      <div>{{title}}</div>
      <el-dialog title="二维码展示"  center fullscreen :visible.sync="DialogShowQRCode" top="35vh" :close-on-click-modal="true" :close-on-press-escape="true" class=" el-dialog-size" >
        <div id="qrCode" class="code"></div>
      </el-dialog>
    </div>

    <form id="form" action="http://121.15.180.66:801/netpayment/BaseHttp.dll?PC_EUserPay" method="post" target="_blank">
      <input type="hidden" id="jsonRequestData" name="jsonRequestData" />
      <input type="hidden" name="charset" value='utf-8' />
    </form>
  </div>

</template>
<script>
  import BoingPayCashier from "../../../common/model/boingpay/cashier/BoingPayCashier";
  import QRCode from 'qrcodejs2'
  import {Notification, MessageBox} from 'element-ui';
  import OnlinePay from "../../../common/model/pay/OnlinePay";
  import {getPayParamsText} from "../../../common/util/PayUtil";
  import $ from "jquery"

  export default{
    data(){
      return {
        boingPayCashier: new BoingPayCashier(),
        text:'',
        title:"",
        DialogShowQRCode: false,
        onlinePay: new OnlinePay(),
        result: ""
      }
    },
    watch: {},
    methods: {
      fetchCode(no) {
        let that = this;
        this.DialogShowQRCode = true;
        this.boingPayCashier.httpFetchCode(no, function (res) {
          that.text = res.data.qr_code;
          if (that.qrCode) {
            document.getElementById('qrCode').innerHTML = ''
          }
          that.createQrCode();
        });
        if (no === '3003') {
            this.title = '支付宝二维码';
        }
        if (no === '3004') {
          this.title = '微信二维码';
        }
      },
      createQrCode(){
        this.qrCode = new QRCode('qrCode', {
          width: 200,
          height: 200, // 高度
          text: this.text// 二维码内容
          //render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          //background: '#f0f',
          //foreground: '#ff0'
          //correctLevel: QRCode.CorrectLevel.H;
        });
      },
      payOnline() {
        let that = this;
        this.onlinePay.httpPcPayment(124, function (response) {
          $('#jsonRequestData').val(JSON.stringify(response.data));
          $('#form').submit();
        })
      }
    },
    components: {

    },
    mounted(){
      // this.createQrCode();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .nb-boing-pay-demo{
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
