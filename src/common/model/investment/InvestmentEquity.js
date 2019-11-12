import BaseEntity from "../base/BaseEntity";
import {simpleDateTime, str2Date} from "../../filter/time";
import Vue from "vue";
import Investment from "./Investment";


export default function InvestmentEquity() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);
  this.shareholderType = null;
  this.shareholderName = null;
  this.docType = null;
  this.idNo = null;
  this.isList = null;
  this.isThousandPlan = null;
  this.stockProportion = null;
  this.totalInvestment = null;
  this.isAbroad = null;
  this.foreignCapitalProportion = null;
  this.listStockProportion = null;
  this.isRiskInvestmentEnterprise = null;
  this.firstInvestmentTime = new Date();
  this.investment = new Investment();

  if (Vue.store.state.debug) {
    this.mockData();
  }
}
InvestmentEquity.prototype = new BaseEntity();
InvestmentEquity.prototype.constructor = InvestmentEquity;

//测试数据。
InvestmentEquity.prototype.mockData = function () {
  this.shareholderType = "中国公民";
  this.shareholderName = "李炸天";
  this.docType = "身份证";
  this.idNo = "5412369571563255";
  this.isList = true;
  this.isThousandPlan = true;
  this.stockProportion = 15;
  this.totalInvestment = 36;
  this.isAbroad = true;
  this.foreignCapitalProportion = 62;
  this.listStockProportion = 10;
  this.isRiskInvestmentEnterprise = true;
  this.firstInvestmentTime = new Date();
};

InvestmentEquity.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.firstInvestmentTime = str2Date(this.firstInvestmentTime);

};


InvestmentEquity.prototype.getForm = function () {

  let form = {
    investmentId: this.investment.id,
    shareholderType: this.shareholderType,
    shareholderName: this.shareholderName,
    docType: this.docType,
    idNo: this.idNo,
    isList: this.isList,
    isThousandPlan: this.isThousandPlan,
    stockProportion: this.stockProportion,
    totalInvestment: this.totalInvestment,
    isAbroad: this.isAbroad,
    foreignCapitalProportion: this.foreignCapitalProportion,
    listStockProportion: this.listStockProportion,
    isRiskInvestmentEnterprise: this.isRiskInvestmentEnterprise,
    firstInvestmentTime: simpleDateTime(this.firstInvestmentTime)

  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

};
