<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="financePayInfo.detailLoading">
					<div class="text-right mb10">
						<a title="编辑" class="btn btn-success" v-if="user.hasPermissionSpace(FeatureType.FINANCE_PAY_INFO_MANAGE,financePayInfo.spaceRegional.id)"
						   @click.stop.prevent="$router.push('/by/finance/pay/info/edit/' + financePayInfo.id)">
							<i class="fa fa-pencil"></i>
							编辑
						</a>
					</div>

					<div class="row">

						<div class="col-md-12">

							<FinancePayInfoView :financePayInfo="financePayInfo"/>

						</div>

						<div class="col-md-12">

							<FinancePayInfoPdfPreview :financePayInfo="financePayInfo"/>

						</div>

						<!--大事记录-->
						<div class="col-md-12">
							<div ref="flowNode">
								<MessageNotifyView ref="messageNotifyView" :entity="financePayInfo"/>
							</div>
						</div>

						<div class="col-md-12"
						     v-if="user.hasPermissionSpace(FeatureType.FINANCE_PAY_INFO_MANAGE,financePayInfo.spaceRegional.id)">
							<FinancePayInfoOperationPanel :financePayInfo="financePayInfo"
							                              :sendNotifySuccessCallback="sendNotifySuccessCallback"
							                              :sendReminderSuccessCallback="sendReminderSuccessCallback"
							                              :sendReceiptSuccessCallback="sendReceiptSuccessCallback"
                                            :archiveFinishCallback="archiveFinishCallback"
                                            :sendInvoiceSuccessCallback="sendInvoiceSuccessCallback"/>
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
	import {MessageBox, Notification as NotificationBox} from 'element-ui'

	import Pager from  "../../../../common/model/base/Pager"
	import FinancePayInfo from  "../../../../common/model/finance/FinancePayInfo"

	import FinancePayInfoView from "./widget/FinancePayInfoView.vue";
	import FinancePayInfoPdfPreview from "./widget/FinancePayInfoPdfPreview.vue";
	import UserProfileLink from "../../widget/UserProfileLink";
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"
	import LoadingFrame from "../../widget/LoadingFrame";

	import MessageNotifyView from "../../message/notify/MessageNotifyView";
	import FinancePayInfoOperationPanel from "./widget/FinancePayInfoOperationPanel";


	import $ from "jquery";
	import {smoothScroll} from "../../../../common/util/AnimationUtils";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
				financePayInfo: new FinancePayInfo()
			}
		},
		computed: {},
		components: {
			FinancePayInfoView,
			FinancePayInfoPdfPreview,
			UserProfileLink,
			CreateSaveButton,
			LoadingFrame,
			MessageNotifyView,
			FinancePayInfoOperationPanel
		},
		methods: {
			refreshEvent(){
				this.$refs.messageNotifyView.refresh();
			},
			sendNotifySuccessCallback(){
				this.refreshEvent();
				smoothScroll(this.$refs.flowNode);
			},
			sendReminderSuccessCallback(){
				this.refreshEvent();
				smoothScroll(this.$refs.flowNode);
			},
			sendReceiptSuccessCallback(){
				this.refresh();
				this.refreshEvent();
				smoothScroll(this.$refs.flowNode);
			},
      archiveFinishCallback() {
        this.refreshEvent();
        smoothScroll(this.$refs.flowNode);
      },
      sendInvoiceSuccessCallback(){
        this.refreshEvent();
        smoothScroll(this.$refs.flowNode);
      },
			refresh(){

				this.fetchDetail();

			},
			fetchDetail(){
				let that = this;
				this.financePayInfo.id = this.$store.state.route.params.id;
				if (this.financePayInfo.id) {
					this.financePayInfo.httpDetail();
				}
			}
		},
		mounted(){
			this.refresh();
			this.refreshEvent();
		}
	}
</script>
