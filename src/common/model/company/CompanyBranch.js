import BaseEntity from "../base/BaseEntity";
import Company from "./Company";

import Vue from "vue";

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


export default function CompanyBranch() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.status = Status.OK;
  this.name = null;
  this.address = null;
  this.company = new Company();
  
  if (Vue.store.state.debug) {
    this.mockData();
  }
}
CompanyBranch.prototype = new BaseEntity();
CompanyBranch.prototype.constructor = CompanyBranch;

CompanyBranch.prototype.Status = Status;
CompanyBranch.prototype.StatusMap = StatusMap;
CompanyBranch.prototype.StatusList = CompanyBranch.prototype.getStatusList();

//测试数据。
CompanyBranch.prototype.mockData = function () {
  this.name = "X国子公司";
  this.address = "当然是在X国啦！";
}

//We use this method to get the full js Object.
CompanyBranch.prototype.render = function(obj){
  BaseEntity.prototype.render.call(this,obj);
}


CompanyBranch.prototype.getForm = function () {

  let form = {
    name: this.name,
    address: this.address

  };
  if (this.id) {
    form.id = this.id;
  }


  return form;

}
