import BaseEntity from "../../base/BaseEntity";

import User from "../../user/User";
import Filter from "../../base/Filter";
import Tank from "../../tank/Tank";

export default function BoingPayCashier() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.name = "会议室";
  this.introduce = "详细说明";
}

BoingPayCashier.prototype = new BaseEntity();
BoingPayCashier.prototype.constructor = BoingPayCashier;
BoingPayCashier.prototype.URL_ORDER = "/boing/pay/order";

BoingPayCashier.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword')
  ];
};

BoingPayCashier.prototype.render = function (obj,one2one = false) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
};

BoingPayCashier.prototype.httpFetchCode = function (no, successCallback, errorCallback) {
  let form = {
    pay_interface_no: no
  };
  this.httpPost(this.URL_ORDER, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};
