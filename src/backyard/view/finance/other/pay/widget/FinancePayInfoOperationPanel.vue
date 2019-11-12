<template>

	<div>
		<NbSlidePanel type="info">
			<span slot="heading" class="f16">
				<i class="fa fa-cogs"></i>
				操作面板
			</span>
			<div slot="body">
				<el-tabs v-model="tabStatus" type="card" @tab-click="handleClick">
					<el-tab-pane label="发送付款通知" name="PAY_NOTIFY">
						<NotificationControlPanel :notification="payingNotification"
						                          :beforeSendCallback="payingBeforeSendCallback"
						                          :successCallback="sendNotifySuccessCallback"/>
					</el-tab-pane>
					<el-tab-pane label="发送催款通知" name="PAY_REMINDER">
						<NotificationControlPanel :notification="reminderNotification"
						                          :beforeSendCallback="reminderBeforeSendCallback"
						                          :successCallback="sendReminderSuccessCallback"/>
					</el-tab-pane>
          <el-tab-pane label="已收账款录入" name="PAYING">
            <FinanceBillReceiptCreateView :financeBillReceipt="financeBillReceipt"
                                          :successCallback="sendReceiptFinish"/>
          </el-tab-pane>
          <el-tab-pane label="归档" name="ARCHIVE">
            <Archive :financeOtherPay="financeOtherPay" :successCallback="archiveFinishCallback"/>
          </el-tab-pane>
				</el-tabs>
			</div>

		</NbSlidePanel>

	</div>

</template>


<script>
	import FinanceOtherPay from  "../../../../../../common/model/finance/FinanceOtherPay";
	import UserProfileLink from "../../../../widget/UserProfileLink";
	import CreateSaveButton from "../../../../widget/CreateSaveButton.vue";
	import {Notification as NotificationBox} from 'element-ui';
	import Notification from  "../../../../../../common/model/notification/Notification";
	import NotificationControlPanel from  "../../../../notification/widget/ControlPanel.vue";
	import NbSlidePanel from  "../../../../../../common/widget/NbSlidePanel.vue";
	import NbExpanding from  "../../../../../../common/widget/NbExpanding.vue";
	import FinanceBillReceiptCreateView from "../../../bill/receipt/widget/CreateView.vue";
	import FinanceBillReceipt from  "../../../../../../common/model/finance/FinanceBillReceipt"
  import Archive from  "./operationPanelWidget/Archive.vue"
	import {Action} from  "../../../../../../common/model/core/action/Action"

	export default{
		data(){
			return {
				tabStatus: "PAY_NOTIFY",
				Status: FinanceOtherPay.prototype.Status,
				StatusMap: FinanceOtherPay.prototype.StatusMap,
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user,
				payingNotification: new Notification(),
				reminderNotification: new Notification(),
				financeBillReceipt: new FinanceBillReceipt()
			}
		},
		computed: {},

		props: {
      financeOtherPay: {
				type: FinanceOtherPay,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
			sendNotifySuccessCallback: {
				type: Function,
				required: false
			},
			sendReminderSuccessCallback: {
				type: Function,
				required: false
			},
			sendReceiptSuccessCallback: {
				type: Function,
				required: false
			},
      archiveFinishCallback: {
        type: Function,
        required: false
      }
		},
		watch: {
			"financeOtherPay.name"(newVal, oldVal){
				//装填即将创建的收款单
				this.financeBillReceipt.fillByFinanceOtherPay(this.financeOtherPay);

			},
			"financeOtherPay.id"(newVal, oldVal){
				let that = this;

				if (newVal && newVal + "" !== oldVal + "") {


					this.financeOtherPay.httpNotification(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {
						that.payingNotification.render(response.data.notification);

					});

					this.financeOtherPay.httpNotification(Action.FINANCE_PAY_INFO_REMINDER, function (response) {
						that.reminderNotification.render(response.data.notification);
					});

				}
			}
		},
		components: {
			UserProfileLink,
			CreateSaveButton,
			NotificationControlPanel,
			FinanceBillReceiptCreateView,
			NbExpanding,
			NbSlidePanel,
      Archive
		},
		methods: {
			handleClick(arg){

			},
			sendReceiptFinish(){
				let that = this;
				//将该对象id置为null。否则下面只会更新。
				this.financeBillReceipt.id = null;
				if (typeof this.sendReceiptSuccessCallback === "function") {
					this.sendReceiptSuccessCallback();
				}

			},
			payingBeforeSendCallback(callback){
				let that = this;

				this.financeOtherPay.httpNotify(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {

					that.payingNotification.messageNotify.render(response.data.messageNotify);

					if (typeof callback === "function") {
						callback();
					}
				});

			},
			reminderBeforeSendCallback(callback){
				let that = this;
				this.financeOtherPay.httpNotify(Action.FINANCE_PAY_INFO_REMINDER, function (response) {

					that.reminderNotification.messageNotify.render(response.data.messageNotify);

					if (typeof callback === "function") {
						callback();
					}

				});
			},
      refresh(){
        let that = this;
        this.financeOtherPay.httpNotification(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {
          that.payingNotification.render(response.data.notification);
        });

        this.financeOtherPay.httpNotification(Action.FINANCE_PAY_INFO_REMINDER, function (response) {
          that.reminderNotification.render(response.data.notification);
        });

        //装填即将创建的收款单
        this.financeBillReceipt.fillByFinanceOtherPay(this.financeOtherPay);
      }
		},
		mounted(){
      if(this.financeOtherPay.id !== 0){
        this.refresh();
      }
		}

	}


</script>
