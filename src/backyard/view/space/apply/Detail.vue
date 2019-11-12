<template>
	<div class="animated fadeIn nursery-apply-detail">
		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="spaceApply.detailLoading">
					<div class="text-right mb10">
						<a title="编辑" class="btn btn-success"  v-if="spaceApply.canEdit()"
						   @click.stop.prevent="$router.push({path: 'edit', query: { id: spaceApply.id }})">
							<i class="fa fa-pencil"></i>
							编辑
						</a>
					</div>

					<div class="row">
						<div class="col-md-12">

							<NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-dot-circle-o"></i>
                  申请详情
                </span>
								<div slot="body">
									<SpaceApplyView :spaceApply="spaceApply"/>
								</div>


							</NbSlidePanel>
						</div>

						<div class="col-md-12"
						     ref="flowNode">
							<MessageNotifyView ref="messageNotifyView" :entity="spaceApply"/>
						</div>

						<div class="col-md-12" v-if="!spaceApply.archive  && user.hasPermissionSpace(FeatureType.SPACE_APPLY_MANAGE,spaceApply.spaceRegional.id)">
							<SpaceApplyOperationPanel :spaceApply="spaceApply"
							                          :changeStatusSuccessCallback="changeStatusSuccessCallback"
							                          :notificationSuccessCallback="notificationSuccessCallback"/>
						</div>

						<!--暂时先不要手动解封的面板-->
						<div class="col-md-12" v-if="false && user.hasPermissionSpace(FeatureType.SPACE_APPLY_MANAGE,spaceApply.spaceRegional.id)">
							<!--归档面板-->
							<ArchivePanel :entity="spaceApply" :successCallback="archiveSuccessCallback"/>
						</div>


					</div>

				</LoadingFrame>
			</div>
			<div class="col-md-12 text-right">
				<button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
					<i class="fa fa-arrow-left"></i>
					返回
				</button>
			</div>
		</div>

	</div>
</template>

<script>
	import SpaceApply from  "../../../../common/model/space/SpaceApply"
	import Pager from  "../../../../common/model/base/Pager";
	import Notification from  "../../../../common/model/notification/Notification";

	import {Notification as NotificationBox} from 'element-ui';
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel'
	import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
	import NbBtnDropdown from  "../../../../common/widget/NbBtnDropdown.vue";
	import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue";
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"
	import LoadingFrame from "../../widget/LoadingFrame";
	import UserProfileLink from "../../widget/UserProfileLink";
	import MessageNotifyView from "../../message/notify/MessageNotifyView";
	import ArchivePanel from "../../widget/ArchivePanel";
	import SpaceApplyOperationPanel from "./widget/SpaceApplyOperationPanel.vue";
	import SpaceApplyView from "./widget/SpaceApplyView.vue";
	import $ from "jquery";

	export default {

		data () {
			return {
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
				spaceApply: new SpaceApply(),
				protocolFlipped: true

			}
		},
		computed: {},
		components: {
			NbSlidePanel,
			NbExpanding,
			NbBtnDropdown,
			NotificationControlPanel,
			CreateSaveButton,
			LoadingFrame,
			UserProfileLink,
			MessageNotifyView,
			ArchivePanel,
			SpaceApplyOperationPanel,
			SpaceApplyView
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.spaceApply.id = this.$store.state.route.query.id;
				if (this.spaceApply.id) {
          this.spaceApply.httpDetail(function () {
            if (that.user.hasPermissionSpace(that.FeatureType.SPACE_APPLY_MANAGE,that.spaceApply.spaceRegional.id)) {
              that.spaceApply.httpReviewing();
            }
          });
				}
			},
			saveProtocol(){
				let that = this;

				this.spaceApply.httpProtocolEdit(function () {
					NotificationBox.success({
						message: '保存租赁协议信息成功！'
					});
					that.protocolFlipped = true;

				});
			},
			refreshEvent(){
				this.$refs.messageNotifyView.refresh();
			},

			changeStatusSuccessCallback(){
				this.refreshEvent();
			},
			notificationSuccessCallback(){
				this.refreshEvent();
			},
			archiveSuccessCallback(){
				this.refreshEvent();
			}

		},
		mounted(){
			this.fetchDetail();

			this.refreshEvent();

		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.nursery-apply-detail {

	}

</style>
