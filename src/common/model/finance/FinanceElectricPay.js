import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Vue from 'vue'
import User from '../user/User'
import { simpleDateTime } from '../../filter/time'
import ProtocolSpace from "../protocol/space/ProtocolSpace";
import FinancePayInfo from "./FinancePayInfo";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  //缴款中
  PAYING: "PAYING",
  //完成缴纳任务
  FINISH: "FINISH"
}
let StatusMap = {
  PAYING: {
    name: "缴款中",
    value: "PAYING",
    style: "warning",
    icon: "hourglass"
  },
  FINISH: {
    name: "完成",
    value: "FINISH",
    style: "primary",
    icon: "check"
  }
}

export default function FinanceElectricPay() {

	BaseEntity.call(this, arguments);

	//付款的租赁合同
  this.protocolSpace = new ProtocolSpace();
	//被通知的用户
  this.user = new User();
  //操作员
  this.operator = new User();
  //名称 标题
  this.name = null;
  //公司或承租团队
  this.companyName = null;
  //签约时间
  this.signTime = new Date();
  //合同编号
  this.protocolNo = null;
  //开始时间
  this.startTime = new Date();
  //结束时间
  this.endTime = new Date();
  //初始电表读数
  this.initialMeter = null;
  //上期电表读数
  this.lastMeter = null;
  //本期电表读数
  this.currentMeter = null;
  //本期应缴电费度数
  this.paymentMeter = null;
  //本期应缴电费金额
  this.currentMoney = null;
  //应付合计
  this.paymentTotal = null;
  //已付金额
  this.paid = null;
  //从履约金中扣除
  this.deduction = null;
  //应付金额
  this.remainTotal = null;
  //开户银行
  this.bank = Vue.store.state.preference.bank;
  //银行户名
  this.bankAccount = Vue.store.state.preference.bankName;
  //银行账号
  this.bankNo = Vue.store.state.preference.bankNo;
  //最后付款时间
  this.notifyTime = new Date();
  //财务部联系人
  this.dutyName = Vue.store.state.preference.financeDuty;
  this.dutyPhone = Vue.store.state.preference.financePhone;
  this.dutyAddress = Vue.store.state.preference.financeAddress;
  //备注
  this.remark = null;
	//状态
	this.status = Status.PAYING;
	//归档
  this.archive = false;

  //租赁空间上对应的空间号
  this.spaceName = "(创建后自动生成)";

  //解入银行时间
  this.bankTime = new Date();

  if (Vue.store.state.debug) {
		this.mockData();
	}
}


FinanceElectricPay.prototype = new BaseEntity();
FinanceElectricPay.prototype.constructor = FinanceElectricPay;

FinanceElectricPay.prototype.URL_STATUS = "/finance/electric/pay/status";
FinanceElectricPay.prototype.URL_DOWNLOAD_PDF = "/finance/electric/pay/download/pdf/{id}";
FinanceElectricPay.prototype.URL_NOTIFY = "/finance/electric/pay/notify";
FinanceElectricPay.prototype.URL_NOTIFICATION = "/finance/electric/pay/notification";
FinanceElectricPay.prototype.URL_REMINDER = "/finance/electric/pay/reminder";
FinanceElectricPay.prototype.URL_ARCHIVE = "/finance/electric/pay/archive";
FinanceElectricPay.prototype.URL_INVOICE = "/finance/electric/pay/invoice";




FinanceElectricPay.prototype.Status = Status;
FinanceElectricPay.prototype.StatusMap = StatusMap;
FinanceElectricPay.prototype.StatusList = FinanceElectricPay.prototype.getStatusList();

FinanceElectricPay.prototype.mockData = function () {

}

FinanceElectricPay.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "名称", "orderName"),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter("SELECTION", "状态", "status", this.getStatusList()),
    new Filter(Filter.prototype.Type.CHECK, "归档", "archive"),
    new Filter("SORT","解入银行时间",'orderBankTime'),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object
FinanceElectricPay.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

  this.renderEntity("user", User);
  this.renderEntity("operator", User);

  if (!one2one) {
    this.renderEntity("protocolSpace", ProtocolSpace, true);
  }

  this.renderEntity("notifyTime", Date);
  this.renderEntity("startTime", Date);
  this.renderEntity("endTime", Date);
  this.renderEntity("signTime", Date);
  this.renderEntity("bankTime", Date);


}

