<template>
  <div class="row">

    <div class="col-xs-12">

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">空间类型：</label>
        <div class="col-md-10">
          <select class="form-control" v-model="financePayInfo.protocolSpace.type">
            <option v-for="type in financePayInfo.protocolSpace.spaceApply.TypeList" :value="type.value">{{type.name}}
            </option>
          </select>
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">合同编号：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="financePayInfo.protocolNo">
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">支付金额：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="financePayInfo.total">
        </div>
      </div>
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">付款方公司：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="financePayInfo.companyName">
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5">备注：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="financePayInfo.remark">
        </div>
      </div>
      <div class="row mt10">
        <label class="col-md-2 control-label mt5">支付方式：</label>
        <div class="col-md-10">
          <FinancePayShow :entity="financePayInfo"></FinancePayShow>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import FinancePayInfo from "../../../../../common/model/finance/FinancePayInfo";
  import payPageShow from "../../../conference/reservation/PayPageShow";
  import FinancePayShow from "./FinancePayShow";

  export default{
    data(){
      return {
        refresh: true
      }
    },
    props: {
      financePayInfo: {
        type: FinancePayInfo,
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
      payPageShow,
      FinancePayShow
    },
    computed: {

    },
    watch: {},
    methods: {
    },
    mounted() {
    }
  }
</script>

