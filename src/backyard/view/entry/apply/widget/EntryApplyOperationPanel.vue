<template>


	<div>

		<NbExpanding>
			<NbSlidePanel type="info" v-show="flipped">
				<span slot="heading" class="f16">
					<i class="fa fa-cogs"></i>
						操作面板
				</span>
				<span slot="actions">
									<i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
								</span>

				<div slot="body">


					<div class="form-group clearfix">
						<label class="col-md-2 control-label">当前状态</label>

						<div class="col-md-10">
													<span
														:class="'label label-'+entryApply.getStatusStyle()">{{entryApply.getStatusName()}}</span>
						</div>
					</div>


					<div class="form-group clearfix">
						<label class="col-md-2 control-label">审核状态</label>

						<div class="col-md-10">

							<NbBtnDropdown :name="reviewStatusItem['name']" size="sm"
							               :color="reviewStatusItem['style']">
								<ul>
									<li v-for="(option, index) in entryApply.availableStatusList()">
										<a href="javascript:void(0)" @click="reviewStatus = option.value">{{option.name}}</a>
									</li>
								</ul>
							</NbBtnDropdown>

						</div>
					</div>

					<div class="form-group clearfix"
					     v-show="reviewStatus === 'FIRST_REVIEW_REJECT' || reviewStatus === 'FINAL_REVIEW_REJECT'">

						<label class="col-md-2 control-label">驳回理由</label>

						<div class="col-md-10">

							<textarea class="form-control" rows="3" v-model="reviewReason"
							          placeholder="请填写驳回理由……"></textarea>

						</div>
					</div>

					<div class="form-group clearfix" v-if="reviewStatus === 'FIRST_REVIEW_PASS'">
						<label class="col-md-2 control-label">入驻批次</label>

						<div class="col-md-10">
							<EntryBatchPagerSelection :activeEntryBatch="entryApply.entryBatch"
							                          :initFilter="{'status':'PROCESSING'}"/>
						</div>
					</div>

					<div class="form-group mt10" v-show="submitErrorMessage">
						<div class="alert alert-danger">
							{{submitErrorMessage}}


						</div>
					</div>

					<div class="form-group text-right mt10">

						<CreateSaveButton :entity="entryApply" :callback="submit"/>

					</div>


				</div>

			</NbSlidePanel>

		</NbExpanding>
		<NbExpanding>

			<NbSlidePanel type="primary" v-show="!flipped">
					<span slot="heading" class="f16">
						<i class="fa fa-cogs"></i>
							评审通知
					</span>
				<span slot="actions">
						<i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					</span>
				<div slot="body">

					<NotificationControlPanel :notification="notification" :successCallback="notificationFinish"/>
				</div>


			</NbSlidePanel>


		</NbExpanding>

	</div>

</template>


<script>
	import EntryApply from  "../../../../../common/model/entry/apply/EntryApply";
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
	import UserProfileLink from "../../../widget/UserProfileLink";
	import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue";
	import CreateSaveButton from "../../../widget/CreateSaveButton.vue";
	import {Notification as NotificationBox} from 'element-ui';
	import EntryBatchPagerSelection from  "../../batch/Selection.vue";
	import Notification from  "../../../../../common/model/notification/Notification";
	import NotificationControlPanel from  "../../../notification/widget/ControlPanel.vue";
	import NotificationStatusReport from  "../../../notification/widget/StatusReport.vue";
	import NbExpanding from  "../../../../../common/widget/NbExpanding.vue";

	export default{
		data(){
			return {
				reviewStatus: null,
				reviewReason: null,
				submitErrorMessage: null,
				Status: EntryApply.prototype.Status,
				StatusMap: EntryApply.prototype.StatusMap,
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user,
				flipped: true,
				notification: new Notification()
			}
		},
		computed: {
			reviewStatusItem(){
				return this.entryApply.getStatusItem(this.reviewStatus);
			}
		},

		props: {
			entryApply: {
				type: EntryApply,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
			changeStatusSuccessCallback: {
				type: Function,
				required: false
			},
			notificationSuccessCallback: {
				type: Function,
				required: false
			}


		},
		watch: {
			"entryApply.status"(newVal, oldVal){
				this.updateReviewStatus();
			},
			"entryApply.reason"(newVal, oldVal){
				this.reviewReason = newVal;
			}

		},
		components: {
			NbSlidePanel,
			NbBtnDropdown,
			UserProfileLink,
			CreateSaveButton,
			EntryBatchPagerSelection,
			NotificationControlPanel,
			NotificationStatusReport,
			NbExpanding
		},
		methods: {
			//自动装填审核状态。
			updateReviewStatus(){
				let entryApplyStatus = this.Status.NEW;
				if (this.entryApply) {
					entryApplyStatus = this.entryApply.status;
				}
				if (entryApplyStatus === this.Status.REVIEWING) {
					this.reviewStatus = this.Status.FIRST_REVIEW_PASS;
				} else if (entryApplyStatus === this.Status.FIRST_REVIEW_PASS) {
					this.reviewStatus = this.Status.FINAL_REVIEW_PASS;
				} else if (entryApplyStatus === this.Status.FIRST_REVIEW_REJECT) {
					this.reviewStatus = this.Status.FIRST_REVIEW_PASS;
				} else if (entryApplyStatus === this.Status.FINAL_REVIEW_REJECT) {
					this.reviewStatus = this.Status.FINAL_REVIEW_PASS;
				} else {
					this.reviewStatus = entryApplyStatus;
				}
			},
			submit(){
				let that = this;
				let form = {
					"id": that.entryApply.id,
					"status": that.reviewStatus
				};
				if (that.reviewStatus === that.entryApply.status) {
					that.submitErrorMessage = "请选择不同的状态";
					return;
				}
				if (!that.entryApply.id) {
					that.submitErrorMessage = "入住申请不存在";
					return;
				}
				if (!that.reviewStatus) {
					that.submitErrorMessage = "Status必选";
					return;
				}
				if (that.reviewStatus === this.Status.FIRST_REVIEW_PASS) {
					if (!that.entryApply.entryBatch.id) {
						that.submitErrorMessage = "请选择入驻批次";
						return;
					}
					form.entryBatchId = that.entryApply.entryBatch.id;
				} else if (that.reviewStatus === this.Status.FIRST_REVIEW_REJECT || that.reviewStatus === this.Status.FINAL_REVIEW_REJECT) {
					if (!that.reviewReason) {
						that.submitErrorMessage = "请填写驳回原因";
						return;
					}
					form.reason = that.reviewReason;
				}
				that.submitErrorMessage = null;

				this.entryApply.httpStatus(form, function (response) {
					NotificationBox.success({
						message: '修改状态成功！'
					});


					that.flipped = false;
					that.notification.render(response.data.notification);
					that.notification.entityId = that.entryApply.id;

					if (typeof that.changeStatusSuccessCallback === "function") {
						that.changeStatusSuccessCallback(response);
					}

				});
			},
			notificationFinish(response){
				let that = this;

				that.flipped = !that.flipped;

				if (typeof that.notificationSuccessCallback === "function") {
					that.notificationSuccessCallback(response);
				}

			}
		},
		mounted(){
			this.updateReviewStatus();
		}

	}


</script>
