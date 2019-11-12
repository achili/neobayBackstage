<template>
	<div class="row">

		<div class="col-xs-12">

      <span v-if="financeBillReceipt.financePayInfo.id">
			  <div class="row">
			  	<label class="col-md-2 control-label mt5 compulsory">关联付款信息单</label>
				  <div class="col-md-10" v-if="refresh">
					  <FinancePayInfoPagerSelection :activeFinancePayInfo="financeBillReceipt.financePayInfo"
					                                :initFilter="{'orderId':'DESC'}"/>
				  </div>
			  </div>
      </span>

      <span v-if="financeBillReceipt.financeElectricPay.id">
       <div class="row">
         <label class="col-md-2 control-label mt5 compulsory">关联电费付款信息单</label>
          <div class="col-md-10" v-if="refresh">
           <FinanceElectricPayPagerSelection :activeFinanceElectricPay="financeBillReceipt.financeElectricPay"
                                        :initFilter="{'orderId':'DESC'}"/>
         </div>
       </div>
      </span>

			<div class="row mt10">
				<label class="col-md-2 control-label mt5 compulsory">付款方公司或负责人：</label>
				<div class="col-md-10">
					<input type="text" class="form-control" v-model="financeBillReceipt.companyName">
				</div>
			</div>

			<div class="row mt10">
				<label class="col-md-2 control-label mt5 compulsory">金额：</label>
				<div class="col-md-10">
					<input type="number" class="form-control" v-model="financeBillReceipt.amount">
				</div>
			</div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">尾差调整：</label>
        <div class="col-md-10">
          <input type="number" class="form-control" v-model="financeBillReceipt.tail">
        </div>
      </div>

			<div class="row mt10">
				<label class="col-md-2 control-label mt5 compulsory">收款时间：</label>
				<div class="col-md-10">
					<el-date-picker
						v-model="financeBillReceipt.receiveTime"
						type="datetime"
						placeholder="选择日期时间">
					</el-date-picker>
				</div>
			</div>

			<div class="row mt10">
				<label class="col-md-2 control-label mt5 compulsory">收款类别：</label>
				<div class="col-md-10">

					<select class="form-control" v-model="financeBillReceipt.category">
						<option v-for="category in financeBillReceipt.getCategoryList()" :value="category.value">{{category.name}}

						</option>
					</select>

				</div>
			</div>

			<div class="row mt10">
				<label class="col-md-2 control-label mt5 compulsory">支付方式：</label>
				<div class="col-md-10">

					<select class="form-control" v-model="financeBillReceipt.type">
						<option v-for="type in financeBillReceipt.getTypeList()" :value="type.value">{{type.name}}</option>
					</select>

				</div>
			</div>

      <div class="row mt5" v-if="financeBillReceipt.type === financeBillReceipt.Type.DEDUCTION">
        <div class="col-md-offset-2 col-md-10">
          <p>该合同应交履约保证金:<span class="text-danger">{{deposit}}</span></p>
          <p>累计扣除履约保证金  :<span class="text-danger">{{cumulativeDeductions}}</span></p>
          <p>可扣除履约保证金    :<span class="text-info">{{deposit - cumulativeDeductions}}</span></p>

          <p>累计扣除金额不能大于应交履约保证金</p>
        </div>

      </div>

			<div v-if="financeBillReceipt.type === financeBillReceipt.Type.BANK">


				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">付款银行：</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="financeBillReceipt.partyBBank">
					</div>
				</div>
				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">付款银行户名：</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="financeBillReceipt.partyBBankAccount">
					</div>
				</div>
				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">付款银行账号：</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="financeBillReceipt.partyBBankNo">
					</div>
				</div>
			</div>


			<div class="row mt10">
				<label class="col-md-2 control-label mt5">备注：</label>
				<div class="col-md-10">
					<input type="text" class="form-control" v-model="financeBillReceipt.remark">
				</div>
			</div>

			<div class="row mt10" v-show="financeBillReceipt.errorMessage">
				<div class="col-xs-12">
					<div class="alert alert-danger">
						{{financeBillReceipt.errorMessage}}

					</div>
				</div>
			</div>

			<div class="row mt10">
				<div class="col-md-12 text-right">
					<SubmitButton :loading="financeBillReceipt.loading" :callback="save"/>
				</div>

			</div>

		</div>
	</div>
</template>
<script>

	import {MessageBox, Notification as NotificationBox} from 'element-ui'
	import {simpleDateTime, str2Date} from '../../../../../../common/filter/time'
	import FinanceBillReceipt from  "../../../../../../common/model/finance/FinanceBillReceipt"
	import FinancePayInfoPagerSelection from  "../../../pay/Selection.vue";
	import SubmitButton from "../../../../widget/SubmitButton.vue"
  import FinanceElectricPayPagerSelection from  "../../../electric/pay/Selection.vue";


  export default{
		data(){
			return {
        refresh: true
      }
		},
		props: {
			financeBillReceipt: {
				type: FinanceBillReceipt,
				required: true
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
			FinancePayInfoPagerSelection,
			SubmitButton,
      FinanceElectricPayPagerSelection
		},
		computed: {
      deposit() {
        if(this.financeBillReceipt.financePayInfo.protocolSpace.deposit) {
          return this.financeBillReceipt.financePayInfo.protocolSpace.deposit;
        }
        return this.financeBillReceipt.protocolSpace.deposit;
      },
      cumulativeDeductions() {
        if(this.financeBillReceipt.financePayInfo.protocolSpace.cumulativeDeductions) {
          return this.financeBillReceipt.financePayInfo.protocolSpace.cumulativeDeductions;
        }
        return this.financeBillReceipt.protocolSpace.cumulativeDeductions;
      }
    },
		watch: {},
		methods: {
			save(){
        this.financeBillReceipt.errorMessage = "";
//        if(this.deposit - this.cumulativeDeductions -  this.financeBillReceipt.amount < 0) {
//          this.financeBillReceipt.errorMessage = '累计扣除金额不能大于应交履约保证金';
//          NotificationBox.error({
//            message: '累计扣除金额不能大于应交履约保证金'
//          });
//          return;
//        }
        this.refresh = false;
				let that = this;
				//此处我们只新建 不修改？what?
				//this.financeBillReceipt.id = null;
				this.financeBillReceipt.httpSave(function (response) {
					NotificationBox.success({
						message: that.financeBillReceipt.editMode ? '修改付款信息成功！' : '创建付款信息成功！'
					});
          that.refresh = true;
					if (typeof that.successCallback === "function") {
						that.successCallback();
					}
				}, that.errorCallback);
			}
		},
		mounted() {
			let that = this;
		}
	}
</script>

