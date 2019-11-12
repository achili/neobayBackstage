import BaseEntity from "../base/BaseEntity";

import User from "../user/User";
import Filter from "../base/Filter";
import Tank from "../tank/Tank";

export default function BoingPay() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.name = "会议室";
  this.introduce = "详细说明";
}

BoingPay.prototype = new BaseEntity();
BoingPay.prototype.constructor = BoingPay;

BoingPay.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword')
  ];
};

BoingPay.prototype.render = function (obj,one2one = false) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
};


