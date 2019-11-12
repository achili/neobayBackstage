import BaseEntity from "../../base/BaseEntity";
import User from "../../user/User";
import Project from "../../project/Project";
import Filter from "../../base/Filter";
import MakerCardMember from "./MakerCardMember";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../util/Utils";
import MakerApartment from "../MakerApartment";
import SpaceRegional from "../../space/SpaceRegional";

let Status = {
  PROCESSING: "PROCESSING",
  FINISH: "FINISH"
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
  }
};

export default function MakerCard() {

  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.project = new Project();
  this.projectName = null;
  this.companyName = null;
  this.type = null;
  this.entranceGuardOne = [];
  this.entranceGuardTwo = [];
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;

  this.makerCardMembers = [];
  this.status = Status.PROCESSING;

};

MakerCard.prototype = new BaseEntity();
MakerCard.prototype.constructor = MakerCard;

MakerCard.prototype.URL_STATUS = "/maker/card/status";

MakerCard.prototype.Status = Status;
MakerCard.prototype.StatusMap = StatusMap;
MakerCard.prototype.StatusList = MakerCard.prototype.getStatusList();

MakerCard.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ]
};

MakerCard.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
  this.renderEntity("project", Project);
  this.renderList("makerCardMembers", MakerCardMember);

};

MakerCard.prototype.getForm = function () {

  let entranceGuardOne = this.entranceGuardOne;
  let entranceGuardOneInfo = [];
  for (let i = 0; i < entranceGuardOne.length; i++) {
    let market = entranceGuardOne[i];
    entranceGuardOneInfo.push(market);
  }

  let entranceGuardTwo = this.entranceGuardTwo;
  let entranceGuardTwoInfo = [];
  for (let i = 0; i < entranceGuardTwo.length; i++) {
    let market = entranceGuardTwo[i];
    entranceGuardTwoInfo.push(market);
  }

  let makerCardMembers = this.makerCardMembers;
  let makerCardMembersInfo = [];
  for (let i = 0; i < makerCardMembers.length; i++) {
    let makerCardMember = makerCardMembers[i];
    makerCardMembersInfo.push(makerCardMember.getForm());
  }

  let form = {
    projectId: this.project.id,
    projectName: this.projectName,
    companyName: this.companyName,
    type: this.type,
    entranceGuardOne: JSON.stringify(entranceGuardOneInfo),
    entranceGuardTwo: JSON.stringify(entranceGuardTwoInfo),
    leaderName: this.leaderName,
    leaderPhone: this.leaderPhone,
    leaderEmail: this.leaderEmail,
    makerCardMembersInfo: JSON.stringify(makerCardMembersInfo)

  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

MakerCard.prototype.validate = function () {
  if (!this.project.id) {
    this.errorMessage = "请选择一个项目！";
    return false;
  }
  if (!this.projectName) {
    this.errorMessage = "项目名称必填！";
    return false;
  }
  if (!this.companyName) {
    this.errorMessage = "企业名称必填！";
    return false;
  }
  if (this.type === null) {
    this.errorMessage = "请选择申请卡的类型！";
    return false;
  }
  if (!this.entranceGuardOne[0] && !this.entranceGuardTwo[0]) {
    this.errorMessage = "请选择授权门禁！";
    return false;
  }
  if (!this.leaderName) {
    this.errorMessage = "联系人必填！";
    return false;
  }
  if (!this.leaderPhone) {
    this.errorMessage = "电话必填！";
    return false;
  }
  if (!this.leaderEmail) {
    this.errorMessage = "邮箱必填！";
    return false;
  }
  if (this.makerCardMembers.length < 1) {
    this.errorMessage = "至少需要添加一名申请人！";
    return false;
  }
  this.errorMessage = null;
  return true;
};

//添加申请人
MakerCard.prototype.addMakerCardMember = function () {
  let makerCardMember = new MakerCardMember();
  this.makerCardMembers.push(makerCardMember);
};

MakerCard.prototype.subMakerCardMember = function (index) {
  if (index !== -1) {
    this.makerCardMembers.splice(index, 1)
  }
};
//将信息从本地读取出来。
MakerCard.prototype.renderFromLocalStorage = function () {
  try {
    let String = readLocalStorage(this.getTAG());
    if (String) {
      let json = JSON.parse(String);
      this.render(json);
    }
  } catch (e) {
    removeLocalStorage(this.getTAG());
  }
};
//将用户信息存储在本地。
MakerCard.prototype.saveToLocalStorage = function () {
  //保存到本地的时候默认不显示任何错误了
  this.errorMessage = null;
  saveToLocalStorage(this.getTAG(), JSON.stringify(this));
};
//清除本地信息
MakerCard.prototype.clearLocalStorage = function () {
  removeLocalStorage(this.getTAG());
};

//从当前状态允许变成的下一个状态列表
MakerCard.prototype.finishStatusList = function () {
  let list = [];
  list.push(this.StatusMap[this.Status.FINISH]);
  return list;
};

MakerCard.prototype.httpStatus = function (status, reason, successCallback, failureCallback) {
  let form = {
    "id": this.id,
    "status": status,
    "reason": reason
  };
  let that = this;
  this.httpPost(this.URL_STATUS, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};
