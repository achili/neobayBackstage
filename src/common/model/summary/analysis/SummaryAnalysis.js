import Vue from "vue";

import Base from "../../base/Base";
import User from "../../user/User";
import SummaryAnalysisResult from "./SummaryAnalysisResult";
import SummaryAttribute from "./../SummaryAttribute";
import { simpleDateTime } from '../../../filter/time'
import Filter from "../../base/Filter";
import BaseEntity from "../../base/BaseEntity";
import SpaceRegional from "../../space/SpaceRegional";

let TimeIntervalType = {
  NONE: "NONE",
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  QUARTER: "QUARTER",
  YEAR: "YEAR"
}
let TimeIntervalTypeMap = {
  NONE: {
    name: "不按时间变化",
    value: "NONE",
    style: "success",
    icon: "hourglass"
  },
  DAY: {
    name: "按天",
    value: "DAY",
    style: "success",
    icon: "hourglass"
  },
  WEEK: {
    name: "按周",
    value: "WEEK",
    style: "success",
    icon: "hourglass"
  },
  MONTH: {
    name: "按月",
    value: "MONTH",
    style: "success",
    icon: "hourglass"
  },
  QUARTER: {
    name: "按季度",
    value: "QUARTER",
    style: "success",
    icon: "hourglass"
  },
  YEAR: {
    name: "按年",
    value: "YEAR",
    style: "success",
    icon: "hourglass"
  }
}

let CumulativeType = {
  CUMULATIVE: "CUMULATIVE",
  NOT_CUMULATIVE: "NOT_CUMULATIVE"
}
let CumulativeTypeMap = {
  CUMULATIVE: {
    name: "累计",
    value: "CUMULATIVE",
    style: "success",
    icon: "hourglass"
  },
  NOT_CUMULATIVE: {
    name: "不累计",
    value: "NOT_CUMULATIVE",
    style: "success",
    icon: "hourglass"
  }
}


export default function SummaryAnalysis() {

  BaseEntity.call(this, arguments);
  //创建者
  this.creator = new User();
  //主数据对象
  this.mainEntityClazz = null;
  //属性名称(如果需要分析的是某个属性不是数量)
  this.fieldName = null;
  //表标题
  this.title = "图表分析";
  //表述名
  this.note = "图表分析";
  //时间间隔类型
  this.timeIntervalType = TimeIntervalType.MONTH;
  //累加类型
  this.cumulativeType = CumulativeType.CUMULATIVE;
  //时间间隔的属性(如果需要按照时间间隔)
  this.timeFieldName = null;
  //开始时间(如果需要按照时间间隔)
  this.startTime = new Date();
  //结束时间(如果需要按照时间间隔)
  this.endTime = new Date();
  //分组要求(如果需要分组)
  this.classifyAttribute = null;
  //筛选表(是一个SummaryAttribute数组)
  this.filtersInfo = [];

  if (Vue.store.state.debug) {
    this.mockData();
  }
}


SummaryAnalysis.prototype = new BaseEntity();
SummaryAnalysis.prototype.constructor = SummaryAnalysis;
SummaryAnalysis.prototype.URL_REPORT = "/summary/analysis/report";

//注册两个枚举
SummaryAnalysis.prototype.registerEnum("TimeIntervalType", TimeIntervalTypeMap);
SummaryAnalysis.prototype.registerEnum("CumulativeType", CumulativeTypeMap);

SummaryAnalysis.prototype.getFilters = function () {
  return [
    new Filter(Filter.prototype.Type.SORT, 'ID', 'orderId'),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//测试数据。
SummaryAnalysis.prototype.mockData = function () {
  this.mainEntityClazz = "cn.neobay.jay.app.model.project.Project";
  this.fieldName = null;
  this.title = "测试表";
  this.note = "测试表";
  this.timeIntervalType = TimeIntervalType.WEEK;
  this.cumulativeType = CumulativeType.CUMULATIVE;
  this.timeFieldName = "createTime";
  this.startTime = new Date('2017.7.1');
  this.endTime = new Date('2017.9.1');
  this.classifyAttribute = "status";
  this.filtersInfo = [];
}

//We use this method to get the full js Object
SummaryAnalysis.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("creator", User);

  this.renderEntity("startTime", Date);
  this.renderEntity("endTime", Date);

  if(this.filtersInfo){
    if(this.filtersInfo.length !== 0){
      this.filtersInfo = JSON.parse(this.filtersInfo);
    }
  }

}

SummaryAnalysis.prototype.getForm = function () {

  let form = {
    mainEntityClazz: this.mainEntityClazz,
    fieldName: this.fieldName,
    title: this.title,
    note: this.note,
    timeIntervalType: this.timeIntervalType,
    cumulativeType: this.cumulativeType,
    timeFieldName: this.timeFieldName,
    startTime: simpleDateTime(this.startTime),
    endTime: simpleDateTime(this.endTime),
    classifyAttribute: this.classifyAttribute,
    filtersInfo: JSON.stringify(this.filtersInfo),
    spaceRegional:this.spaceRegional.id
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
}


SummaryAnalysis.prototype.httpReport = function (successCallback, errorCallback) {

  let that = this;
  let url = this.URL_REPORT;
  if (!this.validate()) {
    that.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  this.httpPost(url, this.getForm(), function (response) {
    let summaryAnalysisResult = new SummaryAnalysisResult();
    summaryAnalysisResult.render(response.data[summaryAnalysisResult.getTAG()]);
    successCallback && successCallback(summaryAnalysisResult);
  }, errorCallback);
}

SummaryAnalysis.prototype.validate = function () {
  this.errorMessage = null;
  if (!this.mainEntityClazz) {
    this.errorMessage = "主数据对象必填！";
    return false;
  }
  if (!this.title) {
    this.errorMessage = "标题必填！";
    return false;
  }
  if (!this.timeIntervalType) {
    this.errorMessage = "时间间隔类型必填！";
    return false;
  }
  if(this.timeIntervalType !== TimeIntervalType.NONE) {
    if (!this.startTime) {
      this.errorMessage = "开始时间必填！";
      return false;
    }
    if (!this.endTime) {
      this.errorMessage = "结束时间必填！";
      return false;
    }
    if (!this.timeFieldName) {
      this.errorMessage = "日期属性必填！";
      return false;
    }
  }
  return true;
};
