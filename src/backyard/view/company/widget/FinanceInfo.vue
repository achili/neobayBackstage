<template>
  <div class="wrapper wrapper-content">

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-leaf"></i>
      财务情况
    </span>
      <div slot="body">

        <NbSlidePanel type="primary" v-for="companyFinance in company.companyFinances" :key="companyFinance.name">
        <span slot="heading">
          <i class="fa fa-leaf"></i>
          年份：{{companyFinance.year}}
        </span>
          <div slot="body">

            <div class="row">
              <div class="col-md-12">
                <div class="row">

                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">年末总资产（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.endYearAssets">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">年末负债总额（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.endYearLiabilities">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">年末固定资产总额（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.endYearAssets">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">年末未完成固定资产投资额（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.endYearFixedInvestment">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">工业总产值（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.industryValue">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">高新技术产品产值（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.industryValueHigh">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">自主知识产权产品产值（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.industryValueKnowledge">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">出口创汇（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.exportEarnings">
                      </div>
                    </div>
                  </div><div class="col-md-6">
                  <div class="row mt10">
                    <label class="col-md-4 control-label mt5">营业收入（万元）</label>
                    <div class="col-md-8">
                      <input type="number" class="form-control" v-model="companyFinance.businessIncome">
                    </div>
                  </div>
                </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">主营业收入（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.businessIncomeMain">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">高新技术产品销售收入（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.businessIncomeHigh">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">增加值（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.addedValue">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">劳动者报酬（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.laborRemuneration">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">固定资产折旧（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.depreciation">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">生成税净额（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.generateTax">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">营业盈余（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.operatingSurplus">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">当年R&D投入（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.rdInvestment">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">当年高新技术产品出口额（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.rdInvestmentHighExports">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">税后利润（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.afterTaxProfit">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际上缴税费（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.taxPaid">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际上缴营业税（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.taxPaidBusiness">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际上缴所得税（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.taxPaidIncome">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际上缴个人所得税（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.taxPaidIndividualIncome">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际上缴其他税（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.taxPaidOther">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际减免税费总额（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.reductionTax">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际减免增值税（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.reductionTaxValueAdded">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际减免营业税（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.reductionTaxBusiness">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">实际减免所得税（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.reductionTaxIncome">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">研发加计扣除减免（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.reductionTaxIndividualIncome">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">高新技术企业专项减免（万元）</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyFinance.reductionTaxHigh">
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="col-md-12 text-center mt10">
                <button class="btn btn-danger" role="button" @click="confirmDeleteFinance(companyFinance)">
                  <i class="fa fa-trash"></i> 删除该年财务信息
                </button>
              </div>
            </div>
          </div>
        </NbSlidePanel>

      <div class="row">
        <div class="col-md-6">
          <select class="form-control w150 pull-right"  v-model="currentYear">
            <option value="">请选择年份</option>
            <option v-for="year in years" v-if="showYear(year)">{{year}}</option>
          </select>
        </div>
        <div class="col-md-6">
          <button class="btn btn-success pull-left" role="button" @click="addCompanyFinance">
            <i class="fa fa-plus"></i> 增加当年财务情况
          </button>

        </div>
      </div>
      </div>
    </NbSlidePanel>

  </div>

</template>
<script>
  import CompanyFinance from '../../../../common/model/company/CompanyFinance'
  import Company from '../../../../common/model/company/Company'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import {Notification, MessageBox} from 'element-ui';
  import $ from "jquery"

  export default{
    data () {
			return {
        years: [],
        currentYear: ""
			}
		},
		components: {
      NbSlidePanel
		},
		props:{
      company: {
        type: Company,
        required: true
      }
		},
		computed: {

    },
		watch: {},
		methods: {
      showYear(year) {
        let isShow = true;
        this.company.companyFinances.forEach(
          function (finance) {
            if(finance.year === year) {
              isShow = false;
              return;
            }
          });
        return isShow;
      },
      addCompanyFinance(){
        if(!this.currentYear || this.currentYear === '') {
          return;
        }
        let companyFinance = new CompanyFinance();
        companyFinance.year = this.currentYear;
        this.company.addFinance(companyFinance);
        this.currentYear = "";
      },
      confirmDeleteFinance(companyFinance) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.company.delFinance(companyFinance);
        }, function () {
        });
      }
    },
		mounted(){
      let currentYear = new Date().getFullYear();
      for(let i = 0; i < 5; i++) {
        this.years.push((currentYear - i) + '');
      }
    }
  }

</script>
