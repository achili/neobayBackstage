import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Filter from "../base/Filter";
import Project from "../project/Project";
import {simpleDateTime} from "../../filter/time";
import SpaceRegional from "../space/SpaceRegional";


let Status = {
  OK: "OK",
  FALSE: "FALSE"
};
let StatusMap = {
  FALSE: {
    name: "未完成",
    value: "FALSE",
    style: "danger"
  },
  OK: {
    name: "已完成",
    value: "OK",
    style: "success"
  }

};
export default function Teamwork() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.name = null;
  this.projects = [];
  this.tags = [];
  this.leader = null;
  this.participants = [];
  this.estimateTime = new Date();
  this.actualTime = new Date();
  this.status = Status.FALSE;

}

Teamwork.prototype = new BaseEntity();
Teamwork.prototype.constructor = Teamwork;

Teamwork.prototype.URL_STATUS = "/teamwork/status";

Teamwork.prototype.Status = Status;
Teamwork.prototype.StatusMap = StatusMap;
Teamwork.prototype.StatusList = Teamwork.prototype.getStatusList();

Teamwork.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("SELECTION", "状态", "status", this.getStatusList()),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)


  ];
};

Teamwork.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("creator", User);
  this.renderEntity("estimateTime", Date);
  this.renderList("projects",Project);
  this.renderList('participants', User);

};

Teamwork.prototype.getForm = function () {

  let projectsIds = [];
  if (this.projects && this.projects.length) {
    for (let i = 0; i < this.projects.length; i++) {
      let project = this.projects[i];
      projectsIds.push(project.id);
    }
  }
  let participantsIds = [];
  if (this.participants && this.participants.length) {
    for (let i = 0; i < this.participants.length; i++) {
      let user = this.participants[i];
      participantsIds.push(user.id);
    }
  }
  let form = {
    name: this.name,
    projectsIds: JSON.stringify(projectsIds),
    tags: JSON.stringify(this.tags),
    leader:this.leader,
    participantsIds: JSON.stringify(participantsIds),
    estimateTime: simpleDateTime(this.estimateTime),
    spaceRegional:this.spaceRegional.id

  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};
Teamwork.prototype.validate = function () {

  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必填！";
    return false;
  }

  if (!this.name) {
    this.errorMessage = "工作任务名称必填！";
    return false;
  }

  if (!this.leader) {
    this.errorMessage = "负责人必填！";
    return false;
  }

  if (!this.estimateTime) {
    this.errorMessage = "预计完成日期必填！";
    return false;
  }

  return true;
};
Teamwork.prototype.httpStatus = function (status, successCallback, failureCallback) {
  this.httpPost(this.URL_STATUS, {"id": this.id, status}, successCallback, failureCallback);
  return true;
};
