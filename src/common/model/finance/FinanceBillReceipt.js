import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Vue from 'vue'
import User from '../user/User'
import FinancePayInfo from './FinancePayInfo'
import ProtocolSpace from '../protocol/space/ProtocolSpace'
import { simpleDateTime } from '../../filter/time'
import FinanceElectricPay from "./FinanceElectricPay";
import FinanceOtherPay from "./FinanceOtherPay";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
	OK: "OK"
}

let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "success",
		icon: "hourglass"
	}
}


let Category = {
  ELECTRIC: "ELECTRIC",
  OTHER: "OTHER",
	DEPOSIT: "DEPOSIT",
	RENTAL: "RENTAL"
}

let CategoryMap = {
  ELECTRIC: {
    name: "电费",
    value: "ELECTRIC",
    style: "info"
  },
  OTHER: {
    name: "其他",
    value: "OTHER",
    style: "warning"
  },
	DEPOSIT: {
		name: "履约保证金",
		value: "DEPOSIT",
		style: "success"
	},
	RENTAL: {
		name: "租金",
		value: "RENTAL",
		style: "primary"
	}
}

let Type = {
	//银行转账
	BANK: "BANK",
	//现金支付
	CASH: "CASH",
	//支票
	CHEQUE: "CHEQUE",
	//支付宝
	ALIPAY: "ALIPAY",
	//微信
	WEIXIN: "WEIXIN",
  //从履约保证金中扣
  DEDUCTION: "DEDUCTION",
	//其他
	OTHER: "OTHER"
}

let TypeMap = {
	BANK: {
		name: "银行转账",
		value: "BANK",
		style: "success"
	},
	CASH: {
		name: "现金支付",
		value: "CASH",
		style: "success"
	},
	CHEQUE: {
		name: "支票",
		value: "CHEQUE",
		style: "success"
	},
	ALIPAY: {
		name: "支付宝",
		value: "ALIPAY",
		style: "success"
	},
	WEIXIN: {
		name: "微信",
		value: "WEIXIN",
		style: "success"
	},
  DEDUCTION: {
    name: "从履约保证金中扣除",
    value: "DEDUCTION",
    style: "success"
  },
	OTHER: {
		name: "其他",
		value: "OTHER",
		style: "success"
	}
}

export default function FinanceBillReceipt() {

	BaseEntity.call(this, arguments);


	//被通知的用户
	this.user = new User();

	//操作员
	this.operator = new User();


	//关联的租赁合同。
	this.protocolSpace = new ProtocolSpace();


	//关联的付款信息单。
	this.financePayInfo = new FinancePayInfo();

	//关联的电费付款信息单
  this.financeElectricPay = new FinanceElectricPay();

  //关联的其他付款信息单
  this.financeOtherPay = new FinanceOtherPay();

	//名称 标题。
	this.name = null;

	//合同编号
	this.protocolNo = null;

	//公司或负责人名称
	this.companyName = null;

	//金额
	this.amount = 0;
	//尾差调整
  this.tail = 0;

	//收款时间
	this.receiveTime = new Date();

	//银行
	this.partyABank = null;
	this.partyABankAccount = null;
	this.partyABankNo = null;
	this.partyBBank = null;
	this.partyBBankAccount = null;
	this.partyBBankNo = null;


	//备注
	this.remark = null;


	this.category = Category.RENTAL;

	this.type = Type.BANK;
	//状态
	this.status = Status.OK;


	if (Vue.store.state.debug) {
		this.mockData();
	}
}


FinanceBillReceipt.prototype = new BaseEntity();
FinanceBillReceipt.prototype.constructor = FinanceBillReceipt;
FinanceBillReceipt.prototype.URL_NOTIFICATION = "/finance/bill/receipt/notification/{id}";
FinanceBillReceipt.prototype.URL_DOWNLOAD_PDF = "/finance/bill/receipt/download/pdf/{id}";
FinanceBillReceipt.prototype.URL_STATUS = "/finance/bill/receipt/status";


FinanceBillReceipt.prototype.Status = Status;
FinanceBillReceipt.prototype.StatusMap = StatusMap;
FinanceBillReceipt.prototype.StatusList = FinanceBillReceipt.prototype.getStatusList();

FinanceBillReceipt.prototype.Type = Type;
FinanceBillReceipt.prototype.TypeMap = TypeMap;
FinanceBillReceipt.prototype.TypeList = FinanceBillReceipt.prototype.getTypeList();

FinanceBillReceipt.prototype.registerEnum("Category", CategoryMap);


FinanceBillReceipt.prototype.mockData = function () {


}

