<template>

	<div>

		<NbSlidePanel type="info" v-if="protocolIncubator.status === Status.NEW ||
			protocolIncubator.status === Status.PROCESSING ||
			protocolIncubator.status === Status.EXPIRE ||
			protocolIncubator.status === Status.EXCEPTION
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
							<span
								:class="'label label-'+protocolIncubator.getStatusStyle()">{{protocolIncubator.getStatusName()}}</span>
						</div>
					</div>

				</div>
				<div class="form-group clearfix">
					<div class="row">
						<label class="col-md-2 control-label">更改状态</label>
						<div class="col-md-10">
							<NbBtnDropdown :name="reviewStatusMap['name']" size="sm" :color="reviewStatusMap['style']">
								<ul>
									<li v-for="(option, index) in protocolIncubator.availableStatusList()">
										<a href="javascript:void(0)"
										   @click="reviewStatus = option.value">{{option.name}}</a>
									</li>
								</ul>
							</NbBtnDropdown>

							<div class="mt5">

								<span v-if="reviewStatus === Status.PROCESSING">
									<i class="fa fa-info-circle ml10"></i>
									履约中的孵化协议表明项目正在孵化中。
								</span>
								<span v-if="reviewStatus === Status.EXCEPTION">
									<i class="fa fa-info-circle ml10"></i>
									孵化协议中止后状态不可再更改，表明项目已经退出孵化。
								</span>
								<span v-if="reviewStatus === Status.ARCHIVE">
									<i class="fa fa-info-circle ml10"></i>
									孵化协议归档后状态不可再更改。
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
										<input type="text" class="form-control" v-model="protocolIncubator.partyARepresentative">
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="row mt10">
									<label class="col-md-4 control-label mt5">甲方签署时间：</label>
									<div class="col-md-8">
										<el-date-picker
                      v-model="partyATime" type="datetime" placeholder="甲方签署时间">
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
										<input type="text" class="form-control" v-model="protocolIncubator.partyBRepresentative">
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="row mt10">
									<label class="col-md-4 control-label mt5">乙方签署时间：</label>
									<div class="col-md-8">
										<el-date-picker
                      v-model="partyBTime" type="datetime" placeholder="乙方签署时间">
										</el-date-picker>
									</div>
								</div>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">扫描件上传：</label>
							<div class="col-md-10 mt5">
								<NbTank :tank="protocolIncubator.scanning"/>
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

				<div class="mt10" v-show="protocolIncubator.errorMessage">
					<div class="alert alert-danger">
						{{protocolIncubator.errorMessage}}
					</div>
				</div>

				<div class="text-right mt10">
					<SubmitButton :loading="protocolIncubator.loading" :callback="submit"/>
				</div>

			</div>

		</NbSlidePanel>

	</div>

</template>


<script>
	import ProtocolIncubator from  "../../../../../common/model/protocol/incubator/ProtocolIncubator";
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
				reviewStatus: ProtocolIncubator.prototype.Status.NEW,
				reviewReason: null,
				submitErrorMessage: null,
				Status: ProtocolIncubator.prototype.Status,
				StatusMap: ProtocolIncubator.prototype.StatusMap,
				FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user,
        partyATime: new Date(),
        partyBTime: new Date()
			}
		},
		computed: {
			reviewStatusMap(){
				return this.protocolIncubator.getStatusItem(this.reviewStatus);
			}
		},
		props: {
			protocolIncubator: {
				type: ProtocolIncubator,
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
			"protocolIncubator.status"(newVal, oldVal){
				this.updateReviewStatus();
			},
			"protocolIncubator.reason"(newVal, oldVal){
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
				let protocolIncubatorStatus = this.Status.NEW;
				if (this.protocolIncubator) {
					protocolIncubatorStatus = this.protocolIncubator.status;
				}
				if (protocolIncubatorStatus === this.Status.NEW) {
					this.reviewStatus = this.Status.PROCESSING;
				} else if (protocolIncubatorStatus === this.Status.PROCESSING) {
					this.reviewStatus = this.Status.EXCEPTION;
				} else if (protocolIncubatorStatus === this.Status.EXPIRE) {
					this.reviewStatus = this.Status.EXPIRE;
				} else {
					this.reviewStatus = protocolIncubatorStatus;
				}
			},
			submit(){
				let that = this;
        this.protocolIncubator.errorMessage = null
				if (this.reviewStatus === this.Status.EXCEPTION) {
					if (!this.reviewReason) {
						this.protocolIncubator.errorMessage = "请填写理由";
						return;
					}
        } else {
          this.protocolIncubator.partyATime = this.partyATime
          this.protocolIncubator.partyBTime = this.partyBTime
        }


				that.protocolIncubator.httpStatus(this.reviewStatus, this.reviewReason, this.successCallback);
			}
		},
		mounted(){
			this.updateReviewStatus();

    }

	}


</script>
