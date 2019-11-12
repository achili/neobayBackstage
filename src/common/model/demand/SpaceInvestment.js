import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Project from "../project/Project";
import Filter from "../base/Filter";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  UNTREATED: "UNTREATED",
  PROCESSED: "PROCESSED"
};
let StatusMap = {
  UNTREATED: {
    name: "未处理",
    value: "UNTREATED",
    style: "success"
  },
  PROCESSED: {
    name: "已处理",
    value: "PROCESSED",
    style: "danger"
  }
};

export default function SpaceInvestment() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.project = new Project();
  this.projectName = null;
  this.projectLeader = null;
  this.spaceArea = null;
  this.remark = null;
  this.status = Status.UNTREATED;

}

SpaceInvestment.prototype = new BaseEntity();
SpaceInvestment.prototype.constructor = SpaceInvestment;

SpaceInvestment.prototype.URL_STATUS = "/space/investment/status";

SpaceInvestment.prototype.Status = Status;
SpaceInvestment.prototype.StatusMap = StatusMap;
SpaceInvestment.prototype.StatusList = SpaceInvestment.prototype.getStatusList();

SpaceInvestment.prototype.getFilters = function () {
  return[
    new Filter("SORT", "ID", "orderId"),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter("SELECTION", "状态", "status", this.getStatusList(), null, true, true),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ]
};

SpaceInvestment.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
  this.renderEntity("project", Project);


};

SpaceInvestment.prototype.getForm = function () {
  let form = {
    projectId: this.project.id,
    projectName: this.projectName,
    projectLeader: this.projectLeader,
    spaceArea: this.spaceArea,
    remark: this.remark
  };
  if(this.id){
    form.id = this.id;
  }
  return form;
};

SpaceInvestment.prototype.validate = function () {

  if (!this.projectName) {
    this.errorMessage = "项目名称必填！";
    return false;
  }
  if (!this.projectLeader) {
    this.errorMessage = "负责人必填！";
    return false;
  }

  return true;
};

SpaceInvestment.prototype.httpStatus = function (status, successCallback, failureCallback) {

  this.httpPost(this.URL_STATUS, {"id": this.id, status}, successCallback, failureCallback);
  return true;
};
