<template>
	<div class="animated fadeIn">

		<LoadingFrame :loading="financePayInfo.detailLoading">
			<div class="row">

				<div class="col-xs-12">
					<h2 v-show="!financePayInfo.editMode"><i class="fa fa-fire text-success"></i>创建付款信息</h2>
					<h2 v-show="financePayInfo.editMode"><i class="fa fa-fire text-success"></i>修改付款信息</h2>
				</div>

				<div class="col-xs-12">

					<NbSlidePanel title="付款信息">
						<div class="row">
							<label class="col-md-2 control-label mt5 compulsory">关联租赁合同</label>
							<div class="col-md-10">
								<ProtocolSpacePagerSelection :activeProtocolSpace="financePayInfo.protocolSpace"
								                             :initFilter="{'withPayInfo':true,'status':'PROCESSING'}"/>
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">合同编号</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.protocolNo" readonly>
							</div>
						</div>


            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">租赁房屋</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financePayInfo.spaceName">
              </div>
            </div>


						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">公司或负责人</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.companyName">
							</div>
						</div>



						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">收款计算方式</label>
							<div class="col-md-10">
								<select class="form-control" v-model="financePayInfo.type">
									<option v-for="type in financePayInfo.getTypeList()" :value="type.value">
										{{type.name}}
									</option>
								</select>
							</div>
						</div>


						<div class="row mt10" v-if="financePayInfo.type === Type.MONTH">
							<label class="col-md-2 control-label mt5 compulsory">租金收款月数</label>
							<div class="col-md-10">
								<input type="number" class="form-control" v-model.number="financePayInfo.month">
							</div>
						</div>


						<div class="row mt10" v-if="financePayInfo.type === Type.DAY">
							<label class="col-md-2 control-label mt5 compulsory">租金收款天数</label>
							<div class="col-md-10">
								<input type="number" class="form-control" v-model.number="financePayInfo.day">
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">合同签约时间</label>
							<div class="col-md-10">
								<el-date-picker
									v-model="financePayInfo.signTime"
									type="date"
									placeholder="选择日期时间">
								</el-date-picker>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">租金起算时间</label>
							<div class="col-md-10">
								<el-date-picker
									v-model="financePayInfo.rentStartTime"
									type="date"
									placeholder="选择日期时间">
								</el-date-picker>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">履约保证金</label>
							<div class="col-md-10">
								<input type="number" class="form-control" v-model.number="financePayInfo.deposit">
							</div>
						</div>

						<div class="row mt10" v-if="financePayInfo.deposit">
							<label class="col-md-2 control-label mt5 compulsory">履约保证金时间范围</label>
							<div class="col-md-10">

								<NbDateRange :startTime="financePayInfo.depositStartTime"
								             v-on:startTimeChange="financePayInfo.depositStartTime = arguments[0]"
								             :endTime="financePayInfo.depositEndTime"
								             v-on:endTimeChange="financePayInfo.depositEndTime = arguments[0]"/>

							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">租金/{{financePayInfo.type === Type.MONTH?"月":"天"}}</label>
							<div class="col-md-10">
								<input type="number" class="form-control" v-model.number="financePayInfo.rental">
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">租金时间范围</label>
							<div class="col-md-10">

								<NbDateRange :startTime="financePayInfo.startTime"
								             v-on:startTimeChange="financePayInfo.startTime = arguments[0]"
								             :endTime="financePayInfo.endTime"
								             v-on:endTimeChange="financePayInfo.endTime = arguments[0]"/>

							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory" v-if="financePayInfo.type === Type.MONTH">{{financePayInfo.month}}个月租金</label>
							<label class="col-md-2 control-label mt5 compulsory" v-if="financePayInfo.type === Type.DAY">{{financePayInfo.day}}天租金</label>
							<div class="col-md-10">
								<input type="number" class="form-control" disabled :value="rentalTotal">
							</div>
						</div>

						<div class="row mt10" v-if="financePayInfo.deposit">
							<label class="col-md-2 control-label mt5 compulsory">保证金,租金小计</label>
							<div class="col-md-10">
								<input type="number" class="form-control" disabled :value="stepTotal">
							</div>
						</div>


						<!--<div class="row mt10">-->
							<!--<label class="col-md-2 control-label mt5 compulsory">抵扣金额/{{financePayInfo.type === Type.MONTH?"月":"天"}}</label>-->
							<!--<div class="col-md-10">-->
								<!--<input type="number" class="form-control" v-model.number="financePayInfo.innoToken">-->
							<!--</div>-->
						<!--</div>-->

						<!--<div class="row mt10">-->
							<!--<label class="col-md-2 control-label mt5 compulsory" v-if="financePayInfo.type === Type.MONTH">{{financePayInfo.month}}个月抵扣金额</label>-->
							<!--<label class="col-md-2 control-label mt5 compulsory" v-if="financePayInfo.type === Type.DAY">{{financePayInfo.day}}天抵扣金额</label>-->
							<!--<div class="col-md-10">-->
								<!--<input type="number" class="form-control" disabled v-model.number="financePayInfo.innoTokenTotal">-->
							<!--</div>-->
						<!--</div>-->

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">抵扣总额</label>
              <div class="col-md-10">
                <input type="number" class="form-control" v-model.number="financePayInfo.innoTokenTotal">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5">抵扣类型</label>
              <div class="col-md-10">
                <div>
                  <NbCheckbox val="创新券" v-model="innoTokenTypesList"></NbCheckbox>
                  <label>创新券</label>
                  <NbCheckbox val="租金减免" v-model="innoTokenTypesList"></NbCheckbox>
                  <label>租金减免</label>
                  <NbCheckbox val="履约保证金减免" v-model="innoTokenTypesList"></NbCheckbox>
                  <label>履约保证金减免</label>
                  <NbCheckbox val="其他" v-model="innoTokenTypesList"></NbCheckbox>
                  <label>其他</label>
                </div>
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5">抵扣备注</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financePayInfo.innoTokenRemarks">
              </div>
            </div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">合计</label>
							<div class="col-md-10">
								<input type="number" class="form-control" disabled :value="total">
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">大写合计</label>
							<div class="col-md-10">
								<input type="text" class="form-control" disabled :value="capitalTotal">
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">开户银行</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.bank">
							</div>
						</div>
						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">银行户名</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.bankAccount">
							</div>
						</div>
						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">银行账号</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.bankNo">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">落款时间</label>
							<div class="col-md-10">
								<el-date-picker
									v-model="financePayInfo.notifyTime"
									type="date"
									placeholder="选择日期时间">
								</el-date-picker>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">财务部联系人</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.dutyName">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">财务部联系电话</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.dutyPhone">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">财务部地址</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="financePayInfo.dutyAddress">
							</div>
						</div>


						<div class="mt10">
							<FinancePayInfoPdfPreview :financePayInfo="financePayInfo"/>
						</div>

					</NbSlidePanel>

				</div>

        <div class="col-xs-12 mv10 text-right">
					<div class="alert alert-danger text-center" v-show="financePayInfo.errorMessage">
						{{financePayInfo.errorMessage}}
					</div>
					<CreateSaveButton :entity="financePayInfo" :callback="save"/>
				</div>

			</div>

		</LoadingFrame>

	</div>
