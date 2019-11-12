import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import User from "../user/User";
import Project from "../project/Project";
import {simpleDateTime, str2Date} from "../../filter/time";
import Vue from "vue";
import {saveToLocalStorage} from "../../util/Utils";

export default function MakerHotel() {

  BaseEntity.call(this, arguments);
  this.creator = new User();
  this.project = new Project();
  this.companyName = null;
  this.projectName = null;
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;
  this.hotelStyle = null;
  this.numberPerson = null;
  this.numberHotel = null;
  this.startTime = new Date();
  this.endTime = new Date();
  this.isIncubatingEnterprise = null;
  this.isBusinessTravel = null;
  this.isAgree = null;
}


MakerHotel.prototype = new BaseEntity();
MakerHotel.prototype.constructor = MakerHotel;

MakerHotel.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "项目名称", "projectName"),
    new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false)
  ];
};

MakerHotel.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("creator", User);
  this.renderEntity("project", Project);
  this.renderEntity("startTime", Date);
  this.renderEntity("endTime", Date);
};

MakerHotel.prototype.getForm = function () {
  let form = {
    projectId: this.project.id,
    companyName: this.companyName,
    projectName: this.projectName,
    leaderName: this.leaderName,
    leaderPhone: this.leaderPhone,
    leaderEmail: this.leaderEmail,
    startTime: simpleDateTime(this.startTime),
    endTime: simpleDateTime(this.endTime),
    hotelStyle: this.hotelStyle,
    numberPerson: this.numberPerson,
    numberHotel: this.numberHotel,
    isIncubatingEnterprise: this.isIncubatingEnterprise,
    isBusinessTravel: this.isBusinessTravel,
    isAgree: this.isAgree
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

MakerHotel.prototype.validate = function () {
  if (!this.projectName) {
    this.errorMessage = "项目名称必填！";
    return false;
  }
  if (!this.leaderName) {
    this.errorMessage = "联系人姓名必填！";
    return false;
  }
  if (!this.leaderPhone) {
    this.errorMessage = "联系人手机必填！";
    return false;
  }
  if (!this.leaderEmail) {
    this.errorMessage = "联系人邮箱必填！";
    return false;
  }
  if(!this.startTime){
    this.errorMessage = "活动结束时间必填！";
    return false;
  }
  if(!this.endTime){
    this.errorMessage = "活动结束时间必填！";
    return false;
  }

  return true;
};

MakerHotel.prototype.saveToLocalStorage = function () {
  this.errorMessage = null;

  saveToLocalStorage(this.getTAG(), JSON.stringify(this));
};



