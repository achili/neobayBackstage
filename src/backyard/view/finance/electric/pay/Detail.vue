<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="financeElectricPay.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success" v-if="user.hasPermissionSpace(FeatureType.FINANCE_PAY_INFO_MANAGE,financeElectricPay.spaceRegional.id)"
                @click.stop.prevent="$router.push('/by/finance/electric/pay/edit/'+ financeElectricPay.id)">
                <i class="fa fa-pencil"></i>
                编辑
            </a>
          </div>

          <div class="row">

            <!--电费付款信息详情-->
            <div class="col-md-12">
               <FinanceElectricPayView :financeElectricPay="financeElectricPay" />
            </div>

            <!--付款通知书-->
            <div class="col-md-12">
              <FinanceElectricPayPdfPreview :financeElectricPay="financeElectricPay"/>
            </div>

            <!---大事记录-->
            <div class="col-md-12">
              <div ref="flowNode">
                <MessageNotifyView ref="messageNotifyView" :entity="financeElectricPay"/>
              </div>
            </div>

            <!---操作面板-->
            <div class="col-md-12"
                 v-if="user.hasPermissionSpace(FeatureType.FINANCE_PAY_INFO_MANAGE,financeElectricPay.spaceRegional.id)">
              <FinanceElectricPayOperationPanel :financeElectricPay="financeElectricPay"
                                            :sendNotifySuccessCallback="sendNotifySuccessCallback"
                                            :sendReminderSuccessCallback="sendReminderSuccessCallback"
                                            :sendReceiptSuccessCallback="sendReceiptSuccessCallback"
                                            :archiveFinishCallback="archiveFinishCallback" :sendInvoiceSuccessCallback="sendInvoiceSuccessCallback"/>
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

  import FinanceElectricPayView from "./widget/FinanceElectricPayView.vue";
  import FinanceElectricPayPdfPreview from "./widget/FinanceElectricPayPdfPreview.vue";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import FinanceElectricPay from "../../../../../common/model/finance/FinanceElectricPay";
  import LoadingFrame from "../../../widget/LoadingFrame";
  import MessageNotifyView from "../../../message/notify/MessageNotifyView";
  import FinanceElectricPayOperationPanel from "./widget/FinanceElectricPayOperationPanel.vue";
  import UserProfileLink from "../../../widget/UserProfileLink";
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue";

  import $ from "jquery";
  import {smoothScroll} from "../../../../../common/util/AnimationUtils";


  export default {

      data(){
        return {
          user: this.$store.state.user,
          FeatureType: this.$store.state.FeatureType,
          financeElectricPay: new FinanceElectricPay()
        }
      },
      components:{
        FinanceElectricPayView,
        FinanceElectricPayPdfPreview,
        LoadingFrame,
        MessageNotifyView,
        FinanceElectricPayOperationPanel,
        UserProfileLink,
        CreateSaveButton
      },
      computed:{},
      methods:{
        refreshEvent(){
          this.$refs.messageNotifyView.refresh();
        },
        sendNotifySuccessCallback(){
          this.refreshEvent();
          smoothScroll(this.$refs.flexFlow);
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
        sendInvoiceSuccessCallback() {
          this.refreshEvent();
          smoothScroll(this.$refs.flowNode);
        },
        refresh(){
          this.fetchDetail();
        },
        fetchDetail(){
          let that = this;
          this.financeElectricPay.id = this.$store.state.route.params.id;
          if (this.financeElectricPay.id) {
            this.financeElectricPay.httpDetail();
          }
        }
      },
      mounted(){
        this.refresh();
        this.refreshEvent();
        console.log(this.financeElectricPay.getEntityType())

      }
    }
</script>

<style scoped>

</style>
