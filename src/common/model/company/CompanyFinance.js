import BaseEntity from '../base/BaseEntity'
import Vue from 'vue'
import Company from './Company'

let Status = {
  OK: 'OK',
  ERROR: 'ERROR'
}

export default function CompanyFinance() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.status = Status.OK;
  this.year = null;
  this.endYearAssets = null;
  this.endYearLiabilities = null;
  this.endYearFixedAssets = null;
  this.endYearFixedInvestment = null;
  this.businessIncome = null;
  this.businessIncomeMain = null;
  this.businessIncomeHigh = null;
  this.industryValue = null;
  this.industryValueHigh = null;
  this.industryValueKnowledge = null;
  this.addedValue = null;
  this.laborRemuneration = null;
  this.depreciation = null;
  this.generateTax = null;
  this.operatingSurplus = null;
  this.exportEarnings = null;
  this.rdInvestment = null;
  this.rdInvestmentHighExports = null;
  this.afterTaxProfit = null;
  this.taxPaid = null;
  this.taxPaidValueAdded = null;
  this.taxPaidBusiness = null;
  this.taxPaidIncome = null;
  this.taxPaidIndividualIncome = null;
  this.taxPaidOther = null;
  this.reductionTax = null;
  this.reductionTaxValueAdded = null;
  this.reductionTaxBusiness = null;
  this.reductionTaxIncome = null;
  this.reductionTaxIndividualIncome = null;
  this.reductionTaxHigh = null;
  this.company = new Company();

  if (Vue.store.state.debug) {
    this.mockData();
  }
}
CompanyFinance.prototype = new BaseEntity();
CompanyFinance.prototype.constructor = CompanyFinance;

//测试数据。
CompanyFinance.prototype.mockData = function () {
  this.year = "2016";
  this.endYearAssets = 10;
  this.endYearLiabilities = 13;
  this.endYearFixedAssets = 13;
  this.endYearFixedInvestment = 13;
  this.businessIncome = 13;
  this.businessIncomeMain = 13;
  this.businessIncomeHigh = 13;
  this.industryValue = 13;
  this.industryValueHigh = 13;
  this.industryValueKnowledge = 13;
  this.addedValue = 13;
  this.laborRemuneration = 13;
  this.depreciation = 13;
  this.generateTax = 13;
  this.operatingSurplus = 13;
  this.exportEarnings = 13;
  this.rdInvestment = 13;
  this.rdInvestmentHighExports = 13;
  this.afterTaxProfit = 13;
  this.taxPaid = 13;
  this.taxPaidValueAdded = 13;
  this.taxPaidBusiness = 13;
  this.taxPaidIncome = 13;
  this.taxPaidIndividualIncome = 13;
  this.taxPaidOther = 13;
  this.reductionTax = 13;
  this.reductionTaxValueAdded = 13;
  this.reductionTaxBusiness = 13;
  this.reductionTaxIncome = 13;
  this.reductionTaxIndividualIncome = 13;
  this.reductionTaxHigh = 13;
}

//We use this method to get the full js Object.
CompanyFinance.prototype.render = function(obj){
  BaseEntity.prototype.render.call(this,obj);
}

CompanyFinance.prototype.getForm = function () {

  let form = {
    year: this.year,
    endYearAssets: this.endYearAssets,
    endYearLiabilities: this.endYearLiabilities,
    endYearFixedAssets: this.endYearFixedAssets,
    endYearFixedInvestment: this.endYearFixedInvestment,
    businessIncome: this.businessIncome,
    businessIncomeMain: this.businessIncomeMain,
    businessIncomeHigh: this.businessIncomeHigh,
    industryValue: this.industryValue,
    industryValueHigh: this.industryValueHigh,
    industryValueKnowledge: this.industryValueKnowledge,
    addedValue: this.addedValue,
    laborRemuneration: this.laborRemuneration,
    depreciation: this.depreciation,
    generateTax: this.generateTax,
    operatingSurplus: this.operatingSurplus,
    exportEarnings: this.exportEarnings,
    rdInvestment: this.rdInvestment,
    rdInvestmentHighExports: this.rdInvestmentHighExports,
    afterTaxProfit: this.afterTaxProfit,
    taxPaid: this.taxPaid,
    taxPaidValueAdded: this.taxPaidValueAdded,
    taxPaidBusiness: this.taxPaidBusiness,
    taxPaidIncome: this.taxPaidIncome,
    taxPaidIndividualIncome: this.taxPaidIndividualIncome,
    taxPaidOther: this.taxPaidOther,
    reductionTax: this.reductionTax,
    reductionTaxValueAdded: this.reductionTaxValueAdded,
    reductionTaxBusiness: this.reductionTaxBusiness,
    reductionTaxIncome: this.reductionTaxIncome,
    reductionTaxIndividualIncome: this.reductionTaxIndividualIncome,
    reductionTaxHigh: this.reductionTaxHigh

  };
  if (this.id) {
    form.id = this.id;
  }


  return form;

}
