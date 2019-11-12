<template>
  <div>
    <NbSlidePanel type="info" :initShow="true">

      <span slot="heading">
        <i class="fa fa-bell"></i>
        应收账款
      </span>
      <div slot="body">
        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">所属园区</label>
          <div class="col-md-4">
            <SpaceRegionalSelection :spaceRegional="spaceRegional" :editMode="false"></SpaceRegionalSelection>

          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">表名称</label>
          <div class="col-md-4">
            <select class="form-control" v-model="type">
              <option value="房租">应收账款明细表(房租)</option>
              <option value="履约保证金">应收账款明细表(履约保证金)</option>
              <option value="电费">应收账款明细表(电费)</option>
              <option value="余额">应收账款余额表</option>
            </select>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5">截止日期:</label>
          <div class="col-md-4">
            <el-date-picker
              v-model="chooseDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5">关键字:</label>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="chooseKeyword">
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5">筛选条件:</label>
        </div>
        <div class="row mt10">
          <div class="col-md-2">
            <NbCheckbox :val="true" v-model="isNotZero" name="isAgree"/>
            <span>余额为零不显示</span>
          </div>
          <div class="col-md-2">
            <NbCheckbox :val="false" v-model="isNotExpire" name="isAgree"/>
            <span>合同到期不显示</span>
          </div>
          <div class="col-md-2">
            <NbCheckbox :val="false" v-model="isNotException" name="isAgree"/>
            <span>合同中止不显示</span>
          </div>
          <div class="col-md-2">
            <NbCheckbox :val="false" v-model="isNotArchive" name="isAgree"/>
            <span>合同归档不显示</span>
          </div>
          <div class="col-md-2">
            <NbCheckbox :val="true" v-model="isNotPayment" name="isAgree"/>
            <span>房租付款通知单归档不显示</span>
          </div>
          <div class="col-md-2">
            <NbCheckbox :val="true" v-model="isNotEnergy " name="isAgree"/>
            <span>电费付款通知单归档不显示</span>
          </div>
        </div>

        <div class="row mt10">
          <div class="col-md-2">
            <button class="btn btn-primary" @click.stop.prevent="refresh">
              <i class="fa fa-refresh"></i>
              <span>刷新预览表格</span>
            </button>
          </div>
          <div class="col-md-2">
            <a class="btn btn-success" target="_blank"
               @click="financeStatement.downloadXls(chooseDate, type, chooseKeyword,spaceRegional.id,
               isNotZero, isNotExpire, isNotArchive, isNotException,isNotPayment,isNotEnergy)">
              <i class="fa fa-file-excel-o"></i>
              导出为Excel
            </a>
          </div>
        </div>

        <!--表格-->
        <div>
          <div v-if="isChoose">
            <PublicForm :choose-type= "type" :choose-date="chooseDate" :choose-keyword="chooseKeyword"
                        :is-not-zero="isNotZero" :is-not-expire="isNotExpire" :is-not-archive="isNotArchive"
                        :is-not-exception="isNotException" :is-not-payment="isNotPayment" :is-not-energy="isNotEnergy" :spaceRegional="spaceRegional" ></PublicForm>
          </div>
        </div>
      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import RentForm from "../finance/form/RentForm"
  import EnsureForm from "../finance/form/EnsureForm"
  import PublicForm from "../finance/form/PublicForm"
  import NbSlidePanel from "../../../common/widget/NbSlidePanel.vue";
  import {Notification} from 'element-ui';
  import NbCheckbox from "../../../common/widget/NbCheckbox.vue";
  import FinanceStatement from "../../../common/model/finance/statement/FinanceStatementItem";
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'
  import SpaceRegional from "../../../common/model/space/SpaceRegional";

  export default{
    data(){
      return {
        financeList: [
          {
            name: '应收账款明细表(房租)',
            type: '房租'
          },
          {
            name: '应收账款明细表(履约保证金)',
            type: '履约保证金'
          },
          {
            name: '应收账款明细表(电费)',
            type: '电费'
          },
          {
            name: '应收账款余额表',
            type: '余额'
          }
        ],
        financeStatement: new FinanceStatement(),
        type: '',
        chooseDate: new Date(),
        chooseKeyword: "",
        isChoose: false,
        isNotZero: true,
        isNotExpire: false,
        isNotArchive: false,
        isNotException: false,
        isNotPayment:true,
        isNotEnergy:true,
        spaceRegional: new SpaceRegional()

      }
    },
    components: {
      RentForm,
      EnsureForm,
      PublicForm,
      NbCheckbox,
      NbSlidePanel,
      SpaceRegionalSelection
    },
    watch: {
      "chooseDate"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "chooseKeyword"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "type"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "isNotZero"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "isNotExpire"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "isNotArchive"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "isNotPayment"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "isNotEnergy"(newVal, oldVal){
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "isNotException"(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      },
      "spaceRegional.id"(newVal, oldVal){
        if (newVal !== oldVal) {
          this.isChoose = false;
        }
      }
    },
    methods: {
      choose(type) {
        let that = this;
        that.type = type;
      },
      refresh() {
        if (!this.type) {
          Notification.error({
            message: '表名称必选！'
          });
        } else {
          this.isChoose = true;
        }
      }
    },
    mounted() {

    }
  }
</script>
