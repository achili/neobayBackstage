<template>

	<div>
		<NbSlidePanel type="info">
			<span slot="heading" class="f16">
				<i class="fa fa-cogs"></i>
				操作面板
			</span>
			<div slot="body">
				<el-tabs v-model="tabStatus" type="card" @tab-click="handleClick">
					<el-tab-pane label="发送付款通知" name="PAY_NOTIFY" v-if="financePayInfo.status !== financePayInfo.Status.FINISH">
						<NotificationControlPanel :notification="payingNotification"
						                          :beforeSendCallback="payingBeforeSendCallback"
						                          :successCallback="sendNotifySuccessCallback"/>
					</el-tab-pane>
					<el-tab-pane label="发送催款通知" name="PAY_REMINDER" v-if="financePayInfo.status !== financePayInfo.Status.FINISH">
						<NotificationControlPanel :notification="reminderNotification"
						                          :beforeSendCallback="reminderBeforeSendCallback"
						                          :successCallback="sendReminderSuccessCallback"/>
					</el-tab-pane>
					<el-tab-pane label="已收账款录入" name="PAYING" v-if="financePayInfo.status !== financePayInfo.Status.FINISH">
						<FinanceBillReceiptCreateView :financeBillReceipt="financeBillReceipt"
						                              :successCallback="sendReceiptFinish"/>
					</el-tab-pane>
          <el-tab-pane label="票据领取通知" name="PAY_INVOICE">
            <NotificationControlPanel :notification="invoiceNotification"
                                      :beforeSendCallback="invoiceBeforeSendCallback"
                                      :successCallback="sendInvoiceSuccessCallback"/>
          </el-tab-pane>
          <el-tab-pane label="归档" name="ARCHIVE">
            <Archive :financePayInfo="financePayInfo" :successCallback="archiveFinishCallback"/>
          </el-tab-pane>

          <el-tab-pane v-if="financePayInfo.status !== 'FINISH'" label="在线支付" name="ONLINE_PAY">
            <OnlinePay :financePayInfo="financePayInfo" :successCallback="archiveFinishCallback"/>
          </el-tab-pane>
				</el-tabs>
			</div>

		</NbSlidePanel>

	</div>

</template>


<script>
	import FinancePayInfo from  "../../../../../common/model/finance/FinancePayInfo";
	import UserProfileLink from "../../../widget/UserProfileLink";
	import CreateSaveButton from "../../../widget/CreateSaveButton.vue";
	import {Notification as NotificationBox} from 'element-ui';
	import Notification from  "../../../../../common/model/notification/Notification";
	import NotificationControlPanel from  "../../../notification/widget/ControlPanel.vue";
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
	import NbExpanding from  "../../../../../common/widget/NbExpanding.vue";
	import FinanceBillReceiptCreateView from "../../bill/receipt/widget/CreateView.vue";
	import FinanceBillReceipt from  "../../../../../common/model/finance/FinanceBillReceipt"
  import Archive from  "./operationPanelWidget/Archive.vue"
  import OnlinePay from  "./OnlinePay.vue"
	import {Action} from  "../../../../../common/model/core/action/Action"

	export default{
		data(){
			return {
				tabStatus: "PAY_NOTIFY",
				Status: FinancePayInfo.prototype.Status,
				StatusMap: FinancePayInfo.prototype.StatusMap,
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user,
				payingNotification: new Notification(),
				reminderNotification: new Notification(),
				financeBillReceipt: new FinanceBillReceipt(),
        invoiceNotification: new Notification()
			}
		},
		computed: {},

		props: {
			financePayInfo: {
				type: FinancePayInfo,
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
      },
      sendInvoiceSuccessCallback:{
        type: Function,
        required: false
      }
		},
		watch: {
      "financePayInfo.status"(newVal) {
        if(this.financePayInfo.status === this.financePayInfo.Status.FINISH) {
          this.tabStatus = "PAY_INVOICE";
        }
      },
			"financePayInfo.name"(newVal, oldVal){


				//装填即将创建的收款单
				this.financeBillReceipt.fillByFinancePayInfo(this.financePayInfo);

			},
			"financePayInfo.id"(newVal, oldVal){
				let that = this;

				if (newVal && newVal + "" !== oldVal + "") {


					this.financePayInfo.httpNotification(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {
						that.payingNotification.render(response.data.notification);

					});

					this.financePayInfo.httpNotification(Action.FINANCE_PAY_INFO_REMINDER, function (response) {
						that.reminderNotification.render(response.data.notification);
					});

          this.financePayInfo.httpInvoiceNotification(Action.FINANCE_PAY_INFO_INVOICE, function (response) {
            that.invoiceNotification.render(response.data.notification);
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
      Archive,
      OnlinePay
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

				this.financePayInfo.httpNotify(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {

					that.payingNotification.messageNotify.render(response.data.messageNotify);

					if (typeof callback === "function") {
						callback();
					}
				});

			},
			reminderBeforeSendCallback(callback){
				let that = this;
				this.financePayInfo.httpNotify(Action.FINANCE_PAY_INFO_REMINDER, function (response) {

					that.reminderNotification.messageNotify.render(response.data.messageNotify);

					if (typeof callback === "function") {
						callback();
					}

				});
			},
      invoiceBeforeSendCallback(callback){
        let that = this;
        this.financePayInfo.httpNotify(Action.FINANCE_PAY_INFO_INVOICE, function (response) {

          that.invoiceNotification.messageNotify.render(response.data.messageNotify);

          if (typeof callback === "function") {
            callback();
          }
        });

      },
      refresh(){
        let that = this;

        if(this.financePayInfo.status === this.financePayInfo.Status.FINISH) {
          this.tabStatus = "PAY_INVOICE";
        }

        this.financePayInfo.httpNotification(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {
          that.payingNotification.render(response.data.notification);

        });

        this.financePayInfo.httpNotification(Action.FINANCE_PAY_INFO_REMINDER, function (response) {
          that.reminderNotification.render(response.data.notification);
        });

        this.financePayInfo.httpInvoiceNotification(Action.FINANCE_PAY_INFO_INVOICE, function (response) {
          that.invoiceNotification.render(response.data.notification);
        });

        //装填即将创建的收款单
        this.financeBillReceipt.fillByFinancePayInfo(this.financePayInfo);
      }
		},
		mounted(){
      if(this.financePayInfo.id !== 0){
        this.refresh();
      }
		}

	}


</script>
