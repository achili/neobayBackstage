import BaseEntity from "../base/BaseEntity";
import {simpleDateTime, str2Date} from "../../filter/time";
import Vue from "vue";
import Investment from "./Investment";

export default function InvestmentFinancing() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.investmentTime = new Date();
  this.investmentPeople = null;
  this.investmentValue = null;
  this.shareRatio = null;
  this.valuation = null;
  this.isHatchFund = null;
  this.investment = new Investment();

  if (Vue.store.state.debug) {
    this.mockData();
  }
}
InvestmentFinancing.prototype = new BaseEntity();
InvestmentFinancing.prototype.constructor = InvestmentFinancing;


//测试数据。
InvestmentFinancing.prototype.mockData = function () {
  this.investmentTime = new Date();
  this.investmentPeople = "张嘉诚";
  this.investmentValue = 500;
  this.shareRatio = 20;
  this.valuation = 65;
  this.isHatchFund = false;
};

InvestmentFinancing.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.investmentTime = str2Date(this.investmentTime);

};

InvestmentFinancing.prototype.getForm = function () {

  let form = {
    investmentTime: simpleDateTime(this.investmentTime),
    investmentPeople: this.investmentPeople,
    investmentValue: this.investmentValue,
    shareRatio: this.shareRatio,
    valuation: this.valuation,
    isHatchFund: this.isHatchFund
  };

  if (this.id) {
    form.id = this.id;
  }


  return form;

};