FinanceElectricPay.prototype.getForm = function () {

	let form = {
    protocolSpaceId: this.protocolSpace.id,
    //合同编号
    protocolNo: this.protocolNo,
    //开始 结束时间
    startTime: simpleDateTime(this.startTime),
    endTime: simpleDateTime(this.endTime),
    //租赁空间上对应的空间号
    spaceName: this.spaceName,
    //名称 标题
    name: this.name,
    //公司或承租团队
    companyName: this.companyName,
    //签约时间
    signTime: simpleDateTime(this.signTime),
    //初始电表读数
    initialMeter: this.initialMeter,
    //上期电表读数
    lastMeter: this.lastMeter,
    //本期电表读数
    currentMeter: this.currentMeter,
    //本期应缴电费度数
    paymentMeter: this.paymentMeter,
    //本期应缴电费金额
    currentMoney: this.currentMoney,
    //应付合计
    paymentTotal: this.paymentTotal,
    //解入银行时间
    bankTime: simpleDateTime(this.bankTime),
    //银行
    bank: this.bank,
    bankAccount: this.bankAccount,
    bankNo: this.bankNo,
    //最后落款时间
    notifyTime: simpleDateTime(this.notifyTime),
    //财务部联系人
    dutyName: this.dutyName,
    dutyPhone: this.dutyPhone,
    dutyAddress: this.dutyAddress,
    //备注
    remark: this.remark

  };
	if (this.id) {
		form.id = this.id;
	}
	return form;
}

FinanceElectricPay.prototype.validate = function () {

  if (!this.protocolSpace.id) {
    this.errorMessage = "必须关联一个租赁合同";
    return false;
  }
  if (!this.spaceName) {
    this.errorMessage = "租赁空间必填！";
    return false;
  }
  //公司或者负责人
  if (!this.companyName) {
    this.errorMessage = "公司或者负责人必填！";
    return false;
  }
  //签约时间
  if (!this.signTime) {
    this.errorMessage = "签约时间必填！";
    return false;
  }
  if(this.initialMeter === null){
    this.errorMessage = "初始电表读数必填！";
    return false;
  }
  if(!this.lastMeter === null ){
    this.errorMessage = "上期电表读数必填！";
    return false;
  }
  if(!this.currentMeter === null){
    this.errorMessage = "本期电表读数必填！";
    return false;
  }

  //银行
  if (!this.bank) {
    this.errorMessage = "银行必填！";
    return false;
  }
  //银行户名
  if (!this.bankAccount) {
    this.errorMessage = "银行户名必填！";
    return false;
  }
  //银行账号
  if (!this.bankNo) {
    this.errorMessage = "银行账号必填！";
    return false;
  }

  //落款时间
  if (!this.notifyTime) {
    this.errorMessage = "落款时间必填！";
    return false;
  }

  //解入银行时间
  if (!this.bankTime) {
    this.errorMessage = "解入银行时间必填！";
    return false;
  }


  //财务部联系人
  if (!this.dutyName) {
    this.errorMessage = "财务部联系人必填！";
    return false;
  }
  if (!this.dutyPhone) {
    this.errorMessage = "财务部电话必填！";
    return false;
  }
  if (!this.dutyAddress) {
    this.errorMessage = "财务部地址必填！";
    return false;
  }
  this.errorMessage = null;
	return true;
}

FinanceElectricPay.prototype.fillByProtocolSpace = function () {

  this.name = this.protocolSpace.name + "-电费付款信息";
  this.protocolNo = this.protocolSpace.no;
  this.companyName = this.protocolSpace.partyB;
  this.signTime = this.protocolSpace.startTime;
  this.bank = this.protocolSpace.partyABank;
  this.bankNo = this.protocolSpace.partyABankNo;

};
FinanceElectricPay.prototype.httpStatus = function (params, successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_STATUS, params, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
}

FinanceElectricPay.prototype.downloadPdfUrl = function () {
  return Vue.http.options.root + this.URL_DOWNLOAD_PDF.replace("{id}", this.id);
}

//在发送notification之前应该调用notify方法
FinanceElectricPay.prototype.httpNotify = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_NOTIFY, form, successCallback, failureCallback);
}

//获取该实体应有的notification.
FinanceElectricPay.prototype.httpNotification = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_NOTIFICATION, form, successCallback, failureCallback);
}
//一键群催款
FinanceElectricPay.prototype.httpReminder = function (ids, successCallback, failureCallback) {
  let that = this;

  if (ids instanceof Array) {
    this.httpPost(this.URL_REMINDER, {"ids": ids.join(",")}, successCallback, failureCallback);
  } else {
    this.errorMessage = "id格式不正确";
  }
}
//归档操作。
FinanceElectricPay.prototype.httpArchive = function (reason, successCallback, failureCallback) {

  let that = this;
  let form = {
    id: this.id,
    archive: !this.archive,
    reason: reason
  };
  if (!this.URL_ARCHIVE) {
    console.error("没有定义URL_ARCHIVE");
    return;
  }
  this.httpPost(this.URL_ARCHIVE, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);

}
//该实体目前是否能够编辑
FinanceElectricPay.prototype.canEdit = function () {
  return false;
}
//该实体目前是否能够删除
FinanceElectricPay.prototype.canDel = function () {
  return true;
}

//获取该实体发票应有的notification.
FinanceElectricPay.prototype.httpInvoiceNotification = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_INVOICE, form, successCallback, failureCallback);
}
