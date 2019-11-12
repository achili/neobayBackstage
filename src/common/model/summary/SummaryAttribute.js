import Vue from "vue";

import BaseEntity from "../base/BaseEntity";
import Attribute from "../template/Attribute";
import Pager from "../base/Pager";
import Filter from "../base/Filter";

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


export default function SummaryAttribute(parentFilter) {

  BaseEntity.call(this, arguments);
  //属性名（英文）
  this.name = null;
  //属性名（中文）
  this.description = null;
  //包名
  this.packageName = null;
  //是否是简单属性
  this.isPrimitive = true;
  //排序信息
  this.sort = null;
  //筛选信息
  this.filter = null;


  //控制UI的
  this.isOpen = false;
  this.isShow = true;
  this.simpleDescription  = null;
  this.parentFilter = parentFilter;

  if (Vue.store.state.debug) {
    this.mockData();
  }
}

SummaryAttribute.prototype = new BaseEntity();
SummaryAttribute.prototype.constructor = SummaryAttribute;

SummaryAttribute.prototype.Status = Status;
SummaryAttribute.prototype.StatusMap = StatusMap;
SummaryAttribute.prototype.StatusList = SummaryAttribute.prototype.getStatusList();

//测试数据。
SummaryAttribute.prototype.mockData = function () {
  //this.description = "测试数据";
}

SummaryAttribute.prototype.getFilters = function () {
  return [];
};

SummaryAttribute.prototype.render = function (obj, one2one = false) {
  BaseEntity.prototype.render.call(this, obj);
}

SummaryAttribute.prototype.renderByAttribute = function (attribute, parentAttribute, parentFilter) {
  this.name = attribute.name;
  this.packageName = attribute.clazz;
  this.description = attribute.description;
  this.simpleDescription = attribute.description;
  this.isPrimitive = attribute.primitive;
  if(parentAttribute) {
    this.parentFilter = parentAttribute.parentFilter;
    this.name = parentAttribute.name + "." + attribute.name;
    this.description = parentAttribute.description + "." + attribute.description;
  } else {
    this.parentFilter = parentFilter;
  }

}

SummaryAttribute.prototype.isRepetition = function () {
  if(this.name.indexOf(".") >= 0) {
    let arr = this.name.split(".");
    if(arr.indexOf(this.name.substring(this.name.indexOf(".") + 1, this.name.length)) < arr.length - 1) {
      return true;
    }
    if(arr.indexOf(this.parentFilter) !== -1) {
      return true;
    }
  }
  return false;
}




SummaryAttribute.prototype.getListByAttributeList = function (attributeList, parentAttribute, parentFilter) {
  if(!attributeList || !(attributeList instanceof Array)) {
    console.error("attributeList not Array in renderListByAttribute ")
  }
  let summaryAttributeList = [];
  attributeList.forEach(attributeItem => {
    if(attributeItem.isStatistically) {
      let summaryAttributeItem = new SummaryAttribute();
      summaryAttributeItem.renderByAttribute(attributeItem, parentAttribute, parentFilter);
      summaryAttributeList.push(summaryAttributeItem)
    }
  })
  return summaryAttributeList;
}


