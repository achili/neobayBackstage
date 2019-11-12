<template>

	<div>

		<div class="form-group clearfix">
			<label class="col-md-2 control-label">当前状态</label>
			<div class="col-md-10">
				<span :class="'label label-'+keeperBusiness.getStatusStyle()">
					{{keeperBusiness.getStatusName()}}
				</span>
			</div>
		</div>

		<div class="form-group clearfix">
			<label class="col-md-2 control-label">审核状态</label>
			<div class="col-md-10">
				<NbBtnDropdown :name="reviewStatusMap['name']" size="sm"
				               :color="reviewStatusMap['style']">
					<ul>
						<li v-for="(option, index) in keeperBusiness.availableStatusList()">
							<a href="javascript:void(0)" @click="reviewStatus = option.value">{{option.name}}</a>
						</li>
					</ul>
				</NbBtnDropdown>
			</div>
		</div>

		<div class="form-group clearfix" v-show="reviewStatus === 'REJECT'">
			<label class="col-md-2 control-label">驳回理由</label>
			<div class="col-md-10">
				<textarea class="form-control" rows="3" v-model="currentReason"
				          placeholder="请填写驳回理由……"></textarea>
			</div>
		</div>

		<div class="form-group mt10" v-show="submitErrorMessage">
			<div class="alert alert-danger">
				{{submitErrorMessage}}
			</div>
		</div>

		<div class="form-group text-right mt10">
			<div class="col-md-12">

				<SubmitButton :loading="keeperBusiness.loading" :callback="submit"/>
			</div>
		</div>

	</div>

</template>


<script>
	import KeeperBusiness from  "../../../../../common/model/keeper/business/KeeperBusiness";
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
	import UserProfileLink from "../../../widget/UserProfileLink";
	import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue";
	import SubmitButton from "../../../widget/SubmitButton.vue";
	import {Notification as NotificationBox} from 'element-ui';
	export default{
		data(){
			return {
				reviewStatus: null,
				currentReason: null,
				submitErrorMessage: null,
				Status: KeeperBusiness.prototype.Status,
				StatusMap: KeeperBusiness.prototype.StatusMap,
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		computed: {
			reviewStatusMap(){
				return this.keeperBusiness.getStatusItem(this.reviewStatus);
			}
		},

		props: {
			keeperBusiness: {
				type: KeeperBusiness,
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
			"keeperBusiness.status"(newVal, oldVal){
				this.updateReviewStatus();
			},
			"keeperBusiness.reason"(newVal, oldVal){
				this.reviewReason = newVal;
			}

		},
		components: {
			NbSlidePanel,
			NbBtnDropdown,
			UserProfileLink,
			SubmitButton
		},
		methods: {

			//自动装填审核状态。
			updateReviewStatus(){
				let keeperBusinessStatus = this.Status.NEW;
				if (this.keeperBusiness) {
					keeperBusinessStatus = this.keeperBusiness.status;
				}
				if (keeperBusinessStatus === this.Status.NEW) {
					this.reviewStatus = this.Status.PASS;
				} else if (keeperBusinessStatus === this.Status.REJECT) {
					this.reviewStatus = this.Status.PASS;
				} else {
					this.reviewStatus = keeperBusinessStatus;
				}
			},

			submit(){
				if (this.reviewStatus === this.keeperBusiness.status) {
					this.submitErrorMessage = "请选择不同的状态";
					return;
				}
				if (!this.keeperBusiness.id) {
					this.submitErrorMessage = "入住申请不存在";
					return;
				}
				if (!this.reviewStatus) {
					this.submitErrorMessage = "Status必选";
					return;
				}
				if (this.reviewStatus === this.Status.REJECT) {
					if (!this.currentReason) {
						this.submitErrorMessage = "请填写驳回原因";
						return;
					}
				}
				this.submitErrorMessage = null;
				let that = this;
				let form = {
					"id": this.keeperBusiness.id,
					"status": this.reviewStatus,
					"reason": null
				};
				if (this.reviewStatus === this.Status.REJECT) {
					form.reason = this.currentReason;
				}

				this.keeperBusiness.httpStatus(form, this.successCallback);
			}
		},
		mounted(){
			this.updateReviewStatus();
		}

	}


</script>
