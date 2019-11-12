import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import Vue from "vue";
import FinanceStatementItemBill from "./FinanceStatementItemBill";
import Base from "../../base/Base";
import {simpleDateTime} from "../../../filter/time";
import {Notification} from 'element-ui';
import Survey from "../../survey/Survey";

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

	//合同状态
	this.status = Status.OK;

	//检索编号
	this.indexNo = 0;

	//合同编号
	this.protocolNo = null;

	//名称
	this.companyName = null;

	//联系负责人
	this.leader = null;

	//联系方式
	this.phone = null;

	//租赁房屋/工位
	this.space = null;

	//面积
	this.area = 0;

	//租赁期限
	this.dateRange = null;

	//每月租金
	this.rental = 0;

	//创新券总额
	this.totalInnoToken = 0;

	//每月创新券抵扣金额
	this.innoToken = 0;

	//实际每月租金
	this.realRental = 0;

	//应收履约保证金
	this.deposit = 0;

	//实收履约保证金
	this.receiptDeposit = 0;

	//应收履约保证金余额
	this.balanceDeposit = 0;


	//分次付款信息
	this.bills = [];

	//应收总额
	this.amount = 0;

	//实收总额
	this.receiptAmount = 0;

	//应收余额
	this.balanceAmount = 0;

	//创新券抵扣总额
	this.innoTokenTotal = 0;

	//实际渲染的时候需要一个
	this.tds = [];

	this.rents = [];

	if (Vue.store.state.debug) {
		this.mockData();
	}
}


FinanceStatement.prototype = new Base();
FinanceStatement.prototype.constructor = FinanceStatement;
FinanceStatement.prototype.URL_REPORT = "/finance/statement/report";
FinanceStatement.prototype.URL_REFRESH_ENSURE = "/finance/statement/refresh/ensure";
FinanceStatement.prototype.URL_REFRESH_ELECTRIC = "/finance/statement/refresh/electric";
FinanceStatement.prototype.URL_REFRESH_BALANCE = "/finance/statement/refresh/balance";
FinanceStatement.prototype.URL_REFRESH_RENT = "/finance/statement/refresh/rent";


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
	Base.prototype.render.call(this, obj);
	this.renderList("bills", FinanceStatementItemBill);
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
  console.log("这儿来了吗3");
	let that = this;
	this.httpPost(this.URL_PAGE, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
};

FinanceStatement.prototype.downloadXls = function (chooseDate, type, name,space, isNotZero, isNotExpire, isNotArchive, isNotException,isNotPayment,isNotEnergy) {
  if (!type) {
    Notification.error({
      message: '表名称必选！'
    });
  } else {
    window.location = Vue.http.options.root + "/finance/statement/download/xls?type=" +
      type + "&chooseDate=" + simpleDateTime(chooseDate) + "&name=" + name + "&spaceRegional=" + space +
      "&isNotZero=" + isNotZero + "&isNotExpire=" + isNotExpire + "&isNotArchive=" + isNotArchive + "&isNotException=" + isNotException + "&isNotPayment=" + isNotPayment + "&isNotEnergy=" + isNotEnergy;
  }
};

//刷新房租表单
FinanceStatement.prototype.httpRefreshRent = function (form, successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_REFRESH_RENT, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};

//刷新履约保证金表单
FinanceStatement.prototype.httpRefreshEnsure = function (form, successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_REFRESH_ENSURE, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};

//刷新电费表单
FinanceStatement.prototype.httpRefreshElectric = function (form, successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_REFRESH_ELECTRIC, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};

//刷新余额表单
FinanceStatement.prototype.httpRefreshBalance = function (form, successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_REFRESH_BALANCE, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};

FinanceStatement.prototype.updataRents = function () {
  this.rents.push(this.indexNo);
  this.rents.push(this.buildNo);
  this.rents.push(this.space);
  this.rents.push(this.protocolNo);
  this.rents.push(this.companyName);
  this.rents.push(this.dateRange);
  this.rents.push(this.rentStartTime);
};

FinanceStatement.prototype.updateTds = function (maxPayTimes) {
  this.tds.splice(0, this.tds.length);
  this.tds.push(this.status);
  this.tds.push(this.indexNo);
  this.tds.push(this.protocolNo);
  this.tds.push(this.protocolNo);
  this.tds.push(this.companyName);
  this.tds.push(this.leader);
  this.tds.push(this.phone);
  this.tds.push(this.space);
  this.tds.push(this.area);
  this.tds.push(this.dateRange);
  this.tds.push(this.rental);
  this.tds.push(this.totalInnoToken);
  this.tds.push(this.innoToken);
  this.tds.push(this.realRental);

  this.tds.push(this.deposit);
  this.tds.push(this.receiptDeposit);
  this.tds.push(this.balanceDeposit);


  for (let i = 0; i < maxPayTimes; i++) {

    if (i < this.bills.length) {
      let bill = this.bills[i];
      this.tds.push(bill.startTime);
      this.tds.push(bill.notifyTime);
      this.tds.push(bill.amount);
      this.tds.push(bill.innoToken);
      this.tds.push(bill.receiptAmount);
      this.tds.push(bill.balanceAmount);
    } else {
      for (let j = 0; j < 6; j++) {
        this.tds.push("");
      }
    }
  }


  this.tds.push(this.amount);
  this.tds.push(this.receiptAmount);
  this.tds.push(this.balanceAmount);
  this.tds.push(this.innoTokenTotal);


}
