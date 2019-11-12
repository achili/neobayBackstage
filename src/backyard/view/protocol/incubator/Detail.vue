<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="protocolIncubator.detailLoading">

					<div class="text-right mb10" v-if="protocolIncubator.canEdit()">
						<a title="编辑" class="btn btn-success"
						   @click.stop.prevent="$router.push('/by/protocol/incubator/edit/' + protocolIncubator.id)">
							<i class="fa fa-pencil"></i>
							编辑
						</a>
					</div>


					<div class="row">
						<!--详情展示-->
						<div class="col-md-12">
							<ProtocolIncubatorView :protocolIncubator="protocolIncubator"/>
						</div>

						<!--大事记录-->
						<div class="col-md-12">
							<div ref="flowNode">
								<MessageNotifyView ref="messageNotifyView" :entity="protocolIncubator"/>
							</div>
						</div>

						<!--操作面板-->
						<div class="col-xs-12"
						     v-if="protocolIncubator.name &&
						      !protocolIncubator.archive &&
						       user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,protocolIncubator.spaceRegional.id) &&
								protocolIncubator.status!=protocolIncubator.Status.EXPIRE
">
							<ProtocolIncubatorOperationPanel :protocolIncubator="protocolIncubator"
							                                 :successCallback="operationSuccessCallback"/>
						</div>

            <!--上传附件-->
            <div class="col-xs-12">
              <UploadAttachments :protocolIncubator="protocolIncubator" :successCallback="uploadSuccessCallback"/>
            </div>

            <!--pdf预览-->
						<div class="col-md-12" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,protocolIncubator.spaceRegional.id)">

							<ProtocolIncubatorInfoPdfPreview :protocolIncubator="protocolIncubator"/>

						</div>

						<!--归档面板-->
						<div class="col-md-12" v-if="protocolIncubator.status !== protocolIncubator.Status.PROCESSING &&
						       user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,protocolIncubator.spaceRegional.id)">
							<ArchivePanel :entity="protocolIncubator" :successCallback="archiveSuccessCallback"/>
						</div>
					</div>

				</LoadingFrame>
			</div>
		</div>

	</div>
</template>
<script>
	import {MessageBox, Notification as NotificationBox} from 'element-ui'
	import ProtocolIncubator from  "../../../../common/model/protocol/incubator/ProtocolIncubator"
	import Notification from  "../../../../common/model/notification/Notification"
	import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue"
	import ProtocolIncubatorInfoPdfPreview from  "./widget/ProtocolIncubatorInfoPdfPreview.vue";
	import LoadingFrame from "../../widget/LoadingFrame";
	import ProtocolIncubatorView from "./widget/ProtocolIncubatorView";
	import ProtocolIncubatorOperationPanel from "./widget/ProtocolIncubatorOperationPanel";
	import MessageNotifyView from "../../message/notify/MessageNotifyView";
	import ArchivePanel from "../../widget/ArchivePanel";
  import UploadAttachments from "./widget/UploadAttachments.vue";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				protocolIncubator: new ProtocolIncubator(),
				notification: new Notification(),
				FeatureType: this.$store.state.FeatureType
			}
		},
		computed: {},
		components: {
			NotificationControlPanel,
			ProtocolIncubatorInfoPdfPreview,
			LoadingFrame,
			ProtocolIncubatorView,
			ProtocolIncubatorOperationPanel,
			MessageNotifyView,
      ArchivePanel,
      UploadAttachments
		},
		methods: {
      uploadSuccessCallback() {
        let that = this;
        NotificationBox.success({
          message: '附件修改成功！'
        });
        that.refreshEvent();
      },
			fetchDetail(){
				let that = this;
				this.protocolIncubator.id = this.$store.state.route.params.id;
				if (this.protocolIncubator.id) {
          this.protocolIncubator.httpDetail(function () {
            that.protocolIncubator.currentAttachments = [].concat(that.protocolIncubator.attachments);
          });
				}
			},
			refreshEvent(){
				this.$refs.messageNotifyView.refresh();
			},
			operationSuccessCallback(response){
				let that = this;

				NotificationBox.success({
					message: '修改状态成功！'
				});

				that.refreshEvent();

			},
			archiveSuccessCallback(response){
				let that = this;
				NotificationBox.success({
					message: '修改成功！'
				});
				that.refreshEvent();

			}
		},
		mounted(){
			this.fetchDetail();
			this.refreshEvent();
		}
	}
</script>
