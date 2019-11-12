<template>
  <div class="pdf-container">
    <h1>付款通知书</h1>

    <div>
      <p>尊敬的<span class="underline">{{ financeOtherPay.companyName }}</span>：</p>
      <p class="text-indent">根据贵我双方于之约定，请贵公司前向我公司支付下列款项。</p>
      <p class="text-right">单位：（人民币）元</p>
    </div>
    <div>
      <table class="item-table">
        <tr>
          <th>收款项     </th>
          <th colspan="3">{{financeOtherPay.beneficiaryName}}</th>
        </tr>

        <tr>
          <td colspan="3">应付合计</td>
          <td>{{financeOtherPay.paymentTotal}}</td>
        </tr>
        <tr v-if="!financeOtherPay.surplusTotal - financeOtherPay.paymentTotal === 0">
          <td colspan="3">已付合计</td>
          <td>{{financeOtherPay.surplusTotal - financeOtherPay.paymentTotal}}</td>
        </tr>
        <tr>
          <td colspan="3">应付余额</td>
          <td>{{financeOtherPay.surplusTotal}}</td>
        </tr>

        <tr>
          <td>备注     </td>
          <td colspan="3">{{financeOtherPay.remarks}}</td>
        </tr>

      </table>

    </div>

    <table class="bank-table">
      <tr>
        <td colspan="2">户名：{{ financeOtherPay.bankAccount }}</td>
      </tr>
      <tr>
        <td>开户行：{{ financeOtherPay.bank }}</td>
        <td>账号：{{ financeOtherPay.bankNo }}</td>
      </tr>
    </table>

    <p class="text-indent">
      此致！
    </p>

    <div class="signature">
      <p>上海零号湾创业投资有限公司（章）</p>
      <p class="underline">{{ financeOtherPay.notifyTime | date("yyyy 年 MM 月 dd 日") }}</p>

      <img class="seal"
           src="../../../../../../../common/assets/img/seal.png"/>
    </div>
    <p>提醒：支付款项时请备注房间号及款项类型（租金/履约保证金）。</p>
    <table class="contact-table">
      <tr>
        <td>联系人</td>
        <td>联系方式</td>
        <td>联系地址</td>
      </tr>
      <tr>
        <td>{{financeOtherPay.dutyName}}</td>
        <td>{{financeOtherPay.dutyPhone}}</td>
        <td>{{financeOtherPay.dutyAddress}}</td>
      </tr>

    </table>
    <p>＊如财务室电话无人接听，可与您社区经理联系</p>


</div>
</template>




<style lang="less" rel="stylesheet/less">
  .finance-pay-preview {

    h1 {
      font-family: "simhei", serif;
      font-size: 34px;
      text-align: center;
      font-weight: bold;
      padding-top: 0px;
    }

    p {
      line-height: 32px;
      margin: 0;
      padding: 0;
    }

    .underline {
      text-decoration: underline;
    }

    .text-right {
      text-align: right;
    }

    .text-indent {
      text-indent: 2em;
    }

    .pdf-container {
      font-family: "simsun", serif;
      padding: 0 40px 20px 40px;
      color: black;
      font-size: 18px;
    }

    .item-table {
      margin-top: 10px;
      width: 100%;
      border: solid #000;
      border-width: 1px 0 0 1px;
      border-spacing: 0;
    }

    .item-table th, .item-table td {
      height: 55px;
      border: solid #000;
      border-width: 0 1px 1px 0;
      padding: 10px;
    }

    .bank-table {
      margin-top: 10px;
      width: 100%;
      font-size: 18px;
    }

    .bank-table th, .bank-table td {
      height: 30px;
      padding: 10px 0;
    }

    .signature {
      text-align: right;
      position: relative;
    }

    .seal {
      width: 4.2cm;
      position: absolute;
      top: -1.5cm;
      right: 1cm;
    }
    .contact-table {
      margin-top: 10px;
      width: 100%;
      border: solid #000;
      border-width: 1px 0 0 1px;
      border-spacing: 0;
    }
    .contact-table th, .contact-table td {
      height: 30px;
      border: solid #000;
      border-width: 0 1px 1px 0;
      padding: 5px;
    }

  }
</style>

<script>
  import FinanceOtherPay from "../../../../../../../common/model/finance/FinanceElectricPay"

  export default{
    data(){
      return {}
    },
    props: {
      financeOtherPay: {
        required: true
      }

    }
  }

</script>
