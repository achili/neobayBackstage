import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import {simpleDateTime} from "../../../filter/time";
import {MessageBox, Notification as NotificationBox} from 'element-ui'
import User from "../../user/User";
import SpaceRoom from "../../space/SpaceRoom";
import ConferenceRoom from "../../conference/ConferenceRoom";

let Status = {
  OK: "OK",
  ERROR: "ERROR"
};
let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "success"
  },
  ERROR: {
    name: "错误",
    value: "ERROR",
    style: "error"
  }
};
export default function ISpaceGrantAuthority() {
  BaseEntity.call(this, arguments);
  //this.creator = null;
  //this.visitor = null;
  this.startDateTime = new Date();
  this.endDateTime = new Date();
  //this.doorList = [];
  this.type = false;
  //this.doorEditList = [];
  this.status = Status.OK;
  this.user = new User();
  this.users = new User();
  this.room = new SpaceRoom();
  this.conference = new ConferenceRoom();
}
//extend BaseEntity
ISpaceGrantAuthority.prototype = new BaseEntity();
ISpaceGrantAuthority.prototype.constructor = ISpaceGrantAuthority;
ISpaceGrantAuthority.prototype.Status = Status;
ISpaceGrantAuthority.prototype.StatusMap = StatusMap;
ISpaceGrantAuthority.prototype.StatusList = ISpaceGrantAuthority.prototype.getStatusList();

ISpaceGrantAuthority.prototype.URL_PAGE = "/i/space/grant/authority/page";  //分页查询权限赋予

ISpaceGrantAuthority.prototype.getFilters = function () {
  return [
    new Filter("SORT", "id", "id")
  ];
};

ISpaceGrantAuthority.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("startDateTime", Date);
  this.renderEntity("endDateTime", Date);
  this.renderEntity("user", User);
  this.renderEntity("users", User);
  this.renderEntity("room",SpaceRoom);
  this.renderEntity("conference",ConferenceRoom);
  //this.doorList = JSON.parse(this.doorList)
};

ISpaceGrantAuthority.prototype.getForm = function () {
  let form = {
    //creator: this.creator,
    //visitor: this.visitor,
    creatorUserId: this.users.id,
    visitorUserId: this.user.id,
    roomId: this.room.id,
    conferenceId: this.conference.id,
    startDateTime: simpleDateTime(this.startDateTime),
    endDateTime: simpleDateTime(this.endDateTime),
    //doorList: JSON.stringify(this.doorList),
    type: this.type
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

/*判断必填项是否为空或者是否符合要求*/
ISpaceGrantAuthority.prototype.validate = function () {
  if (!this.user.id) {
    this.errorMessage = "请选择被赋予权限者！";
    return false;
  }
  if (!this.startDateTime) {
    this.errorMessage = "请选择开始日期时间！";
    return false;
  }
  if (!this.endDateTime) {
    this.errorMessage = "请选择结束日期！";
    return false;
  }
  if (this.endDateTime) {
    let startDateTime = this.startDateTime;
    let endDateTime = this.endDateTime;
    if (startDateTime.getTime() >= endDateTime.getTime()) {
      this.errorMessage = "结束日期时间不能“小于或等于”开始日期时间！";
      return false;
    }
  }
  if (!this.room.id && !this.conference.id) {
    this.errorMessage = "请选择房间或会议室！";
    return false;
  }
  if (this.room.id && this.conference.id) {
    this.errorMessage = "房间和会议室二选一！";
    return false;
  }
  /*if (!this.doorList) {
    this.errorMessage = "门禁ID集合必填！";
    return false;
  }*/
  return true;
}

