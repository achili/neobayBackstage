/**
 * Created by Matring on 1/1/17.
 */

import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import MeetingRoom from "./MeetingRoom";
import User from "../user/User";

let Status = {
  OK: "OK",
  PASS: "PASS",
  REJECT: "REJECT"
}

let StatusMap = {
  OK: {
    name: "审核中",
    value: "OK",
    style: "warning"
  },
  PASS: {
    name: "已通过",
    value: "PASS",
    style: "success"
  },
  REJECT: {
    name: "已拒绝",
    value: "REJECT",
    style: "danger"
  }
}

export default function MeetingRecord() {
  BaseEntity.call(this, arguments);

  this.teamName = null;
  this.memberName = null;
  this.phone = null;
  this.mail = null;
  this.beginTime = null;
  this.endTime = null;
  this.date = new Date();
  this.week = 0;
  this.month = 0;
  this.year = 0;
  this.user = new User();
  this.description = null;
  this.meetingRoom = {name: ""};
  this.meetingRoomId = -1;
  this.status = 'OK';
}

MeetingRecord.prototype = new BaseEntity();
MeetingRecord.prototype.constructor = MeetingRecord;
MeetingRecord.prototype.URL_PASS = "/meeting/record/pass/{id}";
MeetingRecord.prototype.URL_REJECT = "/meeting/record/reject/{id}"
MeetingRecord.prototype.Status = Status;
MeetingRecord.prototype.StatusMap = StatusMap;
MeetingRecord.prototype.StatusList = MeetingRecord.prototype.getStatusList();

MeetingRecord.prototype.getFilters = function() {
  return [
    new Filter("SORT", "预订日期", "orderDate"),
    new Filter("INPUT", "团队名称", "teamName"),
    new Filter("INPUT", "申请人", "memberName"),
    new Filter("HTTP_SELECTION", "会议室", "meetingRoomId", null, MeetingRoom),
    new Filter("INPUT", "预定日期", "date"),
    new Filter("INPUT", "周", "week"),
    new Filter("INPUT", "月份", "month"),
    new Filter("INPUT", "年份", "year")
  ];
}





MeetingRecord.prototype.parseTime = function (time) {
  let parseTime = time.split(":");
  let result = parseInt(parseTime[0]);
  if (parseInt(parseTime[1]) === 0){
    return result * 2;
  } else {
    return result * 2 + 1;
  }
}


MeetingRecord.prototype.getForm = function () {
  let form = {
    teamName: this.teamName,
    memberName: this.teamName,
    phone: this.phone,
    mail: this.mail,
    beginTime: this.parseTime(this.beginTime),
    endTime: this.parseTime(this.endTime),
    date: simpleDateTime(this.date),
    description: this.description,
    meetingRoomId: this.meetingRoomId
  };
  if (this.id){
    form.id = this.id;
  }
  return form;
}

MeetingRecord.prototype.httpReject = function (successCallback, errorCallback) {
  let that = this;
  if (!this.id) {

    this.errorMessage = "没有id，无法拒绝！";
    that.defaultErrorHandler(this.errorMessage, errorCallback);

    return;
  }

  let url = this.URL_REJECT.replace("{id}", this.id);

  if (!url) {
    return;
  }

  this.httpPost(url, {}, function (response) {

    successCallback && successCallback(response);

  }, errorCallback);
}

MeetingRecord.prototype.httpPass = function (successCallback, errorCallback) {
  let that = this;
  if (!this.id) {

    this.errorMessage = "没有id，无法通过！";
    that.defaultErrorHandler(this.errorMessage, errorCallback);

    return;
  }

  let url = this.URL_PASS.replace("{id}", this.id);

  if (!url) {
    return;
  }

  this.httpPost(url, {}, function (response) {

    successCallback && successCallback(response);

  }, errorCallback);
}


MeetingRecord.prototype.validate = function () {
  if (!this.teamName){
    this.errorMessage = "团队名称必填！";
    return false;
  }

  if (!this.memberName){
    this.errorMessage = "申请人必填！";
    return false;
  }

  if (!this.beginTime){
    this.errorMessage = "预订开始时间必填!";
    return false;
  }

  if (!this.endTime){
    this.errorMessage = "预订结束时间必填！";
    return false;
  }

  if (this.endTime < this.beginTime){
    this.errorMessage = "结束时间必须大于开始时间！";
    return false;
  }

  if (!this.phone){
    this.errorMessage = "电话号码必填！";
    return false;
  }

  if (!this.mail){
    this.errorMessage = "邮件地址必填！";
    return false;
  }

  if (!this.description){
    this.errorMessage = "申请原因必填！";
    return false;
  }

  if (!this.date){
    this.errorMessage =  "预订日期必填！";
    return false;
  }

  if (!this.meetingRoomId){
    this.errorMessage =  "会议室必填！";
    return false;
  }

  return true;

}
