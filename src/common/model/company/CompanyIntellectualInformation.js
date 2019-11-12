import BaseEntity from "../base/BaseEntity";
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


export default function CompanyIntellectualInformation() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.status = Status.OK;
  this.year = null;
  this.intellectualApplyNum = null;
  this.intellectualInventionApplyNum = null;
  this.authorizationNum = null;
  this.authorizationInventionNum = null;
  this.effectiveIntellectualNum = null;
  this.effectiveIntellectualInventionNum = null;
  this.softwareCopyrightNum = null;
  this.newPlantNum = null;
  this.integratedCircuitNum = null;
  this.otherPowerNum = null;
  this.company = new Company();
  
  if (Vue.store.state.debug) {
    this.mockData();
  }
  
}
CompanyIntellectualInformation.prototype = new BaseEntity();
CompanyIntellectualInformation.prototype.constructor = CompanyIntellectualInformation;


CompanyIntellectualInformation.prototype.Status = Status;
CompanyIntellectualInformation.prototype.StatusMap = StatusMap;
CompanyIntellectualInformation.prototype.StatusList = CompanyIntellectualInformation.prototype.getStatusList();
//测试数据。
CompanyIntellectualInformation.prototype.mockData = function () {
  this.year = "2016";
  this.intellectualApplyNum = 13;
  this.intellectualInventionApplyNum = 13;
  this.authorizationNum = 13;
  this.authorizationInventionNum = 13;
  this.effectiveIntellectualNum = 13;
  this.effectiveIntellectualInventionNum = 13;
  this.softwareCopyrightNum = 13;
  this.newPlantNum = 13;
  this.integratedCircuitNum = 13;
  this.otherPowerNum = 13;
}

//We use this method to get the full js Object.
CompanyIntellectualInformation.prototype.render = function(obj){
  BaseEntity.prototype.render.call(this,obj);
}

CompanyIntellectualInformation.prototype.getForm = function () {

  let form = {
    year: this.year,
    intellectualApplyNum: this.intellectualApplyNum,
    intellectualInventionApplyNum: this.intellectualInventionApplyNum,
    authorizationNum: this.authorizationNum,
    authorizationInventionNum: this.authorizationInventionNum,
    effectiveIntellectualNum: this.effectiveIntellectualNum,
    effectiveIntellectualInventionNum: this.effectiveIntellectualInventionNum,
    softwareCopyrightNum: this.softwareCopyrightNum,
    newPlantNum: this.newPlantNum,
    integratedCircuitNum: this.integratedCircuitNum,
    otherPowerNum: this.otherPowerNum

  };
  if (this.id) {
    form.id = this.id;
  }


  return form;

}
