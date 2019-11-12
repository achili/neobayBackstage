/**
 *
 * Created by lxd on 03/05/2017.
 */
import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import User from "../user/User";
import KeeperBusiness from "../keeper/business/KeeperBusiness";

let Status = {
  UNTREATED: "UNTREATED",
  PROCESSED: "PROCESSED"
}
let StatusMap = {
  UNTREATED: {
    name: "未处理",
    value: "UNTREATED",
    style: "success",
    icon: "hourglass"
  },
  PROCESSED: {
    name: "已处理",
    value: "PROCESSED",
    style: "info",
    icon: "check"

  }
}

export default function OfficialPolicyQuery() {
	BaseEntity.call(this, arguments);

	this.user = new User();
	this.name = null;
  this.phone = null;
  this.title = null;
	this.content = null;
	this.remark = null;
	this.status = Status.UNTREATED;

}

//extend BaseEntity
OfficialPolicyQuery.prototype = new BaseEntity();
OfficialPolicyQuery.prototype.constructor = OfficialPolicyQuery;

OfficialPolicyQuery.prototype.URL_STATUS = "/official/policy/query/status";

OfficialPolicyQuery.prototype.Status = Status;
OfficialPolicyQuery.prototype.StatusMap = StatusMap;
OfficialPolicyQuery.prototype.StatusList = OfficialPolicyQuery.prototype.getStatusList();

OfficialPolicyQuery.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
    new Filter("SELECTION", "状态", "status", this.getStatusList())

  ];
};

OfficialPolicyQuery.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("user", User);

}


OfficialPolicyQuery.prototype.getForm = function () {

  let form = {
    name: this.name,
    phone: this.phone,
    title: this.title,
    content: this.content,
    remark: this.remark
  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

};


OfficialPolicyQuery.prototype.validate = function () {

  if (!this.name) {
    this.errorMessage = "姓名必填！";
    return false;
  }

  if (!this.phone) {
    this.errorMessage = "电话必填！";
    return false;
  }
  if (!this.content) {
    this.errorMessage = "内容必填！";
    return false;
  }

  return true;
};

OfficialPolicyQuery.prototype.httpStatus = function (params, successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_STATUS, params, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
}
