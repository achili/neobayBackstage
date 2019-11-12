import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import User from "../user/User";
import Project from "../project/Project";
import {str2Date} from "../../filter/time";
import {saveToLocalStorage} from "../../util/Utils";
import MakerOrganization from './MakerOrganization'
import SpaceRegional from "../space/SpaceRegional";
import InvestmentAssess from "../investment/InvestmentAssess";
import KeeperBusiness from "../keeper/business/KeeperBusiness";

let Status = {
  PROCESSING: "PROCESSING",
  FINISH: "FINISH",
  REFUSE: "REFUSE",
  PASS: "PASS"
};
let StatusMap = {
  PROCESSING: {
    name: "正在进行中",
    value: "PROCESSING",
    style: "info"
  },
  FINISH: {
    name: "审核通过",
    value: "FINISH",
    style: "success"
  },
  REFUSE: {
    name: "拒绝申请",
    value: "REFUSE",
    style: "danger"
  }
};


export default function MakerSimpleApply() {

  BaseEntity.call(this, arguments);
  this.creator = new User();
  this.project = new Project();
  this.project = new Project();
  this.makerOrganization = new MakerOrganization();

  this.companyName = null;
  this.projectName = null;
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;
  this.reason = null;
  this.projectManagers = [];
  this.no = null;
  this.type = null;
  this.status = Status.PROCESSING;
}


MakerSimpleApply.prototype = new BaseEntity();
MakerSimpleApply.prototype.constructor = MakerSimpleApply;

MakerSimpleApply.prototype.URL_STATUS = "/maker/simple/apply/status";
MakerSimpleApply.prototype.URL_ASSESS = "/maker/simple/apply/assess";

MakerSimpleApply.prototype.URL_ARCHIVE = "/maker/simple/apply/archive";

MakerSimpleApply.prototype.URL_NOTIFY = "/maker/simple/apply/notify";
MakerSimpleApply.prototype.URL_NOTIFICATION = "/maker/simple/apply/notification";

MakerSimpleApply.prototype.Status = Status;
MakerSimpleApply.prototype.StatusMap = StatusMap;
MakerSimpleApply.prototype.StatusList = MakerSimpleApply.prototype.getStatusList();

MakerSimpleApply.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "项目名称", "projectName"),
    new Filter("CHECK", "归档", "archive"),
    new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

MakerSimpleApply.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.date = str2Date(this.date);
  this.renderEntity("makerOrganization", MakerOrganization);
  this.renderList('projectManagers', User);
  this.renderEntity("creator", User);
  this.renderEntity("project", Project);

};

MakerSimpleApply.prototype.getForm = function () {
  let projectManagersIds = [];
  if (this.projectManagers && this.projectManagers.length) {
    for (let i = 0; i < this.projectManagers.length; i++) {
      let user = this.projectManagers[i];
      projectManagersIds.push(user.id);
    }
  }
  let form = {
    projectId: this.project.id,
    makerOrganizationId: this.makerOrganization.id,
    companyName: this.companyName,
    projectName: this.projectName,
    leaderName: this.leaderName,
    leaderPhone: this.leaderPhone,
    leaderEmail: this.leaderEmail,
    projectManagers: JSON.stringify(projectManagersIds)

};
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

MakerSimpleApply.prototype.validate = function () {
  if (!this.makerOrganization.id) {
    this.errorMessage = "未知的服务机构！";
    return false;
  }
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

//在发送notification之前应该调用notify方法
MakerSimpleApply.prototype.httpNotify = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_NOTIFY, form, successCallback, failureCallback);
};

//获取该实体应有的notification.
MakerSimpleApply.prototype.httpNotification = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  };
  this.httpPost(this.URL_NOTIFICATION, form, successCallback, failureCallback);
};

MakerSimpleApply.prototype.saveToLocalStorage = function () {
  this.errorMessage = null;

  saveToLocalStorage(this.getTAG(), JSON.stringify(this));
};

//从当前状态允许变成的下一个状态列表
MakerSimpleApply.prototype.finishStatusList = function () {
  let list = [];
  list.push(this.StatusMap[this.Status.FINISH]);
  list.push(this.StatusMap[this.Status.REFUSE]);
  return list;
};

MakerSimpleApply.prototype.httpStatus = function (status, reason,projectManagers, successCallback, failureCallback) {
  let projectManagersIds = [];
  if (this.projectManagers && this.projectManagers.length) {
    for (let i = 0; i < this.projectManagers.length; i++) {
      let user = this.projectManagers[i];
      projectManagersIds.push(user.id);
    }
  }
  let form = {
    "id": this.id,
    "status": status,
    "reason": reason,
    "projectManagers":JSON.stringify(projectManagersIds)
  };
  let that = this;
  this.httpPost(this.URL_STATUS, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};

//项目评价
MakerSimpleApply.prototype.httpAssess = function (service,comment, successCallback, failureCallback) {

  this.httpPost(this.URL_ASSESS, {"id": this.id, service,comment}, successCallback, failureCallback);
};

//归档操作。
MakerSimpleApply.prototype.httpArchive = function (reason, successCallback, failureCallback) {

  let that = this;

  let form = {
    id: this.id,
    archive: !this.archive,
    reason: reason
  };

  if (!this.URL_ARCHIVE) {
    console.error("没有定义URL_ARCHIVE");
    return;
  }
  this.httpPost(this.URL_ARCHIVE, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);

}
