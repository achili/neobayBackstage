<template>
  <div class="row">

    <div class="col-xs-12">

      <div class="text-center" v-show="financeStatement.loading">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>

      <div class="finance-statement-block" v-show="!financeStatement.loading">

        <div class="title">
          应收账款明细表（履约保证金）
        </div>

        <el-date-picker
          v-model="chooseDate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">承租方名称:</label>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="chooseKeyword">
          </div>
        </div>
        <div class="table-block">
          <table>
            <tr v-for="(item,index) in ensureList">
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

  export default{
    data() {
      return {
        user: this.$store.state.user,
        pager: new Pager(ProtocolSpace),
        chooseDate: new Date(),
        financeStatement: new FinanceStatement(),
        ensureList: [],
        chooseKeyword: null
      }
    },
    computed: {},
    watch: {
      "chooseDate"(newVal, oldVal) {
        let that = this;
        this.financeStatement.httpRefreshRent(newVal, function (response) {
          that.ensureList = response.data.data;
        })
      }
    },
    methods: {
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        // this.pager.httpFastPage();

      }
    },
    components: {
      NbFilter,
      NbPager
    },
    mounted() {
      let that = this;
      let form = {
        chooseDate: simpleDateTime(this.chooseDate)
      };
      this.financeStatement.httpRefreshRent(form, function (response) {
        that.ensureList = response.data.data;
      })
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

      overflow-x: auto;

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
