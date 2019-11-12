<template>
	<div class="animated fadeIn">

		<LoadingFrame :loading="protocolSpace.detailLoading">
			<div class="row">

				<div class="col-xs-12">
					<h2 v-show="!protocolSpace.editMode"><i class="fa fa-fire text-success"></i>创建租赁协议</h2>
					<h2 v-show="protocolSpace.editMode"><i class="fa fa-fire text-success"></i>修改租赁协议</h2>
				</div>

				<div class="col-xs-12">

          <NbSlidePanel title="基本信息">

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">关联创业空间申请</label>
              <div class="col-md-9">
								<SpaceApplyPagerSelection :activeSpaceApply="protocolSpace.spaceApply"
								                          :initFilter="{'status':'PASS','archive':false,'orderId':'DESC'}"/>
							</div>
						</div>


						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">名称</label>
              <div class="col-md-9">
								<input type="text" class="form-control" v-model="protocolSpace.name">
							</div>
						</div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">租赁协议类型</label>
              <div class="col-md-9">
                <select v-model="protocolSpace.type" class="form-control">
                  <option v-for="type in protocolSpace.spaceApply.TypeList" :value="type.value">{{type.name}}</option>
                </select>
              </div>
            </div>

            <div class="row mt10" v-show="protocolSpace.type === protocolSpace.Type.INCUBATOR">
              <label class="col-md-3 control-label mt5 compulsory">电费收取方式(2号楼独立空间需要)</label>
              <div class="col-md-9">
                <select v-model="protocolSpace.tariffType" class="form-control">
                  <option v-for="type in protocolSpace.TariffTypeList" :value="type.value">{{type.name}}</option>
                </select>
              </div>
            </div>

            <div class="row mt10" v-if="protocolSpace.editMode===true">
              <label class="col-md-3 control-label compulsory">编号</label>
              <div class="col-md-9">
                <input v-model="protocolSpace.no" type="text" class="form-control">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">甲方</label>
              <div class="col-md-9">
								<input type="text" class="form-control" v-model="protocolSpace.partyA">
							</div>
						</div>

						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">乙方</label>
              <div class="col-md-9">
								<input type="text" class="form-control" v-model="protocolSpace.partyB">
							</div>
						</div>

						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">年限</label>
              <div class="col-md-9">
								<input type="number" class="form-control" v-model="protocolSpace.year">
							</div>
						</div>


						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">开始时间</label>
              <div class="col-md-9">
								<el-date-picker
									v-model="protocolSpace.startTime"
									type="date"
									placeholder="选择日期时间">
								</el-date-picker>
							</div>
						</div>
						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">结束时间</label>
              <div class="col-md-9">
								<el-date-picker
									v-model="protocolSpace.endTime"
									type="date"
									placeholder="选择日期时间">
								</el-date-picker>
							</div>
						</div>

            <div class="row mt10" v-if="protocolSpace.type === protocolSpace.Type.ACCELERATOR">
              <label class="col-md-3 control-label mt5 compulsory">交付时间</label>
              <div class="col-md-9">
                <el-date-picker
                  v-model="protocolSpace.deliveryTime"
                  type="date"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>
            <div class="row mt10" v-if="protocolSpace.type !== protocolSpace.Type.ACCELERATOR">
              <label class="col-md-3 control-label mt5 compulsory">第一期租金缴纳时间</label>
              <div class="col-md-9">
                <el-date-picker
                  v-model="protocolSpace.firstRentalTime"
                  type="date"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>
            <div class="row mt10" v-if="protocolSpace.type !== protocolSpace.Type.ACCELERATOR">
              <label class="col-md-3 control-label mt5 compulsory">缴纳履约保证金时间</label>
              <div class="col-md-9">
                <el-date-picker
                  v-model="protocolSpace.depositTime"
                  type="date"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>

            <div class="row mt10" v-show="protocolSpace.type === protocolSpace.Type.ACCELERATOR">
              <label class="col-md-3 control-label mt5 compulsory">装修免租期(1号楼独立空间需要)</label>
              <div class="col-md-2">
                <input type="number" class="form-control" v-model="protocolSpace.rentFreePeriod">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">费用起算时间</label>
              <div class="col-md-9">
								<el-date-picker
									v-model="protocolSpace.rentStartTime"
									type="date"
									placeholder="选择日期时间">
								</el-date-picker>
							</div>
						</div>
						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">续租提前月数</label>
              <div class="col-md-9">
								<input type="number" class="form-control" v-model="protocolSpace.reletAheadMonth">
							</div>
						</div>
						<div class="row mt10" v-if="protocolSpace.type == protocolSpace.Type.ACCELERATOR">
              <label class="col-md-3 control-label mt5 compulsory">定金</label>
              <div class="col-md-9">
								<input type="number" class="form-control" v-model="protocolSpace.frontMoney">
							</div>
						</div>
						<div class="row mt10" v-if="protocolSpace.type == protocolSpace.Type.ACCELERATOR">
              <label class="col-md-3 control-label mt5 compulsory">大写定金</label>
              <div class="col-md-9">
								<input type="text" class="form-control" disabled :value="frontMoneyRental">
							</div>
						</div>
						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">租金/月</label>
              <div class="col-md-9">
								<input type="number" class="form-control" v-model="protocolSpace.rental">
							</div>
						</div>
						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">大写租金</label>
              <div class="col-md-9">
								<input type="text" class="form-control" disabled :value="capitalRental">
							</div>
						</div>
						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">履约保证金（单位：月数）</label>
              <div class="col-md-9">
								<input type="number" class="form-control" v-model="protocolSpace.depositMonth">
							</div>
						</div>
						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">履约保证金</label>
              <div class="col-md-9">
								<input type="text" class="form-control" disabled :value="deposit">
							</div>
						</div>

						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">大写履约保证金</label>
              <div class="col-md-9">
								<input type="text" class="form-control" disabled :value="capitalDeposit">
							</div>
						</div>


						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">抵扣总额</label>
              <div class="col-md-9">
								<input type="number" class="form-control" v-model="protocolSpace.totalInnoToken">
							</div>
						</div>
						<div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">租金支付方式</label>
              <div class="col-md-9">
								<select class="form-control" v-model="protocolSpace.intervalMonth">
									<option value="1">按月支付</option>
									<option value="3">按季度支付</option>
									<option value="6">按半年支付</option>
									<option value="12">按年支付</option>
								</select>
							</div>
						</div>

						<div class="row mt10">
              <label class="col-md-3 control-label mt5">甲方联系电话</label>
              <div class="col-md-9">
								<input type="text" class="form-control" v-model="protocolSpace.partyAPhone">
							</div>
						</div>

						<div class="row mt10">
              <label class="col-md-3 control-label mt5">乙方联系电话</label>
              <div class="col-md-9">
								<input type="text" class="form-control" v-model="protocolSpace.partyBPhone">
							</div>
						</div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">财务联系人姓名</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="protocolSpace.dutyName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">财务联系人电话</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="protocolSpace.dutyPhone">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">财务联系人邮箱</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="protocolSpace.dutyEmail">
              </div>
            </div>

					</NbSlidePanel>

          <NbSlidePanel title="发票信息">

            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">甲方纳税人识别号：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyACode">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">乙方纳税人识别号：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyBCode">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">甲方开户银行：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyABank">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">乙方开户银行：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyBBank">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">甲方银行账号：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyABankNo">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">乙方银行账号：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyBBankNo">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">甲方地址：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyAAddress">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">乙方地址：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyBAddress">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">甲方电话：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyASignPhone">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">乙方电话：</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="protocolSpace.partyBSignPhone">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">发票类型：</label>
                  <div class="col-md-10">
                    <select class="form-control" v-model="protocolSpace.invoiceType">
                      <option value="普票">
                        普票
                      </option>
                      <option value="专票">
                        专票
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

          </NbSlidePanel>

          <div v-if="!protocolSpace.archive">
            <ChooseStationRoom :protocolSpace="protocolSpace"/>
          </div>


        </div>
				<div class="col-xs-12 mv10 text-right">
					<div class="alert alert-danger text-center" v-show="protocolSpace.errorMessage">
						{{protocolSpace.errorMessage}}
					</div>
					<CreateSaveButton :entity="protocolSpace" :callback="save"/>
				</div>


			</div>
		</LoadingFrame>

	</div>
