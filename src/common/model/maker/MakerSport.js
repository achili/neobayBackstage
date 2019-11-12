import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import User from "../user/User";
import Project from "../project/Project";
import {str2Date} from "../../filter/time";
import Vue from "vue";
import {saveToLocalStorage} from "../../util/Utils";

export default function MakerSport() {

  BaseEntity.call(this, arguments);
  this.creator = new User();
  this.project = new Project();
  this.companyName = null;
  this.projectName = null;
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;
  this.date = new Date();
}


MakerSport.prototype = new BaseEntity();
MakerSport.prototype.constructor = MakerSport;

MakerSport.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "项目名称", "projectName"),
    new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false)
  ];
};

MakerSport.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.date = str2Date(this.date);
  this.renderEntity("creator", User);
};

MakerSport.prototype.getForm = function () {
  let form = {
    projectId: this.project.id,
    companyName: this.companyName,
    projectName: this.projectName,
    leaderName: this.leaderName,
    leaderPhone: this.leaderPhone,
    leaderEmail: this.leaderEmail
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

MakerSport.prototype.validate = function () {
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

  return true;
};

MakerSport.prototype.saveToLocalStorage = function () {
  this.errorMessage = null;

  saveToLocalStorage(this.getTAG(), JSON.stringify(this));
};



