<template>
  <div class="row finance--electric-pay-preview">
    <div class="col-xs-12">
      <NbSlidePanel type="info">

					<span slot="heading" class="f16">
						<i class="fa fa-file-pdf-o"></i>
						付款通知书
					</span>

        <div class="pdf-container">
          <h1>付款通知书</h1>
          <h2>(电费)</h2>
          <div>
            <p>尊敬的<span class="underline">{{ financeElectricPay.companyName }}</span>：</p>
            <p class="text-indent">根据贵我双方于<span
              class="underline">{{ financeElectricPay.signTime | date("yyyy年MM月dd日") }}</span>签署的合同编号为{{financeElectricPay.protocolNo}}《零号湾房屋租赁合同》之约定，下列款项请在<span
              class="underline">{{ financeElectricPay.bankTime | date("yyyy年MM月dd日") }}</span>前解入我公司开户银行，逾期按合同收取违约金。</p>
            <p class="text-right">单位：（人民币）元</p>
          </div>

          <div>
            <table class="item-table">
              <tr>
                <th style="min-width: 70px">租赁<br/>空间</th>
                <th style="min-width: 160px">付款所属<br/>日期</th>
                <th>初始电表读数<br/>(房屋交接)</th>
                <th>上期<br/>电表读数</th>
                <th>本期<br/>电表读数</th>
                <th>本期应缴<br/>电费度数</th>
                <th>本期应缴电费<br/>金额(人民币)</th>
              </tr>
              <tr>
                <td>
                  <div style="max-width: 70px">{{financeElectricPay.spaceName}}</div>
                </td>
                <td>
                  <div>{{financeElectricPay.startTime | date("yyyy/MM/dd")
                    }}-{{financeElectricPay.endTime | date("yyyy/MM/dd") }}
                  </div>
                </td>
                <td>{{financeElectricPay.initialMeter}}</td>
                <td>

                  <span v-if="financeElectricPay.lastMeter !== financeElectricPay.initialMeter">{{financeElectricPay.lastMeter}}</span>

                  <span v-else>-</span>

                </td>
                <td>{{financeElectricPay.currentMeter}}</td>
                <td>{{financeElectricPay.paymentMeter}}</td>
                <td>
                  <div style="max-width: 110px">{{financeElectricPay.currentMoney}}</div>
                </td>
              </tr>
              <tr>
                <td colspan="6" class="jy">应付合计</td>
                <td>
                  <div style="max-width: 110px">{{financeElectricPay.paymentTotal}}</div>
                </td>
              </tr>

              <tr v-if="financeElectricPay.paid">
                <td colspan="6" class="jy" >已付金额</td>
                <td>
                  <div style="max-width: 110px">{{financeElectricPay.paid}}</div>
                </td>
              </tr>

              <tr v-if="financeElectricPay.deduction">
                <td colspan="6" class="jy" >从履约保证金中扣除</td>
                <td>
                  <div style="max-width: 110px">{{financeElectricPay.deduction}}</div>
                </td>
              </tr>

              <tr v-if="financeElectricPay.paymentTotal != financeElectricPay.remainTotal">
                <td colspan="6" class="jy">应付余额</td>
                <td><div style="max-width: 110px">{{financeElectricPay.remainTotal}}</div></td>
              </tr>

            </table>
          </div>

          <table class="bank-table">
            <tr>
              <td class="jz">户名:{{ financeElectricPay.bankAccount }}</td>
              <td></td>
            </tr>
            <tr >
              <td class="jz">开户行：{{ financeElectricPay.bank }}</td>
              <td class="jz">账号：{{ financeElectricPay.bankNo }}</td>
            </tr>
          </table>

          <p class="text-indent">
            此致！
          </p>

          <div class="signature">
            <p>上海零号湾创业投资有限公司（章）</p>
            <p class="underline">{{ financeElectricPay.notifyTime | date("yyyy 年 MM 月 dd 日") }}</p>

            <img class="seal"
                 src="../../../../../../common/assets/img/seal.png"/>
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;* 本期应缴电费度数=本期电表读数-上期电表读数</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;本期应缴电费金额=本期应缴电费度数×（1+20%）×1.35</p>
          </div>
          <p>提醒：支付款项时请备注租赁合同及款项类型（电费）。</p>
          <table class="contact-table">
            <tr>
              <td>联系人</td>
              <td>联系方式</td>
              <td>联系地址</td>
            </tr>
            <tr>
              <td>{{financeElectricPay.dutyName}}</td>
              <td>{{financeElectricPay.dutyPhone}}</td>
              <td>{{financeElectricPay.dutyAddress}}</td>
            </tr>

          </table>
          <p>＊如财务室电话无人接听，可与您社区经理联系</p>


        </div>

      </NbSlidePanel>

    </div>
  </div>


</template>

<script>

  import NbSlidePanel from  "../../../../../../common/widget/NbSlidePanel.vue"
  import FinanceElectricPay from "../../../../../../common/model/finance/FinanceElectricPay";

  export default {
       data(){
         return {

         }
       },
      props:{
        financeElectricPay:{
          type: FinanceElectricPay,
          required: true
        }

      },
      components:{
        NbSlidePanel
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .finance--electric-pay-preview {
    h1 {
      font-family: "simhei", serif;
      font-size: 34px;
      text-align: center;
      font-weight: bold;
      padding-top: 0px;
    }
    h2{
      font-family: "simhei", serif;
      text-align: center;
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

    .item-table td {
      height: 35px;
      border: solid #000;
      border-width: 0 1px 1px 0;
      padding: 10px 5px;
    }

    .item-table th {
      height: 35px;
      border: solid #000;
      border-width: 0 1px 1px 0;
      padding: 20px 0;
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
      height: 20px;
      border: solid #000;
      border-width: 0 1px 1px 0;
      padding: 2px;
    }
    th {
      text-align: center;
      vertical-align: middle;
    }
    td {
      text-align: center;
      vertical-align: middle;
    }
    .jy{
      text-align: right;
      vertical-align: middle;
    }
    .jz{
      text-align:left;
    }
  }
</style>
