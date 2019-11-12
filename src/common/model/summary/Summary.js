import Vue from "vue";

import BaseEntity from "../base/BaseEntity";
import Pager from "../base/Pager";
import SummaryAttribute from "./SummaryAttribute";
import Attribute from "../template/Attribute";
import Article from '../article/Article'
import { simpleDateTime } from '../../filter/time'
import Filter from '../base/Filter'
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  OK: "OK"
}

let StatusMap = {
  OK: {
    name: "OK",
    value: "OK",
    style: "success",
    icon: "hourglass"
  }
}


export default function Summary() {

  BaseEntity.call(this, arguments);
  this.name = null;
  this.description = null;
  this.mainEntityClazz = null;
  this.summaryAttributeInfo = [];


  //界面控制
  this.mainEntityPackage = null;
  this.pageSize = null;
  this.page = null;

  this.token = null;

  if (Vue.store.state.debug) {
    this.mockData();
  }
}

Summary.prototype = new BaseEntity();
Summary.prototype.constructor = Summary;
Summary.prototype.URL_REPORT = "/summary/report";
Summary.prototype.URL_EXPORT_EXCEL = "/summary/export/excel?token={token}";//
Summary.prototype.URL_EXCEL  = '/summary/export/excel/get/token';

Summary.prototype.Status = Status;
Summary.prototype.StatusMap = StatusMap;
Summary.prototype.StatusList = Summary.prototype.getStatusList();

Summary.prototype.getFilters = function () {
  return [
    new Filter(Filter.prototype.Type.SORT, 'ID', 'orderId'),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//测试数据。
Summary.prototype.mockData = function () {
  //this.summaryAttributeInfo = [new SummaryAttribute(), new SummaryAttribute()];
}

//We use this method to get the full js Object
Summary.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);
  if(this.summaryAttributeInfo) {
    if(this.summaryAttributeInfo.length !== 0) {
      this.summaryAttributeInfo = JSON.parse(this.summaryAttributeInfo);
    }
  }


}

Summary.prototype.httpReport = function (page, pageSize,spaceRegional ,successCallback, failureCallback) {

  if(!this.mainEntityPackage) {
    this.summary.errorMessage = "请先选择主要数据！";
    return;
  }
  if (!this.spaceRegional.id) {
    this.errorMessage = "请先选择所属园区！";
    return;
  }
  this.page = page;
  this.pageSize = pageSize;
  this.spaceRegional = spaceRegional;
  let form = {
    mainEntityClazz: this.mainEntityPackage,
    summaryAttributeInfo: JSON.stringify(this.summaryAttributeInfo),
    page: this.page,
    pageSize: this.pageSize,
    spaceRegional: this.spaceRegional.id
  };
  let that = this;
  this.httpPost(this.URL_REPORT, form, function (response) {
    successCallback && successCallback(response.data.pager);
  }, failureCallback);
}


Summary.prototype.exportExcelUrl = function (successCallback, failureCallback) {
  let that = this;
  let url = "";
  if(!this.mainEntityPackage) {
    this.errorMessage = "请先选择主要数据！";
    return;
  }

  let form = {
    mainEntityClazz: this.mainEntityPackage,
    summaryAttributeInfo: JSON.stringify(this.summaryAttributeInfo),
    spaceRegional: this.spaceRegional.id
  };
  if (this.id) {
    form.id = this.id;
  }
  this.httpPost(this.URL_EXCEL, form, function (response) {
    that.token = response.data;
    that.showUrl(response.data);
   successCallback && successCallback(response);

  }, failureCallback);

  // let form = {
  //   mainEntityClazz: this.mainEntityPackage,
  //   summaryAttributeInfo: JSON.stringify(this.summaryAttributeInfo)
  // };
  // this.httpPost(this.URL_EXPORT_EXCEL, form, function (response) {
  //   successCallback && successCallback(pager);
  // }, failureCallback);
  // url = Vue.http.options.root + this.URL_EXPORT_EXCEL.replace("{mainEntityClazz}", this.mainEntityPackage).replace("{summaryAttributeInfo}", JSON.stringify(this.summaryAttributeInfo));
  // return url;
}

Summary.prototype.showUrl = function (token){
  let url = "";
  if(token != null){
    url = Vue.http.options.root + this.URL_EXPORT_EXCEL.replace("{token}",token);
    window.open(url);
    return url;
  }
};

Summary.prototype.getForm = function () {

  let form = {
    name: this.name,
    description: this.description,
    mainEntityClazz: this.mainEntityPackage,
    summaryAttributeInfo: JSON.stringify(this.summaryAttributeInfo),
    spaceRegional:this.spaceRegional.id
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;

}

Summary.prototype.validate = function () {
  this.errorMessage = null;
  if (!this.name) {
    this.errorMessage = "名称必填！";
    return false;
  }
  if (!this.mainEntityClazz) {
    this.errorMessage = "主要数据对象必填！";
    return false;
  }
  if (!this.summaryAttributeInfo.length) {
    this.errorMessage = "请至少选择一个属性！";
    return false;
  }
  return true;
}
