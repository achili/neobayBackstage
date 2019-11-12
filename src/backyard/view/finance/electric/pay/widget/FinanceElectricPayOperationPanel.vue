<template>
  <div>
    <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
        操作面板
      </span>
      <div slot="body">
        <el-tabs v-model="tabStatus" type="card" @tab-click="handleClick">
          <el-tab-pane label="发送付款通知" name="PAY_NOTIFY" v-if="financeElectricPay.status !== financeElectricPay.Status.FINISH">
            <NotificationControlPanel :notification="payingNotification"
                                      :beforeSendCallback="payingBeforeSendCallback"
                                      :successCallback="sendNotifySuccessCallback"/>
          </el-tab-pane>
          <el-tab-pane label="发送催款通知" name="PAY_REMINDER" v-if="financeElectricPay.status !== financeElectricPay.Status.FINISH">
            <NotificationControlPanel :notification="reminderNotification"
                                      :beforeSendCallback="reminderBeforeSendCallback"
                                      :successCallback="sendReminderSuccessCallback"/>
          </el-tab-pane>
          <el-tab-pane label="已收账款录入" name="PAYING" v-if="financeElectricPay.status !== financeElectricPay.Status.FINISH">
            <FinanceBillReceiptCreateView :financeBillReceipt="financeBillReceipt"
                                          :successCallback="sendReceiptFinish"/>
          </el-tab-pane>

          <el-tab-pane label="电费发票领取通知" name="PAY_INVOICE">
            <NotificationControlPanel :notification="invoiceNotification"
                                      :beforeSendCallback="invoiceBeforeSendCallback"
                                      :successCallback="sendInvoiceSuccessCallback"/>
          </el-tab-pane>

          <el-tab-pane label="归档" name="ARCHIVE">
            <Archive :financeElectricPay="financeElectricPay" :successCallback="archiveFinishCallback"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </NbSlidePanel>
  </div>
</template>

<script>

  import UserProfileLink from "../../../../widget/UserProfileLink";
  import CreateSaveButton from "../../../../widget/CreateSaveButton.vue";
  import Notification from  "../../../../../../common/model/notification/Notification";
  import NotificationControlPanel from  "../../../../notification/widget/ControlPanel.vue";
  import NbSlidePanel from  "../../../../../../common/widget/NbSlidePanel.vue";
  import NbExpanding from  "../../../../../../common/widget/NbExpanding.vue";
  import FinanceBillReceiptCreateView from "../../../bill/receipt/widget/CreateView.vue";

  import {Action} from  "../../../../../../common/model/core/action/Action"
  import Archive from  "./operationPanelWidget/Archive.vue"

  import FinanceElectricPay from "../../../../../../common/model/finance/FinanceElectricPay";
    import FinanceBillReceipt from "../../../../../../common/model/finance/FinanceBillReceipt";

    export default {
      data(){
        return {
          tabStatus: "PAY_NOTIFY",
          Status: FinanceElectricPay.prototype.Status,
          StatusMap: FinanceElectricPay.prototype.StatusMap,
          FeatureType: this.$store.state.FeatureType,
          user: this.$store.state.user,
          payingNotification: new Notification(),
          reminderNotification: new Notification(),
          financeBillReceipt: new FinanceBillReceipt(),
          invoiceNotification: new Notification()
        }
      },
      computed:{},
      props:{
        financeElectricPay:{
          type: FinanceElectricPay,
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
      watch:{
        "financeElectricPay.status"(newVal) {
          if(this.financeElectricPay.status === this.financeElectricPay.Status.FINISH) {
            this.tabStatus = "PAY_INVOICE";
          }
        },
        "financeElectricPay.name"(newVal, oldVal){
          //装填即将创建的收款单
          this.financeBillReceipt.fillByFinanceElectricPay(this.financeElectricPay);
        },
        "financeElectricPay.id"(newVal, oldVal){
          let that = this;

          if (newVal && newVal + "" !== oldVal + "") {

            this.financeElectricPay.httpNotification(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {
              that.payingNotification.render(response.data.notification);
            });
            this.financeElectricPay.httpNotification(Action.FINANCE_PAY_INFO_REMINDER, function (response) {
              that.reminderNotification.render(response.data.notification);
            });
            this.financeElectricPay.httpInvoiceNotification(Action.FINANCE_ELECTRIC_PAY_INFO_INVOICE, function (response) {
              that.invoiceNotification.render(response.data.notification);
            });

          }
        }
      },
      components:{
        UserProfileLink,
        CreateSaveButton,
        NotificationControlPanel,
        FinanceBillReceiptCreateView,
        NbExpanding,
        NbSlidePanel,
        Archive
      },
      methods:{
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

          this.financeElectricPay.httpNotify(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {

            that.payingNotification.messageNotify.render(response.data.messageNotify);

            if (typeof callback === "function") {
              callback();
            }
          });

        },
        reminderBeforeSendCallback(callback){
          let that = this;
          this.financeElectricPay.httpNotify(Action.FINANCE_PAY_INFO_REMINDER, function (response) {

            that.reminderNotification.messageNotify.render(response.data.messageNotify);

            if (typeof callback === "function") {
              callback();
            }

          });
        },
        invoiceBeforeSendCallback(callback) {
          let that = this;
          this.financeElectricPay.httpNotify(Action.FINANCE_ELECTRIC_PAY_INFO_INVOICE, function (response) {
            that.invoiceNotification.messageNotify.render(response.data.messageNotify);
            if (typeof callback === "function") {
              callback();
            }
          });
        },
        refresh(){
          let that = this;

          if(this.financeElectricPay.status === this.financeElectricPay.Status.FINISH) {
            this.tabStatus = "PAY_INVOICE";
          }

          this.financeElectricPay.httpNotification(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {
            that.payingNotification.render(response.data.notification);
          });
          this.financeElectricPay.httpNotification(Action.FINANCE_PAY_INFO_REMINDER, function (response) {
            that.reminderNotification.render(response.data.notification);
          });
          this.financeElectricPay.httpInvoiceNotification(Action.FINANCE_ELECTRIC_PAY_INFO_INVOICE, function (response) {
            that.invoiceNotification.render(response.data.notification);
          });

          //装填即将创建的收款单
          this.financeBillReceipt.fillByFinanceElectricPay(this.financeElectricPay);
        }
      },
      mounted(){
        if(this.financeElectricPay.id !== 0){
          this.refresh();
        }
      }
    }
</script>

<style scoped>

</style>
