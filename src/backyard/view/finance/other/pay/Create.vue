<template>
  <div class="animated fadeIn">

    <LoadingFrame :loading="financeOtherPay.detailLoading">
      <div class="row">

        <div class="col-xs-12">
          <h2 v-show="!financeOtherPay.editMode"><i class="fa fa-fire text-success"></i>创建其他付款信息</h2>
          <h2 v-show="financeOtherPay.editMode"><i class="fa fa-fire text-success"></i>修改其他付款信息</h2>
        </div>

        <div class="col-xs-12">

          <NbSlidePanel title="基本信息">

            <div class="row mt10" v-show="financeOtherPay.editMode">
              <label class="col-md-2 control-label mt5 compulsory">付款单名称</label>
              <div class="col-md-10">
                <input v-model="financeOtherPay.name" type="text" class="form-control">
              </div>
            </div>

            <NbTabs :borderStyle="true" :triggerHover="true">
              <NbTabPanel label="由项目创建">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">付款项目</label>
                  <div class="col-md-10">
                    <ProjectPagerSelection :activeProject="financeOtherPay.project" :initFilter="{'orderId':'DESC'}"/>
                  </div>
                </div>
              </NbTabPanel>
              <NbTabPanel label="由租赁合同创建">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">关联的租赁合同</label>
                  <div class="col-md-10">
                    <ProtocolSpacePagerSelection :activeProtocolSpace="financeOtherPay.protocolSpace"
                                                 :initFilter="{'orderId':'DESC'}"/>
                  </div>
                </div>
              </NbTabPanel>
            </NbTabs>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">公司或负责人</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.companyName">
              </div>
            </div>

          </NbSlidePanel>

          <NbSlidePanel title="付款信息">

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">付款项</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.beneficiaryName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">应付总额</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.paymentTotal">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">落款时间</label>
              <div class="col-md-10">
                <el-date-picker
                  v-model="financeOtherPay.notifyTime"
                  type="date"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">备注</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.remarks">
              </div>
            </div>
          </NbSlidePanel>


          <NbSlidePanel title="银行信息及联系人信息">
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">开户银行</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.bank">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">银行户名</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.bankAccount">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">银行账号</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.bankNo">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">财务部联系人</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.dutyName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">财务部联系电话</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.dutyPhone">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">财务部地址</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeOtherPay.dutyAddress">
              </div>
            </div>
          </NbSlidePanel>


          <FinanceOtherPayPdfPreview :financeOtherPay="financeOtherPay"></FinanceOtherPayPdfPreview>

        </div>

        <div class="col-xs-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="financeOtherPay.errorMessage">
            {{financeOtherPay.errorMessage}}
          </div>
          <CreateSaveButton :entity="financeOtherPay" :callback="save"/>
        </div>

      </div>

    </LoadingFrame>

  </div>
</template>
<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import {simpleDateTime, str2Date} from '../../../../../common/filter/time'
  import Notification from  "../../../../../common/model/notification/Notification"
  import FinanceOtherPay from "../../../../../common/model/finance/FinanceOtherPay"
  import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
  import {numberCapital} from "../../../../../common/filter/str";
  import NbDateRange from  "../../../../../common/widget/NbDateRange.vue"
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../../widget/LoadingFrame";
  import ProjectPagerSelection from "../../../project/Selection.vue";

  import FinanceOtherPayPdfPreview from "./widget/preview/FinanceOtherPayPdfPreview.vue";

  import ProtocolSpacePagerSelection from  "../../../protocol/space/Selection.vue";
  import NbTabs from '../../../../../common/widget/NbTabs.vue'
  import NbTabPanel from '../../../../../common/widget/NbTabPanel.vue'
  import ProtocolSpace from '../../../../../common/model/protocol/space/ProtocolSpace'
  import Project from '../../../../../common/model/project/Project'
  import Preference from "../../../../../common/model/preference/Preference";

  export default{
    data(){
      return {
        financeOtherPay: new FinanceOtherPay(),
        notification: new Notification(),
        preference:new Preference()
      }
    },
    components: {
      NbSlidePanel,
      NbDateRange,
      FinanceOtherPayPdfPreview,
      CreateSaveButton,
      LoadingFrame,
      ProjectPagerSelection,
      ProtocolSpacePagerSelection,
      NbTabs,
      NbTabPanel
    },
    computed: {},
    watch: {
      "financeOtherPay.project.id"(newVal, oldVal) {
        if(newVal) {
          if(this.financeOtherPay.project.registeredCompanyName) {
            this.financeOtherPay.companyName = this.financeOtherPay.project.registeredCompanyName;
          } else {
            this.financeOtherPay.companyName = this.financeOtherPay.project.leader;
          }
          this.financeOtherPay.protocolSpace = new ProtocolSpace()
        }
        if (this.financeOtherPay.editMode !== true || oldVal !== 0) {
          this.spaceUpdate();
        }
      },
      "financeOtherPay.protocolSpace.id"(newVal, oldVal) {
        if(newVal) {
          this.financeOtherPay.companyName = this.financeOtherPay.protocolSpace.partyB;
          this.financeOtherPay.project = new Project();
        }
        if (this.financeOtherPay.editMode !== true || oldVal !== 0) {
          this.spaceUpdate();
        }
      },
      "financeOtherPay.paymentTotal"() {
        if(this.financeOtherPay.editMode !== true) {
          this.financeOtherPay.surplusTotal = this.financeOtherPay.paymentTotal
        }
      }
    },
    methods: {
      spaceUpdate(){
        let that = this;
        let space = null;
        if(this.financeOtherPay.project.id != null){
          space = this.financeOtherPay.project.spaceRegional.id
        }else{
          space = this.financeOtherPay.protocolSpace.spaceRegional.id
        }
        this.preference.httpSearch(space,function () {
          that.financeOtherPay.bank = that.preference.bank;
          that.financeOtherPay.bankAccount = that.preference.bankName;
          that.financeOtherPay.bankNo = that.preference.bankNo;
          that.financeOtherPay.dutyName = that.preference.financeDuty;
          that.financeOtherPay.dutyPhone = that.preference.financePhone;
          that.financeOtherPay.dutyAddress = that.preference.financeAddress;

        })

      },
      save(){
        let that = this;
        if (!this.financeOtherPay.editMode) {
          this.financeOtherPay.status = "NEW";
        }
        this.financeOtherPay.httpSave(function (response) {
          NotificationBox.success({
            message: that.financeOtherPay.editMode ? '修改付款信息成功！' : '创建付款信息成功！'
          });
          that.$router.push("/by/finance/other/pay/detail/" + that.financeOtherPay.id);
        });
      }
    },
    mounted(){
      let that = this;
      this.financeOtherPay.id = this.$store.state.route.params.id;
      if (this.financeOtherPay.id) {
        this.financeOtherPay.httpDetail();
      }
    }
  }
</script>

