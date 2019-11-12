<template>
  <div class="animated fadeIn">

    <LoadingFrame :loading="financeElectricPay.detailLoading">
      <div class="row">

        <div class="col-xs-12">
          <h2 v-show="!financeElectricPay.editMode"><i class="fa fa-fire text-success"></i>创建电费付款信息</h2>
          <h2 v-show="financeElectricPay.editMode"><i class="fa fa-fire text-success"></i>修改电费付款信息</h2>
        </div>

        <div class="col-xs-12">

          <NbSlidePanel title="电费付款信息">
            <div class="row">
              <label class="col-md-2 control-label mt5 compulsory">关联租赁合同</label>
              <div class="col-md-10">
                <ProtocolSpacePagerSelection :activeProtocolSpace="financeElectricPay.protocolSpace"
                                             :initFilter="{'withElectricPay':true,'status':'PROCESSING'}"/>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">合同编号</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.protocolNo" readonly>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">租赁空间</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.spaceName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">公司或负责人</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.companyName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">合同签署日期</label>
              <div class="col-md-10">
                <el-date-picker
                  v-model="financeElectricPay.signTime"
                  type="date"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">付款所属日期</label>
              <div class="col-md-10">

                <NbDateRange :startTime="financeElectricPay.startTime"
                             v-on:startTimeChange="financeElectricPay.startTime = arguments[0]"
                             :endTime="financeElectricPay.endTime"
                             v-on:endTimeChange="financeElectricPay.endTime = arguments[0]"/>

              </div>
            </div>

            <div class="row mt10"  >
              <label class="col-md-2 control-label mt5 compulsory">初始电表读数</label>
              <div class="col-md-10">
                <input type="number" class="form-control" v-model.number="financeElectricPay.initialMeter">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">上期电表读数</label>
              <div class="col-md-10">
                <input type="number" class="form-control" v-model.number="financeElectricPay.lastMeter">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">本期电表读数</label>
              <div class="col-md-10">
                <input type="number" class="form-control" v-model.number="financeElectricPay.currentMeter">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">本期应缴电费度数</label>
              <div class="col-md-10">
                <input type="number" class="form-control" disabled :value="financeElectricPay.paymentMeter" >
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">本期应缴电费金额</label>
              <div class="col-md-10">
                <input type="number" class="form-control" disabled :value="financeElectricPay.currentMoney" >
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">应付合计</label>
              <div class="col-md-10">
                <input type="number" class="form-control" disabled :value="financeElectricPay.paymentTotal" >
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">开户银行</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.bank">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">银行户名</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.bankAccount">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">银行账号</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.bankNo">
              </div>
            </div>

            <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">落款时间</label>
                  <div class="col-md-10">
                    <el-date-picker
                      v-model="financeElectricPay.notifyTime"
                      type="date"
                      placeholder="选择日期时间">
                    </el-date-picker>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">解入银行时间</label>
              <div class="col-md-10">
                <el-date-picker
                  v-model="financeElectricPay.bankTime"
                  type="date"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">财务部联系人</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.dutyName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">财务部联系电话</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.dutyPhone">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">财务部地址</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeElectricPay.dutyAddress">
              </div>
            </div>

            <div class="mt10">
              <FinanceElectricPayPdfPreview :financeElectricPay="financeElectricPay"/>
            </div>

          </NbSlidePanel>

        </div>

        <div class="col-xs-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="financeElectricPay.errorMessage">
            {{financeElectricPay.errorMessage}}
          </div>
          <CreateSaveButton :entity="financeElectricPay" :callback="save"/>
        </div>

      </div>

    </LoadingFrame>

  </div>

</template>

<script>
  import {MessageBox,Notification as NotificationBox} from 'element-ui'
  import LoadingFrame from "../../../widget/LoadingFrame";
  import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
  import ProtocolSpacePagerSelection from  "../../../protocol/space/Selection.vue";
  import FinanceElectricPay from "../../../../../common/model/finance/FinanceElectricPay";
  import Notification from  "../../../../../common/model/notification/Notification"
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue"
  import NbDateRange from  "../../../../../common/widget/NbDateRange.vue"
  import TemplatePagerSelection from  "../../../../../developer/view/template/Selection.vue";


  import FinanceElectricPayPdfPreview from "./widget/FinanceElectricPayPdfPreview.vue";
  import Preference from "../../../../../common/model/preference/Preference";



  export default {
       data(){
         return {
           financeElectricPay: new FinanceElectricPay(),
           notification: new Notification(),
           preference: new Preference()
         }
       },
      components:{
        LoadingFrame,
        NbSlidePanel,
        ProtocolSpacePagerSelection,
        CreateSaveButton,
        NbDateRange,
        FinanceElectricPayPdfPreview,
        TemplatePagerSelection
      },
      computed:{

      },
      watch:{
        "financeElectricPay.protocolSpace.id"(newVal, oldVal){
          if (this.financeElectricPay.editMode !== true || oldVal !== 0) {
            this.financeElectricPay.fillByProtocolSpace();
            this.spaceUpdate();
          }
        },
        "financeElectricPay.lastMeter"(newVal, oldVal){
          this.computedElectricPay();
        },
        "financeElectricPay.currentMeter"(newVal, oldVal){
          this.computedElectricPay();
        },
        "financeElectricPay.paymentMeter"(newVal, oldVal){
          this.computedElectricPay();
        },
        "financeElectricPay.deduction"(newVal, oldVal){
          this.computedElectricPay();
        }

      },
      methods: {
        spaceUpdate(){
          let that = this;
          this.preference.httpSearch(this.financeElectricPay.protocolSpace.spaceRegional.id,function () {
            that.financeElectricPay.bank = that.preference.bank;
            that.financeElectricPay.bankAccount = that.preference.bankName;
            that.financeElectricPay.bankNo = that.preference.bankNo;
            that.financeElectricPay.dutyName = that.preference.financeDuty;
            that.financeElectricPay.dutyPhone = that.preference.financePhone;
            that.financeElectricPay.dutyAddress = that.preference.financeAddress;

          })

        },
        save() {
          let that = this;
          if (!this.financeElectricPay.editMode) {
            this.financeElectricPay.status = "NEW";
          }
          this.financeElectricPay.httpSave(function (response) {
            NotificationBox.success({
              message: that.financeElectricPay.editMode ? '修改电费付款信息成功！' : '创建电费付款信息成功！'
            });
            that.$router.push("/by/finance/electric/pay/detail/" + that.financeElectricPay.id);
          });
        },
        fetchDetail() {
          let that = this;
          this.financeElectricPay.httpDetail();
        },
        computedElectricPay() {
          this.financeElectricPay.paymentMeter = (this.financeElectricPay.currentMeter - this.financeElectricPay.lastMeter).toFixed(2);
          this.financeElectricPay.currentMoney = (this.financeElectricPay.paymentMeter * 1.2 * 1.35).toFixed(2);
          this.financeElectricPay.paymentTotal = (this.financeElectricPay.currentMoney * 1 ).toFixed(2);
          this.financeElectricPay.remainTotal = (this.financeElectricPay.paymentTotal - this.financeElectricPay.deduction).toFixed(2);
        },
        computedElectricPay1() {
         this.financeElectricPay.lastMeter = this.financeElectricPay.initialMeter;
        }
      },
      mounted(){
          let that = this;
          this.financeElectricPay.id = this.$store.state.route.params.id;
          if(this.financeElectricPay.id){
            this.financeElectricPay.editMode = true;
            this.fetchDetail();
          }
      }
    }
</script>

<style scoped>

</style>
