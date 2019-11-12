<template>

	<div>


		<NbSlidePanel type="info" v-if="protocolSpace.status === Status.NEW ||
			protocolSpace.status === Status.PROCESSING ||
			protocolSpace.status === Status.EXPIRE ||
			protocolSpace.status === Status.EXCEPTION
">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          操作面板
      </span>

			<div slot="body">

				<div class="form-group clearfix">
					<div class="row">
						<label class="col-md-2 control-label">当前状态</label>
						<div class="col-md-10">
							<span :class="'label label-'+protocolSpace.getStatusStyle()">{{protocolSpace.getStatusName()}}</span>
						</div>
					</div>

				</div>
				<div class="form-group clearfix">
					<div class="row">
						<label class="col-md-2 control-label">更改状态</label>
						<div class="col-md-10">
							<NbBtnDropdown :name="reviewStatusMap['name']" size="sm" :color="reviewStatusMap['style']">
								<ul>
									<li v-for="(option, index) in protocolSpace.availableStatusList()">
										<a href="javascript:void(0)"
										   @click="reviewStatus = option.value">{{option.name}}</a>
									</li>
								</ul>
							</NbBtnDropdown>

							<div class="mt5">

								<span v-if="reviewStatus === Status.PROCESSING">
									<i class="fa fa-info-circle ml10"></i>
									履约中的合同可以创建付款信息单。
								</span>
								<span v-if="reviewStatus === Status.EXCEPTION">
									<i class="fa fa-info-circle ml10"></i>
									合同中止后状态不可再更改，并且不能再创建付款信息单，关联的场地会设置为空闲状态。
								</span>
								<span v-if="reviewStatus === Status.EXPIRE">
									<i class="fa fa-info-circle ml10"></i>
									合同到期后状态不可再更改。
								</span>
							</div>

						</div>
					</div>

				</div>


				<div v-if="reviewStatus === Status.PROCESSING">

					<div class="form-group clearfix">
						<div class="row">
							<div class="col-md-6">
								<div class="row mt10">
									<label class="col-md-4 control-label mt5">甲方代表人：</label>
									<div class="col-md-8">
										<input type="text" class="form-control" v-model="protocolSpace.partyARepresentative">
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="row mt10">
									<label class="col-md-4 control-label mt5 compulsory">甲方签署时间：</label>
									<div class="col-md-8">
										<el-date-picker
                      v-model="partyATime" type="date" placeholder="甲方签署时间">
										</el-date-picker>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="row mt10">
									<label class="col-md-4 control-label mt5 compulsory">乙方代表人：</label>
									<div class="col-md-8">
										<input type="text" class="form-control" v-model="protocolSpace.partyBRepresentative">
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="row mt10">
									<label class="col-md-4 control-label mt5 compulsory">乙方签署时间：</label>
									<div class="col-md-8">
										<el-date-picker
                      v-model="partyBTime" type="date" placeholder="乙方签署时间">
										</el-date-picker>
									</div>
								</div>
							</div>
						</div>

            <div class="row mt10">
							<label class="col-md-2 control-label compulsory">扫描件上传：</label>
							<div class="col-md-10 mt5">
								<NbTank :tank="protocolSpace.scanning"/>
							</div>
						</div>

					</div>


				</div>
				<div v-if="reviewStatus === Status.EXCEPTION">

					<div class="form-group clearfix">
						<div class="row">
							<label class="col-md-2 control-label">中止原因</label>
							<div class="col-md-10">
				<textarea class="form-control" rows="3" v-model="reviewReason"
				          placeholder="请填写中止原因……"></textarea>
							</div>
						</div>

					</div>

				</div>

				<div class="mt10" v-show="protocolSpace.errorMessage">
					<div class="alert alert-danger">
						{{protocolSpace.errorMessage}}
					</div>
				</div>

				<div class="text-right mt10">
					<SubmitButton :loading="protocolSpace.loading" :callback="submit"/>
				</div>

			</div>

		</NbSlidePanel>

	</div>

</template>


<script>
	import ProtocolSpace from  "../../../../../common/model/protocol/space/ProtocolSpace";
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
	import UserProfileLink from "../../../widget/UserProfileLink";
	import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue";
	import SubmitButton from "../../../widget/SubmitButton.vue";
	import {MessageBox, Notification as NotificationBox} from 'element-ui'
	import Tank from '../../../../../common/model/tank/Tank'
	import NbTank from '../../../../../common/widget/NbTank'
	import NbTanks from '../../../../../common/widget/NbTanks'
	export default{
		data(){
			return {
				reviewStatus: ProtocolSpace.prototype.Status.NEW,
				reviewReason: null,
				submitErrorMessage: null,
				Status: ProtocolSpace.prototype.Status,
				StatusMap: ProtocolSpace.prototype.StatusMap,
				FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user,
        partyBTime: new Date(),
        partyATime: new Date()
			}
		},
		computed: {
			reviewStatusMap(){
				return this.protocolSpace.getStatusItem(this.reviewStatus);
			}
		},

		props: {
			protocolSpace: {
				type: ProtocolSpace,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
			successCallback: {
				type: Function,
				required: false
			}

		},
		watch: {
			"protocolSpace.status"(newVal, oldVal){
				this.updateReviewStatus();
			},
			"protocolSpace.reason"(newVal, oldVal){
				this.reviewReason = newVal;
			},
			"reviewStatus"(newVal, oldVal){

			}
		},
		components: {
			NbSlidePanel,
			NbTank,
			NbTanks,
			NbBtnDropdown,
			UserProfileLink,
			SubmitButton
		},
		methods: {
			updateReviewStatus(){
				let protocolSpaceStatus = this.Status.NEW;
				if (this.protocolSpace) {
					protocolSpaceStatus = this.protocolSpace.status;
				}

				if (protocolSpaceStatus === this.Status.NEW) {
					this.reviewStatus = this.Status.PROCESSING;
				} else if (protocolSpaceStatus === this.Status.PROCESSING) {
					this.reviewStatus = this.Status.EXCEPTION;
				} else if (protocolSpaceStatus === this.Status.EXPIRE) {
					this.reviewStatus = this.Status.EXPIRE;
				} else {
					this.reviewStatus = protocolSpaceStatus;
				}
			},
			submit(){
				let that = this;

				if (this.reviewStatus === this.Status.EXCEPTION) {
					if (!this.reviewReason) {
						this.protocolSpace.errorMessage = "请填写理由";
						return;
					}
        } else {
          this.protocolSpace.partyATime = this.partyATime
          this.protocolSpace.partyBTime = this.partyBTime
        }
				this.protocolSpace.errorMessage = null;

				that.protocolSpace.httpStatus(this.reviewStatus, this.reviewReason, this.successCallback);
			}
		},
		mounted(){
			this.updateReviewStatus();
		}

	}


</script>
