<template>
	<div class="animated fadeIn">

		<div class="row">
      <div class="col-md-12">
				<LoadingFrame :loading="protocolSpace.detailLoading">
					<div class="text-right mb10">
						<a v-if="protocolSpace.canEdit()" title="编辑" class="btn btn-success"
						   @click.stop.prevent="$router.push('/by/protocol/space/edit/' + protocolSpace.id)">
							<i class="fa fa-pencil"></i>
							编辑
						</a>
					</div>

					<div class="row">
						<!--详情展示-->
            <div class="col-md-12">
							<ProtocolSpaceView :protocolSpace="protocolSpace"/>
						</div>

            <!--发票领取信息-->
            <div class="col-md-12" v-if="protocolSpace.name">
              <ProtocolSpaceInvoiceCollection :protocolSpace="protocolSpace"></ProtocolSpaceInvoiceCollection>
            </div>

						<!--大事记录-->
						<div class="col-md-12">
							<div ref="flowNode">
								<MessageNotifyView ref="messageNotifyView" :entity="protocolSpace"/>
							</div>
						</div>

						<!--操作面板-->
            <div class="col-md-12"
                 v-if="protocolSpace.name && !protocolSpace.archive && user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,protocolSpace.spaceRegional.id)">
							<ProtocolSpaceOperationPanel :protocolSpace="protocolSpace"
							                             :successCallback="operationSuccessCallback"/>
						</div>

            <!--上传附件-->
            <div class="col-md-12">
              <UploadAttachments :protocolSpace="protocolSpace" :successCallback="uploadSuccessCallback"/>
            </div>



            <!--pdf预览-->
            <div class="col-md-12" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,protocolSpace.spaceRegional.id)">
							<ProtocolSpaceInfoPdfPreview :protocolSpace="protocolSpace"/>
						</div>
						<div class="col-md-12"
						     v-if="protocolSpace.status !== protocolSpace.Status.PROCESSING && user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,protocolSpace.spaceRegional.id)">
							<ArchivePanel :entity="protocolSpace" :successCallback="archiveSuccessCallback"/>
						</div>
					</div>

				</LoadingFrame>
			</div>
		</div>

	</div>
</template>
<script>
	import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import ProtocolSpaceInvoiceCollection from "./widget/ProtocolSpaceInvoiceCollection";
	import LoadingFrame from "../../widget/LoadingFrame";
	import ProtocolSpaceView from "./widget/ProtocolSpaceView";
	import ProtocolSpace from  "../../../../common/model/protocol/space/ProtocolSpace"
	import ProtocolSpaceInfoPdfPreview from  "./widget/ProtocolSpaceInfoPdfPreview.vue";
	import ProtocolSpaceOperationPanel from "./widget/ProtocolSpaceOperationPanel";
	import MessageNotifyView from "../../message/notify/MessageNotifyView";
	import ArchivePanel from "../../widget/ArchivePanel";
  import UploadAttachments from "./widget/UploadAttachments.vue";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				protocolSpace: new ProtocolSpace(),
				FeatureType: this.$store.state.FeatureType
			}
		},
		computed: {},
		components: {
			LoadingFrame,
			ProtocolSpaceView,
			ProtocolSpaceInfoPdfPreview,
			ProtocolSpaceOperationPanel,
			MessageNotifyView,
      ArchivePanel,
      UploadAttachments,
      ProtocolSpaceInvoiceCollection
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.protocolSpace.id = this.$store.state.route.params.id;
				if (this.protocolSpace.id) {
          this.protocolSpace.httpDetail(function () {
            that.protocolSpace.currentAttachments = [].concat(that.protocolSpace.attachments);
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
      uploadSuccessCallback() {
        let that = this;
        NotificationBox.success({
          message: '附件修改成功！'
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
