<template>
	<div class="row entry-apply-detail">

		<div class="col-md-12">

			<LoadingFrame :loading="entryApply.detailLoading">

				<div class="text-right">
					<a title="编辑" class="btn btn-success mb10"
					   @click.stop.prevent="$router.push({ path: 'edit', query: { id: entryApply.id } })"
					   v-if="entryApply.canEdit()">
						<i class="fa fa-pencil"></i>

						<!--用户初审被拒绝-->
						<span
							v-if="!user.hasPermissionSpace(FeatureType.ENTRY_APPLY_MANAGE,entryApply.spaceRegional.id) && entryApply.status === entryApply.Status.FIRST_REVIEW_REJECT">
							编辑并重新提交
						</span>
						<span v-else>
							编辑
						</span>
					</a>

				</div>


				<EntryApplyView :entryApply="entryApply"/>


				<div ref="flowNode" v-show="entryApply.type != 'CUMT'">
					<MessageNotifyView ref="messageNotifyView" :entity="entryApply"/>
				</div>


				<div v-if="!entryApply.archive  && user.hasPermissionSpace(FeatureType.ENTRY_APPLY_MANAGE,entryApply.spaceRegional.id)">

					<EntryApplyOperationPanel :entryApply="entryApply"
					                          :changeStatusSuccessCallback="changeStatusSuccessCallback"
					                          :notificationSuccessCallback="notificationSuccessCallback"
					/>

				</div>

        <!--预分配社区经理模块-->
        <div v-if="!entryApply.archive  && user.hasPermissionSpace(FeatureType.ENTRY_APPLY_DISTRIBUTION,entryApply.spaceRegional.id)">
          <EntryApplyDistribution :entryApply="entryApply" :presetMentorSuccessCallback="presetMentorSuccessCallback"/>
        </div>

				<!--PDF预览模块-->
				<div v-show="entryApply.type != 'CUMT'">
					<EntryApplyInfoPdfPreview :entryApply="entryApply"/>
				</div>

				<!--归档和解封面板-->
				<div v-if="false && user.hasPermissionSpace(FeatureType.ENTRY_APPLY_MANAGE,entryApply.spaceRegional.id)">
					<ArchivePanel :entity="entryApply" :successCallback="archiveSuccessCallback"/>
				</div>


			</LoadingFrame>

		</div>

		<div class="col-md-12 text-right">
			<button class="btn btn-success" @click.stop.prevent="$router.go(-1)">
				<i class="fa fa-arrow-left"></i>
				返回
			</button>
		</div>

	</div>
</template>

<script>
	import Pager from  "../../../../common/model/base/Pager";
	import EntryApply from  "../../../../common/model/entry/apply/EntryApply";

	import MessageNotify from  "../../../../common/model/message/notify/MessageNotify";
	import EntryBatch from  "../../../../common/model/entry/batch/EntryBatch";
	import EntryApplyView from  "./widget/EntryApplyView";
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";

	import EntryApplyInfoPdfPreview from  "./widget/EntryApplyInfoPdfPreview.vue";
	import LoadingFrame from "../../widget/LoadingFrame";
	import $ from "jquery";
	import MessageNotifyView from "../../message/notify/MessageNotifyView";
	import EntryApplyOperationPanel from "./widget/EntryApplyOperationPanel";
	import ArchivePanel from "../../widget/ArchivePanel";

	import {Notification as NotificationBox} from 'element-ui'
	import {smoothScroll} from "../../../../common/util/AnimationUtils";

  import EntryApplyDistribution from  "./widget/EntryApplyDistribution";

	export default {
		data () {
			return {
				user: this.$store.state.user,
				entryApply: new EntryApply(),
				Status: EntryApply.prototype.Status,
				StatusMap: EntryApply.prototype.StatusMap,
				messageNotifyPager: new Pager(MessageNotify, 20),
				FeatureType: this.$store.state.FeatureType
			}
		},
		computed: {},
		components: {
			EntryApplyView,
			NbSlidePanel,
			EntryApplyInfoPdfPreview,
			LoadingFrame,
			MessageNotifyView,
			EntryApplyOperationPanel,
			ArchivePanel,
      EntryApplyDistribution
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.entryApply.id = this.$store.state.route.query.id;
				if (this.entryApply.id) {
          this.entryApply.httpDetail(function (res) {
            if (that.user.hasPermissionSpace(that.FeatureType.ENTRY_APPLY_MANAGE,that.entryApply.spaceRegional.id)) {
              that.entryApply.httpReviewing();
            }
          });
				}
			},
			refreshEvent(){
				this.$refs.messageNotifyView.refresh();
			},
			changeStatusSuccessCallback(response){
				let that = this;

				that.refreshEvent();
			},
			archiveSuccessCallback(response){
				let that = this;

				that.refreshEvent();
			},
			notificationSuccessCallback(){
				//通知成功发送的回掉函数。通知成功了之后，必须去更新该条事件。
				let that = this;

				smoothScroll(this.$refs.flowNode);
				that.refreshEvent();

			},
      presetMentorSuccessCallback(){
        //分配项目经理回掉函数。
        let that = this;
        smoothScroll(this.$refs.flowNode);
        that.refreshEvent();
      }
		},

		mounted(){
			this.fetchDetail();
			this.refreshEvent();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.entry-apply-detail {

		margin-bottom: 100px;

	}

</style>











