<template>
  <div class="row">

    <div class="col-xs-12">

      <div>
        <i class="fa fa-info-circle"></i>
        <span v-if="financeOtherPay.archive">
						解封将恢复归档前的状态。
					</span>
        <span v-else>
						归档后的将不能操作，默认不出现在列表中。
					</span>
      </div>
      <div class="mt10">

        <textarea class="form-control" placeholder="备注" v-model="reviewReason"></textarea>
      </div>

      <div class="mt10">
        <SubmitButton v-if="financeOtherPay.archive" title="解封" :loading="financeOtherPay.loading" :callback="archive"
                      submitClass="btn btn-warning" submitIcon="fa fa-unlock"/>
        <SubmitButton v-else title="归档" :loading="financeOtherPay.loading" :callback="archive"
                      submitClass="btn btn-danger" submitIcon="fa fa-lock"/>
      </div>

    </div>

  </div>
</template>
<script>

  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import FinanceOtherPay from  "../../../../../../../common/model/finance/FinanceOtherPay"
  import SubmitButton from "../../../../../widget/SubmitButton.vue"

  export default{
    data(){
      return {
        reviewReason: null,
        refresh: true
      }
    },
    props: {
      financeOtherPay: {
        type: FinanceOtherPay,
        required: true
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      }

    },
    components: {
      SubmitButton
    },
    computed: {},
    watch: {},
    methods: {
      archive(){
        let that = this;
        this.financeOtherPay.httpArchive(this.reviewReason, function (response) {
          NotificationBox.success({
            message: '归档成功！'
          });
          that.refresh = true;
          if (typeof that.successCallback === "function") {
            that.successCallback();
          }
        }, that.errorCallback);
      }
    },
    mounted() {}
  }
</script>

