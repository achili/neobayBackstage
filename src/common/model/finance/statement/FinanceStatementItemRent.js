import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import Vue from "vue";
import Base from "../../base/Base";

let Status = {
  OK: "OK"
}

let StatusMap = {
  OK: {
    name: "OK",
    value: "OK",
    style: "success",
    icon: "hourglass"
  }
}

//此类中的时间均为字符串，无需特殊处理。
export default function FinanceStatement() {

  Base.call(this, arguments);

  //检索编号
  this.indexNo = null;

  //楼号
  this.buildNo = null;

  //租赁房屋
  this.space = null;

  //合同编号
  this.protocolNo = null;

  if (Vue.store.state.debug) {
    this.mockData();
  }
}


FinanceStatement.prototype = new Base();
FinanceStatement.prototype.constructor = FinanceStatement;
FinanceStatement.prototype.URL_REPORT = "/finance/statement/report";


FinanceStatement.prototype.Status = Status;
FinanceStatement.prototype.StatusMap = StatusMap;
FinanceStatement.prototype.StatusList = FinanceStatement.prototype.getStatusList();


FinanceStatement.prototype.mockData = function () {

}

FinanceStatement.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "名称", "orderName"),
    new Filter("SELECTION", "状态", "status", this.getStatusList())
  ];
};

//We use this method to get the full js Object
FinanceStatement.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);


}

FinanceStatement.prototype.getForm = function () {
  let form = {};
  if (this.id) {
    form.id = this.id;
  }
  return form;
}


FinanceStatement.prototype.validate = function () {
  return true;
}

FinanceStatement.prototype.httpReport = function (params, successCallback, failureCallback) {
  console.log("这儿来了吗2");
  let that = this;
  this.httpPost(this.URL_PAGE, params, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
}
