import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Filter from "../base/Filter";

export default function OnlinePay() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.name = "会议室";
  this.introduce = "详细说明";
}

OnlinePay.prototype = new BaseEntity();
OnlinePay.prototype.constructor = OnlinePay;
OnlinePay.prototype.URL_ONLINE_PAY_ORDER = "/online/pay/order";
OnlinePay.prototype.URL_ONLINE_PAY_PC_PAYMENT = "/online/pay/pc/payment";

OnlinePay.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword')
  ];
};

OnlinePay.prototype.render = function (obj,one2one = false) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
};

OnlinePay.prototype.httpPayOrder = function (successCallback, errorCallback) {
  this.httpPost(this.URL_ONLINE_PAY_ORDER, {}, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

OnlinePay.prototype.httpPcPayment = function (id, successCallback, errorCallback) {
  let form = {
    id: id
  };
  this.httpPost(this.URL_ONLINE_PAY_PC_PAYMENT, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};
