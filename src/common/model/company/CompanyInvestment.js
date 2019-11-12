import BaseEntity from "../base/BaseEntity";
import {simpleDateTime, str2Date} from "../../filter/time";
import Vue from "vue";
import Company from "./Company";
let Status = {
	OK: "OK",
	ERROR: "ERROR"
}

let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "success"
	},
	ERROR: {
		name: "错误",
		value: "ERROR",
		style: "error"
	}
}


export default function CompanyInvestment() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.status = Status.OK;
  this.investmentTime = new Date();
  this.investmentPeople = null;
  this.investmentValue = null;
  this.shareRatio = null;
  this.valuation = null;
  this.isHatchFund = null;
  this.company = new Company();
  
  if (Vue.store.state.debug) {
    this.mockData();
  }
}
CompanyInvestment.prototype = new BaseEntity();
CompanyInvestment.prototype.constructor = CompanyInvestment;


CompanyInvestment.prototype.Status = Status;
CompanyInvestment.prototype.StatusMap = StatusMap;
CompanyInvestment.prototype.StatusList = CompanyInvestment.prototype.getStatusList();

//测试数据。
CompanyInvestment.prototype.mockData = function () {
  this.investmentTime = new Date();
  this.investmentPeople = "张嘉诚";
  this.investmentValue = 500;
  this.shareRatio = 20;
  this.valuation = 65;
  this.isHatchFund = false;
}

CompanyInvestment.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.investmentTime = str2Date(this.investmentTime);

}

CompanyInvestment.prototype.getForm = function () {

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

}
