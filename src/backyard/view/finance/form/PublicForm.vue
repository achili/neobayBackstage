<template>
  <div class="row">

    <div class="col-xs-12">

      <div class="text-center" v-show="financeStatement.loading">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>

      <div class="finance-statement-block">

        <div class="title" v-if="chooseType === '房租'">
          应收账款明细表（房租）
        </div>
        <div class="title" v-if="chooseType === '履约保证金'">
          应收账款明细表（履约保证金）
        </div>
        <div class="title" v-if="chooseType === '电费'">
          应收账款明细表（电费）
        </div>
        <div class="title" v-if="chooseType === '余额'">
          应收账款余额表
        </div>

        <div class="mt20" style="display: flex;justify-content: space-between;font-weight: bold;">
          <div>
            编制单位: 上海零号湾创业投资有限公司
          </div>
          <div>
            日期: {{chooseDate | date("yyyy/MM/dd")}}
          </div>
          <div>
            单位: 元
          </div>
        </div>
        <div class="table-block" v-show="!financeStatement.loading && chooseType">
          <table>
            <tr v-for="item in ensureList">
              <td v-for="td in item">{{td}}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../../common/model/base/Pager"
  import FinancePayInfo from  "../../../../common/model/finance/FinancePayInfo"
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";
  import FinanceStatement from "../../../../common/model/finance/statement/FinanceStatementItem";
  import {simpleDateTime} from "../../../../common/filter/time";
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";

  export default{
    data() {
      return {
        user: this.$store.state.user,
        pager: new Pager(ProtocolSpace),
        financeStatement: new FinanceStatement(),
        ensureList: []
      }
    },
    props: {
      chooseType: {
        type: String,
        required: true
      },
      chooseDate: {
        type: Date,
        required: true,
        "default": new Date()
      },
      chooseKeyword: {
        type: String,
        required: true,
        "default": ""
      },
      isNotZero: {
        type: Boolean,
        required: true,
        "default": ""
      },
      isNotExpire: {
        type: Boolean,
        required: true,
        "default": ""
      },
      isNotArchive: {
        type: Boolean,
        required: true,
        "default": ""
      },
      isNotException: {
        type: Boolean,
        required: true,
        "default": ""
      },
      isNotPayment:{
        type: Boolean,
        required: true,
        "default": ""
      },
      isNotEnergy:{
        type: Boolean,
        required: true,
        "default": ""
      },
      spaceRegional:{
        type: SpaceRegional,
        required: true
      }
    },
    watch: {
      "chooseDate"(newVal, oldVal) {
        let form = {
          chooseDate: simpleDateTime(newVal)
        };
        this.fetchTable(form);
      },
      "chooseType"(newVal, oldVal) {
        // this.chooseKeyword = "";
        let form = {
          chooseDate: simpleDateTime(this.chooseDate)
        };
        this.fetchTable(form);
      }
    },
    methods: {
      refresh() {
        let form = {
          chooseDate: simpleDateTime(this.chooseDate),
          name: this.chooseKeyword,
          isNotZero: this.isNotZero,
          isNotExpire: this.isNotExpire,
          isNotArchive: this.isNotArchive,
          isNotException: this.isNotException,
          isNotPayment:this.isNotPayment,
          isNotEnergy:this.isNotEnergy,
          spaceRegional:this.spaceRegional.id
        };
        this.fetchTable(form);
      },
      fetchTable(form) {
        let that = this;
        if (this.chooseType === "房租") {
          this.financeStatement.httpRefreshRent(form, function (response) {
            that.ensureList = response.data.data;
          })
        }
        if (this.chooseType === "电费") {
          this.financeStatement.httpRefreshElectric(form, function (response) {
            that.ensureList = response.data.data;
          })
        }
        if (this.chooseType === "余额") {
          this.financeStatement.httpRefreshBalance(form, function (response) {
            that.ensureList = response.data.data;
          })
        }
        if (this.chooseType === "履约保证金") {
          this.financeStatement.httpRefreshEnsure(form, function (response) {
            that.ensureList = response.data.data;
          })
        }
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    mounted() {
      this.refresh();
    }
  }
</script>
<style  lang="less" rel="stylesheet/less">
  .finance-statement-block {

    background: white;
    padding: 10px;
    border-radius: 4px;

    .title {
      font-size: 18px;
      text-align: center;
    }

    .table-block {
      overflow: scroll;
      max-width: 1300px;
      max-height: 500px;

      table {
        margin-top: 10px;
        width: 100%;
        border: solid #000;
        border-width: 1px 0 0 1px;
        border-spacing: 0;

        th {
          text-align: center;
        }
        th, td {
          height: 55px;
          border: solid #000;
          border-width: 0 1px 1px 0;
          padding: 10px;
          min-width: 60px;
          text-align: center;
        }
      }
    }

  }
</style>
