import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Filter from "../base/Filter";
import {simpleDateTime} from "../../filter/time";
import ConferenceRoom from "./ConferenceRoom";
import BoingPayCashier from "../boingpay/cashier/BoingPayCashier";
import SpaceRegional from "../space/SpaceRegional";
import OnlinePay from "../pay/OnlinePay";

let Status = {
  NOT_RECEIVE:'NOT_RECEIVE',
  RECEIVE:'RECEIVE',
  BE_OVERDUE:'BE_OVERDUE',
  MEETING:'MEETING',
  END:'END',
  WAIT:"WAIT",
  REFUNDED:"REFUNDED",
  CONFIRMATION:'CONFIRMATION'
};
let StatusMap = {
  NOT_RECEIVE:{
    value: "NOT_RECEIVE",
    name:"未处理",
    style: "warning"
  },
  RECEIVE:{
    value: "RECEIVE",
    name:"已处理",
    style: "success"
  },
  BE_OVERDUE:{
    value: "BE_OVERDUE",
    name:"已过期",
    style: "danger"
  },
  MEETING:{
    value: "MEETING",
    name:"正在开会",
    style: "warning"
  },
  END:{
    value: "END",
    name:"已结束会议",
    style: "success"
  },
  WAIT:{
    value: "WAIT",
    name:"待支付",
    style: "warning"
  },
  CONFIRMATION:{
    value: "CONFIRMATION",
    name:"已支付",
    style: "success"
  },
  REFUNDED:{
    value: "REFUNDED",
    name:"已退款",
    style: "warning"
  }
};

export default function ConferenceRoomReservation() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.conferenceRoom = new ConferenceRoom();
  this.name = "默认类型";
  this.startTime = new Date();
  this.endTime = new Date();
  this.price = null;
  this.location = null;
  this.remarks = null;
  this.status = Status.NOT_RECEIVE;

}

ConferenceRoomReservation.prototype = new BaseEntity();
ConferenceRoomReservation.prototype.constructor = ConferenceRoomReservation;

ConferenceRoomReservation.prototype.URL_STATUS = "/conference/room/reservation/status";
ConferenceRoomReservation.prototype.URL_ORDER = "/conference/room/reservation/order";
ConferenceRoomReservation.prototype.URL_QUERY_PAY = "/conference/room/reservation/query/pay/result";
ConferenceRoomReservation.prototype.QUERY_PAY_STATE_URL = "/conference/room/reservation/query/pay/state";
ConferenceRoomReservation.prototype.URL_CANCEL_PAY = "/conference/room/reservation/order/refund";

ConferenceRoomReservation.prototype.Status = Status;
ConferenceRoomReservation.prototype.StatusMap = StatusMap;
ConferenceRoomReservation.prototype.StatusList = ConferenceRoomReservation.prototype.getStatusList();

ConferenceRoomReservation.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter('SELECTION', '发布日期', 'status',this.getStatusList()),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

ConferenceRoomReservation.prototype.render = function (obj,one2one = false) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
  this.renderEntity("startTime", Date);
  this.renderEntity("endTime", Date);
  this.renderEntity("conferenceRoom", ConferenceRoom);
};

ConferenceRoomReservation.prototype.getForm = function () {
  let form = {
    conferenceRoomId: this.conferenceRoom.id,
    name: this.name,
    price: this.price,
    startTime: simpleDateTime(this.startTime),
    endTime: simpleDateTime(this.endTime),
    location: this.location,
    remarks: this.remarks
  };
  if(this.id){
    form.id = this.id;
  }
  return form;
};

ConferenceRoomReservation.prototype.validate = function () {
  if (!this.conferenceRoom.id) {
    this.errorMessage = "请选择一个会议室！";
    return false;
  }
  if (!this.startTime) {
    this.errorMessage = "开始时间必填！";
    return false;
  }
  if (!this.endTime) {
    this.errorMessage = "结束时间必填！";
    return false;
  }

  return true;
};

ConferenceRoomReservation.prototype.httpStatus = function (status, successCallback, failureCallback) {
  this.httpPost(this.URL_STATUS, {"id": this.id, status}, successCallback, failureCallback);
  return true;
};

ConferenceRoomReservation.prototype.httpFetchCode = function (no, entity,isPay,successCallback, errorCallback) {
  let form = {
    id: entity.id,
    pay_interface_no:no,
    isPay:isPay
  };
  this.httpPost(this.URL_ORDER, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};
ConferenceRoomReservation.prototype.httpQueryPayResult = function (entity,successCallback, errorCallback) {
  let form = {
    id: entity.id
  };
  this.httpPost(this.URL_QUERY_PAY, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

ConferenceRoomReservation.prototype.httpPcPayment = function (entity, isPay, successCallback, errorCallback) {
  let form = {
    id: entity.id,
    isPay:isPay
  };
  this.httpPost(this.URL_ORDER, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

ConferenceRoomReservation.prototype.httpQueryPayState = function (id,successCallback, errorCallback) {
  let form = {
    id: id
  };
  this.httpPost(this.QUERY_PAY_STATE_URL, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

ConferenceRoomReservation.prototype.httpCancelPay = function (entity,successCallback, errorCallback) {
  let form = {
    id: entity.id
  };
  this.httpPost(this.URL_CANCEL_PAY, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