</template>
<script>

	import {MessageBox, Notification as NotificationBox} from 'element-ui'
	import {simpleDateTime, str2Date} from '../../../../common/filter/time'
	import Notification from  "../../../../common/model/notification/Notification"
	import FinancePayInfo from  "../../../../common/model/finance/FinancePayInfo"
	import ProtocolSpacePagerSelection from  "../../protocol/space/Selection.vue";
	import TemplatePagerSelection from  "../../../../developer/view/template/Selection.vue";
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
	import {numberCapital} from "../../../../common/filter/str";
	import NbDateRange from  "../../../../common/widget/NbDateRange.vue"
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"
	import LoadingFrame from "../../widget/LoadingFrame";
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'

	import FinancePayInfoPdfPreview from "./widget/FinancePayInfoPdfPreview.vue";
  import Preference from "../../../../common/model/preference/Preference";


	export default{
		data(){
			return {
				Type: FinancePayInfo.prototype.Type,
				financePayInfo: new FinancePayInfo(),
				notification: new Notification(),
        innoTokenTypesList: [],
        preference: new Preference()
			}
		},
		components: {
			ProtocolSpacePagerSelection,
			TemplatePagerSelection,
			NbSlidePanel,
			NbDateRange,
			FinancePayInfoPdfPreview,
			CreateSaveButton,
			LoadingFrame,
      NbCheckbox
		},
		computed: {
			rentalTotal(){

				if (this.Type.MONTH === this.financePayInfo.type) {
					this.financePayInfo.rentalTotal = this.financePayInfo.rental * this.financePayInfo.month;
				}else if(this.Type.DAY === this.financePayInfo.type){
					this.financePayInfo.rentalTotal = this.financePayInfo.rental * this.financePayInfo.day;
				}
				return this.financePayInfo.rentalTotal;
			},
			stepTotal(){
				this.financePayInfo.stepTotal = this.financePayInfo.deposit + this.rentalTotal;
				return this.financePayInfo.stepTotal;
			},
			// innoTokenTotal(){
            //
			// 	if (this.Type.MONTH === this.financePayInfo.type) {
			// 		this.financePayInfo.innoTokenTotal = this.financePayInfo.innoToken * this.financePayInfo.month;
			// 	}else if(this.Type.DAY === this.financePayInfo.type){
			// 		this.financePayInfo.innoTokenTotal = this.financePayInfo.innoToken * this.financePayInfo.day;
			// 	}
            //
            //
			// 	return this.financePayInfo.innoTokenTotal;
			// },

			total(){
				this.financePayInfo.total = this.stepTotal - this.financePayInfo.innoTokenTotal;
				return this.financePayInfo.total;
			},
			capitalTotal(){
				this.financePayInfo.capitalTotal = numberCapital(this.total);
				return this.financePayInfo.capitalTotal;
			}
		},
		watch: {
			"financePayInfo.protocolSpace.id"(newVal, oldVal){
				if (this.financePayInfo.editMode !== true || oldVal !== 0) {
					this.financePayInfo.fillByProtocolSpace();
					this.spaceUpdate();
				}
			},
      "innoTokenTypesList"(newVal, oldVal){
        let innoTokenTypes = "";
        this.innoTokenTypesList.forEach( type => {
          innoTokenTypes += type + " ";
        });
        this.financePayInfo.innoTokenTypes = innoTokenTypes;
      }
		},
		methods: {
      spaceUpdate(){
        let that = this;
        this.preference.httpSearch(this.financePayInfo.protocolSpace.spaceRegional.id,function () {
          that.financePayInfo.bank = that.preference.bank;
          that.financePayInfo.bankAccount = that.preference.bankName;
          that.financePayInfo.bankNo = that.preference.bankNo;
          that.financePayInfo.dutyName = that.preference.financeDuty;
          that.financePayInfo.dutyPhone = that.preference.financePhone;
          that.financePayInfo.dutyAddress = that.preference.financeAddress;

        })

      },
			save(){
				let that = this;
				if (!this.financePayInfo.editMode) {
					this.financePayInfo.status = "NEW";
				}
				this.financePayInfo.httpSave(function (response) {
					NotificationBox.success({
						message: that.financePayInfo.editMode ? '修改付款信息成功！' : '创建付款信息成功！'
					});
					that.$router.push("/by/finance/pay/info/detail/" + that.financePayInfo.id);
				});
			},
			fetchDetail(){
				let that = this;
				this.financePayInfo.httpDetail(function () {
          that.innoTokenTypesList = that.financePayInfo.innoTokenTypes.split(" ");
        });
			}
		},
		mounted(){
			let that = this;

			this.financePayInfo.id = this.$store.state.route.params.id;
			if (this.financePayInfo.id) {
				this.financePayInfo.editMode = true;
				this.fetchDetail();
			}
		}
	}
</script>