FinanceBillReceipt.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
    new Filter('SORT', '收款时间', 'orderReceiveTime'),
    new Filter('HTTP_SELECTION', '付款信息单', 'financePayInfoId', null, FinancePayInfo),
    new Filter('HTTP_SELECTION', '电费付款信息单', 'financeElectricPayId', null, FinanceElectricPay),
    new Filter('HTTP_SELECTION', '其他其他信息单', 'financeOtherPayId', null, FinanceElectricPay),
    new Filter('SELECTION', '付款类型', 'type', this.getTypeList()),
    new Filter('INPUT', '名称', 'name'),
    new Filter('INPUT', '关键字(备注/付款方/名称)', 'keyword'),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object
FinanceBillReceipt.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("user", User);
	this.renderEntity("operator", User);
	this.renderEntity("protocolSpace", ProtocolSpace);
	this.renderEntity("financePayInfo", FinancePayInfo);
	this.renderEntity("financeElectricPay",FinanceElectricPay);
  this.renderEntity("financeOtherPay",FinanceOtherPay);
	this.renderEntity("receiveTime", Date);


}

FinanceBillReceipt.prototype.getForm = function () {

	let form = {
		financePayInfoId: this.financePayInfo.id,
    financeElectricPayId: this.financeElectricPay.id,
    financeOtherPayId: this.financeOtherPay.id,
		companyName: this.companyName,
		amount: this.amount,
    tail: this.tail,
		receiveTime: simpleDateTime(this.receiveTime),
		partyABankAccount: this.partyABankAccount,
		partyABankNo: this.partyABankNo,
		partyBBank: this.partyBBank,
		partyBBankAccount: this.partyBBankAccount,
		partyBBankNo: this.partyBBankNo,
		remark: this.remark,
		category: this.category,
		type: this.type,
		status: this.status
	};
	if (this.id) {
		form.id = this.id;
	}


	return form;

}


FinanceBillReceipt.prototype.validate = function () {

  if (this.category === Category.DEPOSIT) {
    if(this.type === Type.DEDUCTION) {
      this.errorMessage = "不能用扣除的履约保证金交履约保证金";
      return false;
    }
  }
	if (!this.financePayInfo.id && !this.financeElectricPay.id && !this.financeOtherPay.id) {
		this.errorMessage = "必须关联一个付款信息";
		return false;
	}


	if (!this.companyName) {
		this.errorMessage = "公司或负责人必填";
		return false;
	}

	if (!this.amount) {
		this.errorMessage = "金额必填";
		return false;
	}

	if (!this.receiveTime) {
		this.errorMessage = "收款时间必填";
		return false;
	}

	if (!this.category) {
		this.errorMessage = "付款的类型必填";
		return false;
	}

	if (!this.type) {
		this.errorMessage = "支付方式必填";
		return false;
	}

	if (this.type === Type.BANK) {
		if (!this.partyBBank) {
			this.errorMessage = "付款银行必填";
			return false;
		}

		if (!this.partyBBankAccount) {
			this.errorMessage = "付款银行户名必填";
			return false;
		}

		if (!this.partyBBankNo) {
			this.errorMessage = "付款银行账号必填";
			return false;
		}


	}
	this.errorMessage = null;
	return true;
}

FinanceBillReceipt.prototype.fillByFinancePayInfo = function (financePayInfo) {

	this.financePayInfo = financePayInfo;
	this.name = financePayInfo.companyName + "的付款单";
	this.companyName = financePayInfo.companyName;

	this.partyABank = financePayInfo.bank;
	this.partyABankAccount = financePayInfo.bankAccount;
	this.partyABankNo = financePayInfo.bankNo;
}
FinanceBillReceipt.prototype.fillByFinanceElectricPay = function (financeElectricPay) {

  this.financeElectricPay = financeElectricPay;
  this.name = financeElectricPay.companyName + "的电费付款单";
  this.category = Category.ELECTRIC;
  this.companyName = financeElectricPay.companyName;

  this.partyABank = financeElectricPay.bank;
  this.partyABankAccount = financeElectricPay.bankAccount;
  this.partyABankNo = financeElectricPay.bankNo;
}
FinanceBillReceipt.prototype.fillByFinanceOtherPay = function (financeOtherPay) {

  this.financeOtherPay = financeOtherPay;
  this.name = financeOtherPay.companyName + "的" + financeOtherPay.beneficiaryName + "付款单";
  this.category = Category.OTHER;
  this.companyName = financeOtherPay.companyName;

  this.partyABank = financeOtherPay.bank;
  this.partyABankAccount = financeOtherPay.bankAccount;
  this.partyABankNo = financeOtherPay.bankNo;
}

FinanceBillReceipt.prototype.canEdit = function (financePayInfo) {
	return false;
}
FinanceBillReceipt.prototype.canDel = function (financePayInfo) {

	return true;
}
