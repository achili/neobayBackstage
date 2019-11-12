import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Project from "../project/Project";
import Filter from "../base/Filter";
import ProjectMentor from "../project/ProjectMentor";
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

export default function SpaceRoomMessage() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.no = null;
  this.area = null;
  this.project = new Project();
  this.projectLeader = null;
  this.projectMentor = new ProjectMentor();
  this.remark = null;
  this.status = Status.UNTREATED;

}

SpaceRoomMessage.prototype = new BaseEntity();
SpaceRoomMessage.prototype.constructor = SpaceRoomMessage;

SpaceRoomMessage.prototype.URL_STATUS = "/space/room/message/status";

SpaceRoomMessage.prototype.Status = Status;
SpaceRoomMessage.prototype.StatusMap = StatusMap;
SpaceRoomMessage.prototype.StatusList = SpaceRoomMessage.prototype.getStatusList();

SpaceRoomMessage.prototype.getFilters = function () {
  return[
    new Filter("SORT", "ID", "orderId"),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter("SELECTION", "状态", "status", this.getStatusList(), null, true, true),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ]
};

SpaceRoomMessage.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
  this.renderEntity("project", Project);
  this.renderEntity("projectMentor",ProjectMentor);

};

SpaceRoomMessage.prototype.getForm = function () {
  let form = {
    no: this.no,
    area: this.area,
    projectId: this.project.id,
    projectLeader: this.projectLeader,
    projectMentorId: this.projectMentor.id,
    remark: this.remark
  };
  if(this.id){
    form.id = this.id;
  }
  return form;
};

SpaceRoomMessage.prototype.validate = function () {

  if (!this.no) {
    this.errorMessage = "房间号必填！";
    return false;
  }
  if (!this.area) {
    this.errorMessage = "面积必填！";
    return false;
  }

  return true;
};

SpaceRoomMessage.prototype.httpStatus = function (status, successCallback, failureCallback) {

  this.httpPost(this.URL_STATUS, {"id": this.id, status}, successCallback, failureCallback);
  return true;
};
