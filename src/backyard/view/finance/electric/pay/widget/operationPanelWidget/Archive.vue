<template>
  <div class="row">

    <div class="col-xs-12">

      <div>
        <i class="fa fa-info-circle"></i>
        <span v-if="financeElectricPay.archive">
          解封将恢复归档前状态。
        </span>
        <span v-else>
          归档后的将不能操作，默认不出现在列表中。
        </span>
      </div>

      <div class="mt10">
        <textarea class="form-control" placeholder="备注" v-model="reviewReason"></textarea>
      </div>

      <div class="mt10">
        <SubmitButton v-if="financeElectricPay.archive" title="解封" :loading="financeElectricPay.loading" :callback="archive"
                        submitClass="btn btn-warning" submitIcon="fa fa-unlock" />
        <SubmitButton v-else title="归档" :loading="financeElectricPay.loading" :callback="archive"
                      submitClass="btn btn-danger" submitIcon="fa fa-lock"/>
      </div>

    </div>

  </div>
</template>

<script>
    import FinanceElectricPay from "../../../../../../../common/model/finance/FinanceElectricPay";
    import SubmitButton from "../../../../../widget/SubmitButton.vue"
    import {MessageBox, Notification as NotificationBox} from 'element-ui'


    export default {
      data() {
        return {
          reviewReason: null,
          refresh: null
        }
      },
      props: {
        financeElectricPay: {
          type: FinanceElectricPay,
          require: true
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
        archive() {
          let that = this;
          this.financeElectricPay.httpArchive(this.reviewReason, function (response) {
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
      mounted() {
      }
    }
</script>

<style scoped>

</style>
