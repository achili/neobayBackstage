<template>
	<div class="row finance-pay-preview">
		<div class="col-xs-12">
			<NbSlidePanel type="info">

					<span slot="heading" class="f16">
						<i class="fa fa-file-pdf-o"></i>
						付款通知书
					</span>
				<div slot="body">

          <div class="pdf-container" style="overflow-x: scroll;">
            <h1>付款通知书</h1>

            <div>
              <p>尊敬的<span class="underline">{{ financePayInfo.companyName }}</span>：</p>
              <p class="text-indent">根据贵我双方于<span
                class="underline">{{ financePayInfo.signTime | date("yyyy年MM月dd日") }}</span>签署的《零号湾房屋租赁合同》之约定，请贵公司在<span
                class="underline">{{financePayInfo.rentStartTime | date("yyyy年MM月dd日") }}</span>前向我公司支付下列款项。</p>
              <p class="text-right">单位：（人民币）元</p>
            </div>
            <div>
              <table class="item-table">
                <tr>
                  <th><div style="text-align: center">租赁房屋</div></th>
                  <th><div style="text-align: center">合同编号</div></th>
                  <th style="min-width: 111px;text-align: center"><div class="text-center">项目</div></th>
                  <th style="min-width: 95px;text-align: center"><div class="text-center">金额</div></th>
                  <th><div style="text-align: center">付款所属日期</div></th>
                </tr>

                <tr>
                  <td  rowspan="20"  colspan="1"><div style="max-width: 110px">{{financePayInfo.spaceName}}</div></td>
                  <td  rowspan="20"  colspan="1">{{financePayInfo.protocolNo}}</td>
                </tr>

                <tr v-if="financePayInfo.deposit">

                  <td>履约保证金</td>
                  <td>{{financePayInfo.deposit}}</td>
                  <td>
                    {{ financePayInfo.depositStartTime | date("yyyy/MM/dd") }} -
                    {{ financePayInfo.depositEndTime | date("yyyy/MM/dd") }}


                  </td>
                </tr>

                <tr>
                  <td>租金</td>
                  <td>{{financePayInfo.rentalTotal}}</td>
                  <td>
                    {{ financePayInfo.startTime | date("yyyy/MM/dd") }} -
                    {{ financePayInfo.endTime | date("yyyy/MM/dd") }}


                  </td>
                </tr>
                <tr v-if="financePayInfo.innoTokenTotal">
                  <td>小计</td>
                  <td colspan="3">{{financePayInfo.stepTotal}}</td>
                </tr>
                <tr v-show="financePayInfo.innoTokenTotal">
                  <td rowspan="2">抵扣金额</td>
                  <td  rowspan="2">{{financePayInfo.innoTokenTotal}}</td>
                  <td  colspan="2">抵扣类型：{{financePayInfo.innoTokenTypes}}</td>
                </tr>
                <tr v-show="financePayInfo.innoTokenTotal">
                  <td colspan="2">备注：{{financePayInfo.innoTokenRemarks}}</td>
                </tr>
                <tr>
                  <td>应付合计</td>
                  <td colspan="3">
                    <b>
                      {{financePayInfo.total}}
                    </b>
                    <b>&nbsp;&nbsp;</b>
                    <span>
											大写：
										</span>
                    <b>
                      {{financePayInfo.capitalTotal}}
                    </b>
                  </td>
                </tr>

                <tr v-if="financePayInfo.deduction">
                  <td>
                      从履约保证金中扣除
                  </td>
                  <td colspan="3">
                    <b>
                      {{financePayInfo.deduction}}
                    </b>
                    <b>&nbsp;&nbsp;</b>
                    <span>
											大写：
										</span>
                    <b>
                      {{financePayInfo.deductionCapital}}
                    </b>
                  </td>
                </tr>

                <tr v-if="financePayInfo.deposit && financePayInfo.remainTotal != financePayInfo.total">
                  <td>履约保证金已付</td>
                  <td colspan="3">{{financePayInfo.depositPaid}}</td>
                </tr>
                <tr v-if="financePayInfo.remainTotal != financePayInfo.total && financePayInfo.rentalPaid">
                  <td>租金已付</td>
                  <td colspan="3">{{financePayInfo.rentalPaid}}</td>
                </tr>

                <tr v-if="financePayInfo.remainTotal != financePayInfo.total || financePayInfo.deduction">
                  <td>
                    <b>
                      应付余额
                    </b>
                  </td>
                  <td colspan="3">
                    <b>
                      {{financePayInfo.remainTotal}}
                    </b>
                    <span>
											大写：
										</span>
                    <b>
                      {{financePayInfo.remainCapital}}
                    </b>
                  </td>
                </tr>

              </table>

            </div>

            <table class="bank-table">
              <tr>
                <td colspan="2">户名：{{ financePayInfo.bankAccount }}</td>
              </tr>
              <tr>
                <td>开户行：{{ financePayInfo.bank }}</td>
                <td>账号：{{ financePayInfo.bankNo }}</td>
              </tr>
            </table>

            <p class="text-indent">
              此致！
            </p>

            <div class="signature">
              <p>上海零号湾创业投资有限公司（章）</p>
              <p class="underline">{{ financePayInfo.notifyTime | date("yyyy 年 MM 月 dd 日") }}</p>

              <img class="seal"
                   src="../../../../../common/assets/img/seal.png"/>
            </div>
            <p>提醒：支付款项时请备注房间号及款项类型（租金/履约保证金）。</p>
            <table class="contact-table">
              <tr>
                <td>联系人</td>
                <td>联系方式</td>
                <td>联系地址</td>
              </tr>
              <tr>
                <td>{{financePayInfo.dutyName}}</td>
                <td>{{financePayInfo.dutyPhone}}</td>
                <td>{{financePayInfo.dutyAddress}}</td>
              </tr>

            </table>
            <p>＊如财务室电话无人接听，可与您社区经理联系</p>


          </div>

				</div>
			</NbSlidePanel>

		</div>
	</div>
</template>

<script>
	import FinancePayInfo from  "../../../../../common/model/finance/FinancePayInfo"
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
	export default{
		data(){
			return {}
		},
		props: {
			financePayInfo: {
				type: FinancePayInfo,
				required: true
			}

		},

		components: {
			NbSlidePanel

		}

	}


</script>
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
