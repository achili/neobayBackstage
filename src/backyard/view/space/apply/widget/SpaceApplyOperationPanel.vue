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
	                            :class="'label label-'+spaceApply.getStatusStyle()">{{spaceApply.getStatusName()}}</span>
						</div>
					</div>


					<div class="form-group clearfix">
						<label class="col-md-2 control-label">审核状态</label>

						<div class="col-md-10">

							<NbBtnDropdown :name="reviewStatusMap['name']" size="sm"
							               :color="reviewStatusMap['style']">
								<ul>
									<li v-for="(option, index) in spaceApply.availableStatusList()">
										<a href="javascript:void(0)" @click="reviewStatus = option.value">{{option.name}}</a>
									</li>
								</ul>
							</NbBtnDropdown>

						</div>
					</div>

					<div class="form-group clearfix"
					     v-show="reviewStatus === Status.REJECT">

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
            <CreateSaveButton saveText="提交" :entity="spaceApply" :callback="submit"/>
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
	import NbSlidePanel from '../../../../../common/widget/NbSlidePanel'
	import NbExpanding from  "../../../../../common/widget/NbExpanding.vue";
	import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue";
	import CreateSaveButton from "../../../widget/CreateSaveButton.vue"
	import SpaceApply from  "../../../../../common/model/space/SpaceApply"
	import NotificationControlPanel from  "../../../notification/widget/ControlPanel.vue";
	import Notification from  "../../../../../common/model/notification/Notification";
	import {Notification as NotificationBox} from 'element-ui';

	export default{
		data(){
			return {
				flipped: true,
				reviewStatus: SpaceApply.prototype.Status.NEW,
				currentReason: null,
				submitErrorMessage: null,
				Type: SpaceApply.prototype.Type,
				Status: SpaceApply.prototype.Status,
				spaceSeats: [],
				spaceRooms: [],
				notification: new Notification()
			}
		},
		computed: {
			reviewStatusMap(){
				return this.spaceApply.getStatusItem(this.reviewStatus);
			}
		},

		props: {
			spaceApply: {
				type: SpaceApply,
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
    watch: {},
		components: {
			NbSlidePanel,
			NbExpanding,
			NbBtnDropdown,
			CreateSaveButton,
			NotificationControlPanel
		},
		methods: {
			//自动装填审核状态。
			updateReviewStatus(){
				let spaceApplyStatus = this.Status.NEW;
				if (this.spaceApply) {
					spaceApplyStatus = this.spaceApply.status;
				}
				if (spaceApplyStatus === this.Status.REVIEWING) {
					this.reviewStatus = this.Status.PASS;
				} else if (spaceApplyStatus === this.Status.PASS) {
					this.reviewStatus = this.Status.PASS;
				} else if (spaceApplyStatus === this.Status.REJECT) {
					this.reviewStatus = this.Status.PASS;
				} else {
					this.reviewStatus = spaceApplyStatus;
				}
			},
			submit(){
				if (!this.reviewStatus) {
					this.submitErrorMessage = "Status必选";
					return;
				}
				if (this.reviewStatus === this.Status.REJECT) {
					if (!this.currentReason) {
						this.submitErrorMessage = "请填写驳回原因";
						return;
					}
				} else {
					this.currentReason = null;
				}
				this.submitErrorMessage = null;
				let that = this;
				let param = {
					id: this.spaceApply.id,
					status: this.reviewStatus,
					reason: this.currentReason
				};
				this.spaceApply.httpStatus(param, function (response) {
					NotificationBox.success({
						message: '修改状态成功！'
					});
					that.flipped = false;
					that.notification.render(response.data.notification);
					that.notification.entityId = that.spaceApply.id;
					if (typeof that.changeStatusSuccessCallback === "function") {
						that.changeStatusSuccessCallback(response);
					}
				});
			},
			notificationFinish(response){
				//通知成功发送的回掉函数。通知成功了之后，必须去更新该条事件。
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