</template>
<script>
	import {MessageBox, Notification} from 'element-ui'

	import ProtocolSpace from  "../../../../common/model/protocol/space/ProtocolSpace"
  import { numberCapital } from '../../../../common/filter/str'
  import { addDate } from '../../../../common/filter/time'

	import SpaceApplyPagerSelection from  "../../space/apply/Selection.vue";
	import TemplatePagerSelection from  "../../../../developer/view/template/Selection.vue";
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"
	import LoadingFrame from "../../widget/LoadingFrame";
  import ChooseStationRoom from './widget/ChooseStationRoom .vue'
  import Preference from "../../../../common/model/preference/Preference";

	export default{
		data(){
			return {
        protocolSpace: new ProtocolSpace(),
        isFirst: true,
        preference:new Preference()
			}
		},
		components: {
			SpaceApplyPagerSelection,
			TemplatePagerSelection,
			NbSlidePanel,
			LoadingFrame,
      CreateSaveButton,
      ChooseStationRoom
		},
		computed: {
			capitalRental(){
				this.protocolSpace.capitalRental = numberCapital(this.protocolSpace.rental);
				return this.protocolSpace.capitalRental;
			},
			deposit(){
				this.protocolSpace.deposit = this.protocolSpace.rental * this.protocolSpace.depositMonth;
				return this.protocolSpace.deposit;
			},
			capitalDeposit(){
				this.protocolSpace.capitalDeposit = numberCapital(this.deposit);
				return this.protocolSpace.capitalDeposit;
			},
			frontMoneyRental(){
				this.protocolSpace.frontMoneyRental = numberCapital(this.protocolSpace.frontMoney);
				return this.protocolSpace.frontMoneyRental;
			}
		},
		watch: {
			"protocolSpace.spaceApply.id"(newVal, oldVal){
        if (!this.isFirst) {
          this.protocolSpace.fillBySpaceApply();
        } else {
          if (this.protocolSpace.editMode !== true) {
            this.protocolSpace.fillBySpaceApply();
          }
        }
        this.isFirst = false;
        if (this.protocolSpace.editMode !== true || oldVal !== 0) {
          this.spaceUpdate();
        }

      },
      "protocolSpace.startTime"(newVal, oldVal){
        if (this.protocolSpace.editMode !== true) {
          this.protocolSpace.depositTime = addDate(newVal, -5);
        }
      },
      'protocolSpace.type' (newVal, oldVal) {
        if (!this.isFirst) {
          this.protocolSpace.fillByProtocolType()
        } else {
          if (this.protocolSpace.editMode !== true) {
            this.protocolSpace.fillByProtocolType()
          }
        }
        this.isFirst = false
      }
		},
		methods: {
      spaceUpdate(){
        let that = this;
        this.preference.httpSearch(this.protocolSpace.spaceApply.spaceRegional.id,function () {
          that.protocolSpace.partyARepresentative = that.preference.representative;
          that.protocolSpace.partyAPhone = that.preference.representativePhone;
          that.protocolSpace.signAddress = that.preference.signAddress;
          that.protocolSpace.partyABank = that.preference.bank;
          that.protocolSpace.partyABankNo = that.preference.bankNo;
          that.protocolSpace.partyACode = that.preference.taxpayerCode;
          that.protocolSpace.partyAAddress = that.preference.partyAAddress;
          that.protocolSpace.partyASignPhone = that.preference.partyASignPhone;

        })

      },
			save(){
				let that = this;
				if (!this.protocolSpace.editMode) {
					this.protocolSpace.status = "NEW";
				}
				this.protocolSpace.httpSave(function (response) {
					Notification.success({
						message: that.protocolSpace.editMode ? '修改租赁协议成功！' : '创建租赁协议成功！'
					});
					that.$router.push("/by/protocol/space/detail/" + that.protocolSpace.id);
				});
			},
			fetchDetail(){
				let that = this;
				this.protocolSpace.httpDetail();
			}
		},
		mounted(){
			let that = this;

			this.protocolSpace.id = this.$store.state.route.params.id;
			if (this.protocolSpace.id) {
				this.fetchDetail();
			} else {

			}
		}
	}
</script>

