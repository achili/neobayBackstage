import BaseEntity from "../../../base/BaseEntity";
import Filter from "../../../base/Filter";
import User from "../../../user/User";
import Project from "../../Project";
import ProjectAdministrator from "./ProjectAdministratorInvitation";
import { Type as AdministratorType } from '../ProjectAdministratorType'

let Status = {
  NEW: "NEW",
  HANDLED: "HANDLED",
  OVERDUE: "OVERDUE"
}
let StatusMap = {
  NEW: {
    name: "尚未接受邀请",
    value: "NEW",
    style: "info"
  },
  HANDLED: {
    name: "已接受邀请",
    value: "HANDLED",
    style: "success"
  },
  OVERDUE: {
    name: "过期",
    value: "OVERDUE",
    style: "danger"
  }
}
let Type = {
  INSIDE: "INSIDE",
  MAIL: "MAIL"
}
let TypeMap = {
  INSIDE: {
    name: "站内邀请",
    value: "INSIDE",
    style: "success"
  },
  MAIL: {
    name: "邮件邀请",
    value: "MAIL",
    style: "info"
  }
}


export default function ProjectAdministratorInvitation() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);

  this.creator = new User();

  this.project = new Project();
  this.users = [];
  this.jurisdiction = AdministratorType.ORDINARY;

  this.mail = null;


  this.type = Type.INSIDE;
  this.note = null;

  this.secretKey = null;
  this.link = null;
  this.status = Status.NEW;

}

//extend BaseEntity
ProjectAdministratorInvitation.prototype = new BaseEntity();
ProjectAdministratorInvitation.prototype.constructor = ProjectAdministratorInvitation;

ProjectAdministratorInvitation.prototype.Status = Status;
ProjectAdministratorInvitation.prototype.StatusMap = StatusMap;
ProjectAdministratorInvitation.prototype.StatusList = ProjectAdministratorInvitation.prototype.getStatusList();
ProjectAdministratorInvitation.prototype.Type = Type;
ProjectAdministratorInvitation.prototype.TypeMap = TypeMap;
ProjectAdministratorInvitation.prototype.TypeList = ProjectAdministratorInvitation.prototype.getTypeList();

ProjectAdministratorInvitation.prototype.URL_VERIFICATION = '/project/administrator/invitation/verification'
ProjectAdministratorInvitation.prototype.URL_ACCEPT = '/project/administrator/invitation/accept'


ProjectAdministratorInvitation.prototype.getFilters = function () {
  return [

  ];
};


//We use this method to get the full js Object.
ProjectAdministratorInvitation.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);

  this.renderEntity("creator", User);
  this.renderEntity("project", Project);

};


ProjectAdministratorInvitation.prototype.getForm = function () {
  let ids = [];
  for (let i = 0; i < this.users.length; i++) {
    let user = this.users[i];
    ids.push(user.id);
  }
  let form = {
    projectId: this.project.id,
    userIdsInfo: JSON.stringify(ids),
    jurisdiction: this.jurisdiction,
    mail: this.mail,
    type: this.type,
    note: this.note
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;

};

ProjectAdministratorInvitation.prototype.validate = function () {
  if (!this.project.id) {
    this.errorMessage = "请关联一个项目！";
    return false;
  }
  if (!this.type) {
    console.log(this.type);
    this.errorMessage = "类型必填！";
    return false;
  }
  if (!this.jurisdiction) {
    this.errorMessage = "角色类型必填！";
    return false;
  }
  if(this.type === Type.INSIDE) {
    if (!this.users.length) {
      this.errorMessage = "邀请用户不能为空！";
      return false;
    }
    if (!this.users.length > 10) {
      this.errorMessage = "一次邀请的用户不能大于10个！";
      return false;
    }
  }
  if(this.type === Type.MAIL) {
    if (!this.mail) {
      this.errorMessage = "请填写邮件地址！";
      return false;
    }
  }

  return true;
}

ProjectAdministratorInvitation.prototype.httpVerification = function (successCallback, failureCallback) {

  let params = {
    key: this.secretKey
  }
  let that = this;
  this.httpPost(this.URL_VERIFICATION, params, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);

}

//同意加入项目
ProjectAdministratorInvitation.prototype.httpAccept = function (successCallback, failureCallback) {

  let params = {
    key: this.secretKey
  }
  let that = this;
  this.httpPost(this.URL_ACCEPT, params, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);

}
