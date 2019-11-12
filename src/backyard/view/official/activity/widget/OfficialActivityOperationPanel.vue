<template>
	<div>
		<NbSlidePanel type="info">
			<span slot="heading" class="f16">
				<i class="fa fa-cogs"></i>
					操作面板
			</span>

			<div slot="body">

				<div class="form-group clearfix">

					<label class="col-md-2 control-label">当前状态</label>

					<div class="col-md-10">
						<span :class="'label label-'+officialActivity.getStatusStyle()">{{officialActivity.getStatusName()}}</span>
					</div>

				</div>

				<div class="form-group clearfix">
					<label class="col-md-2 control-label">修改状态</label>

					<div class="col-md-10">

						<NbBtnDropdown :name="reviewStatusItem['name']" size="sm"
						               :color="reviewStatusItem['style']">
							<ul>
								<li v-for="(option, index) in StatusList">
									<a href="javascript:void(0)" @click="reviewStatus = option.value">{{option.name}}</a>
								</li>
							</ul>
						</NbBtnDropdown>

					</div>
				</div>

				<div class="form-group mt10" v-show="submitErrorMessage">
					<div class="alert alert-danger">
						{{submitErrorMessage}}
					</div>
				</div>

				<div class="form-group text-right mt10">

					<CreateSaveButton :entity="officialActivity" :callback="submit"/>

				</div>


			</div>

		</NbSlidePanel>

	</div>

</template>


<script>
	import OfficialActivity from  "../../../../../common/model/official/OfficialActivity";
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
	import UserProfileLink from "../../../widget/UserProfileLink";
	import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue";
	import CreateSaveButton from "../../../widget/CreateSaveButton.vue";
	import {Notification as NotificationBox} from 'element-ui';
	import Notification from  "../../../../../common/model/notification/Notification";

	export default{
		data(){
			return {

				submitErrorMessage: null,
				Status: OfficialActivity.prototype.Status,
				StatusMap: OfficialActivity.prototype.StatusMap,
				StatusList: OfficialActivity.prototype.StatusList,
				FeatureType: this.$store.state.FeatureType,
				reviewStatus: OfficialActivity.prototype.Status.NEW,
				user: this.$store.state.user
			}
		},
		computed: {
			reviewStatusItem(){
				return this.officialActivity.getStatusItem(this.reviewStatus);
			}
		},

		props: {
			officialActivity: {
				type: OfficialActivity,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
			changeStatusSuccessCallback: {
				type: Function,
				required: false
			}
		},
		watch: {
			"officialActivity.status"(newVal, oldVal){
				this.updateReviewStatus();
			}
		},
		components: {
			NbSlidePanel,
			NbBtnDropdown,
			UserProfileLink,
			CreateSaveButton
		},
		methods: {
			//自动装填审核状态。
			updateReviewStatus(){
				let officialActivityStatus = this.Status.NEW;
				if (this.officialActivity) {
					officialActivityStatus = this.officialActivity.status;
				}
			},
			submit(){
				let that = this;
				let form = {
					"id": that.officialActivity.id,
					"status": that.reviewStatus
				};
				if (!that.reviewStatus) {
					that.submitErrorMessage = "Status必选";
					return;
				}
				if (that.reviewStatus === that.officialActivity.status) {
					that.submitErrorMessage = "请选择不同的状态";
					return;
				}

				that.submitErrorMessage = null;

				this.officialActivity.httpStatus(form, function (response) {
					NotificationBox.success({
						message: '修改状态成功！'
					});

					if (typeof that.changeStatusSuccessCallback === "function") {
						that.changeStatusSuccessCallback(response);
					}
				});
			}
		},
		mounted(){
			this.updateReviewStatus();
		}

	}


</script>
