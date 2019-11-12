import BaseEntity from '../base/BaseEntity'
import { simpleDateTime, str2Date } from '../../filter/time'
import Vue from 'vue'
import Company from './Company'
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


export default function CompanyQualification() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.status = Status.OK;
  this.identificationMechanism = null;
  this.identificationNo = null;
  this.identificationTime = new Date();
  this.reviewTime = new Date();
  this.grantFunds = null;
  this.company = new Company();

  if (Vue.store.state.debug) {
    this.mockData();
  }
}
CompanyQualification.prototype = new BaseEntity();
CompanyQualification.prototype.constructor = CompanyQualification;

CompanyQualification.prototype.Status = Status;
CompanyQualification.prototype.StatusMap = StatusMap;
CompanyQualification.prototype.StatusList = CompanyQualification.prototype.getStatusList();
//测试数据。
CompanyQualification.prototype.mockData = function () {
  this.identificationMechanism = "上海认定局";
  this.identificationNo = "6546654641";
  this.identificationTime = new Date();
  this.reviewTime = new Date();
  this.grantFunds = 564;
}

CompanyQualification.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.identificationTime = str2Date(this.identificationTime);
  this.reviewTime = str2Date(this.reviewTime);


}

CompanyQualification.prototype.getForm = function () {

  let form = {
    identificationMechanism: this.identificationMechanism,
    identificationNo: this.identificationNo,
    identificationTime: simpleDateTime(this.identificationTime),
    reviewTime: simpleDateTime(this.reviewTime),
    grantFunds: this.grantFunds
  };

  if (this.id) {
    form.id = this.id;
  }


  return form;

}

