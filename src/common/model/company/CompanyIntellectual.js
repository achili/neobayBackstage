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


export default function CompanyIntellectual() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.status = Status.OK;
  this.intellectualType = null;
  this.occurrenceTime = new Date();
  this.intellectualNo = null;
  this.intellectualName = null;
  this.intellectualStatus = null;
  this.isEffective = null;
  this.company = new Company();
  
  if (Vue.store.state.debug) {
    this.mockData();
  }
}
CompanyIntellectual.prototype = new BaseEntity();
CompanyIntellectual.prototype.constructor = CompanyIntellectual;
CompanyIntellectual.prototype.Status = Status;
CompanyIntellectual.prototype.StatusMap = StatusMap;
CompanyIntellectual.prototype.StatusList = CompanyIntellectual.prototype.getStatusList();

//测试数据。
CompanyIntellectual.prototype.mockData = function () {
  this.intellectualType = "商标";
  this.occurrenceTime = new Date();
  this.intellectualNo = "8541631635123";
  this.intellectualName = "华莱士商标";
  this.intellectualStatus = "受理";
  this.isEffective = true;
}

CompanyIntellectual.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.occurrenceTime = str2Date(this.occurrenceTime);

}
CompanyIntellectual.prototype.getForm = function () {

  let form = {
    intellectualType: this.intellectualType,
    occurrenceTime: simpleDateTime(this.occurrenceTime),
    intellectualNo: this.intellectualNo,
    intellectualName: this.intellectualName,
    intellectualStatus: this.intellectualStatus,
    isEffective: this.isEffective

  };
  if (this.id) {
    form.id = this.id;
  }


  return form;

}
