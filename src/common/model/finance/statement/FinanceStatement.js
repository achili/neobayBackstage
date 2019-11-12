import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import Vue from "vue";
import FinanceStatementItem from "./FinanceStatementItem";
import FinanceStatementItemBill from "./FinanceStatementItemBill";
import FinanceStatementItemRent from "./FinanceStatementItemRent";
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
  this.cur = 1;

	//合同条目数
	this.items = [];

	//每月租金
	this.rental = 0;

	//创新券总额
	this.totoalInnoToken = 0;

	//每月创新券抵扣金额
	this.innoToken = 0;

	this.realRental = 0;

	//应收履约保证金
	this.deposit = 0;

	//实收履约保证金
	this.receiptDeposit = 0;

	//应收履约保证金余额
	this.balanceDeposit = 0;

	//附带了每一次账单汇总情况
	this.bills = [];

	this.rents = [];


	//应收总额
	this.amount = 0;

	//实收总额
	this.receiptAmount = 0;

	//应收余额
	this.balanceAmount = 0;

	//创新券抵扣总额
	this.innoTokenTotal = 0;

	//最大付款次数
	this.maxPayTimes = 0;

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
FinanceStatement.prototype.render = function (obj) {
	Base.prototype.render.call(this, obj);
	this.renderList("items", FinanceStatementItem);
	this.renderList("bills", FinanceStatementItemBill);
	this.renderList("rents", FinanceStatementItemRent);
	for (let i = 0; i < this.items.length; i++) {
		let item = this.items[i];
		item.updateTds(this.maxPayTimes);
		for (let j = 0; j < item.rents.length; j++) {
      console.log("哈哈哈")
      let item2 = item[j];
      item2.updataRents();

    }
	}

}

FinanceStatement.prototype.getForm = function () {
	let form = {
    cur: this.cur
  };
	if (this.id) {
		form.id = this.id;
	}
	return form;

}


FinanceStatement.prototype.validate = function () {
	return true;
}

FinanceStatement.prototype.httpReport = function (successCallback, failureCallback) {
  console.log("这儿来了吗1");
  let form = {
    cur: this.cur
  }
	let that = this;
	this.httpPost(this.URL_REPORT, form, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}


