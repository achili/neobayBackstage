<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="financeOtherPay.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success" v-if="user.hasPermissionSpace(FeatureType.FINANCE_PAY_INFO_MANAGE,financeOtherPay.spaceRegional.id)"
               @click.stop.prevent="$router.push('/by/finance/other/pay/edit/' + financeOtherPay.id)">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">

            <div class="col-md-12">

              <FinanceOtherPayView :financeOtherPay="financeOtherPay"/>

            </div>

            <div class="col-md-12">

              <FinanceOtherPayPdfPreview :financeOtherPay="financeOtherPay"/>

            </div>

            <!--大事记录-->
            <div class="col-md-12">
              <div ref="flowNode">
                <MessageNotifyView ref="messageNotifyView" :entity="financeOtherPay"/>
              </div>
            </div>

            <div class="col-md-12"
                 v-if="user.hasPermissionSpace(FeatureType.FINANCE_PAY_INFO_MANAGE,financeOtherPay.spaceRegional.id) && financeOtherPay.status !== financeOtherPay.Status.FINISH">
              <FinancePayInfoOperationPanel :financeOtherPay="financeOtherPay"
                                            :sendNotifySuccessCallback="sendNotifySuccessCallback"
                                            :sendReminderSuccessCallback="sendReminderSuccessCallback"
                                            :sendReceiptSuccessCallback="sendReceiptSuccessCallback"
                                            :archiveFinishCallback="archiveFinishCallback"/>
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
  import $ from "jquery";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import {smoothScroll} from "../../../../../common/util/AnimationUtils";
  import FinanceOtherPay from  "../../../../../common/model/finance/FinanceOtherPay"

  import FinanceOtherPayView from "./widget/FinanceOtherPayView.vue";
  import FinanceOtherPayPdfPreview from "./widget/preview/FinanceOtherPayPdfPreview.vue";
  import UserProfileLink from "../../../widget/UserProfileLink";
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../../widget/LoadingFrame";
  import MessageNotifyView from "../../../message/notify/MessageNotifyView";
  import FinancePayInfoOperationPanel from "./widget/FinancePayInfoOperationPanel";


  export default{
    data(){
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        financeOtherPay: new FinanceOtherPay()
      }
    },
    computed: {},
    components: {
      FinanceOtherPayView,
      FinanceOtherPayPdfPreview,
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
      refresh(){

        this.fetchDetail();

      },
      fetchDetail(){
        let that = this;
        this.financeOtherPay.id = this.$store.state.route.params.id;
        if (this.financeOtherPay.id) {
          this.financeOtherPay.httpDetail();
        }
      }
    },
    mounted(){
      this.refresh();
      this.refreshEvent();
    }
  }
</script>
