import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Vue from 'vue'
import User from '../user/User'
import Project from '../project/Project'
import { simpleDateTime } from '../../filter/time'
import FinancePayInfo from './FinancePayInfo'
import ProtocolSpace from '../protocol/space/ProtocolSpace'
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

export default function FinanceOtherPay() {

	BaseEntity.call(this, arguments);
	//被通知的用户
	this.user = new User();
	//操作员
	this.operator = new User();
	//名称 标题。
	this.name = null;
  //付款项目
  this.project = new Project();
  this.protocolSpace =  new ProtocolSpace();
  //公司名或负责人（称呼）
  this.companyName = null;

  //收款项
  this.beneficiaryName = null;
  //应付合计
  this.paymentTotal = null;
  //已付金额
  this.rentalPaid = null;
  //从履约保证金中扣除
  this.deduction = null;
  //应付余额
  this.surplusTotal = null;
  //落款时间
  this.notifyTime = new Date();

  //备注。
  this.remarks = null;

	//开户银行
	this.bank = Vue.store.state.preference.bank;
	//银行户名
	this.bankAccount = Vue.store.state.preference.bankName;
	//银行账号
	this.bankNo = Vue.store.state.preference.bankNo;


	this.dutyName = Vue.store.state.preference.financeDuty;
	this.dutyPhone = Vue.store.state.preference.financePhone;
	this.dutyAddress = Vue.store.state.preference.financeAddress;

	//状态
	this.status = Status.PAYING;

	if (Vue.store.state.debug) {
		this.mockData();
	}
}


FinanceOtherPay.prototype = new BaseEntity();
FinanceOtherPay.prototype.constructor = FinanceOtherPay;
FinanceOtherPay.prototype.Status = Status;
FinanceOtherPay.prototype.StatusMap = StatusMap;
FinanceOtherPay.prototype.StatusList = FinanceOtherPay.prototype.getStatusList();
FinanceOtherPay.prototype.URL_DOWNLOAD_PDF = "/finance/other/pay/download/pdf/{id}";
FinanceOtherPay.prototype.URL_NOTIFICATION = "/finance/other/pay/notification";
FinanceOtherPay.prototype.URL_ARCHIVE = "/finance/other/pay/archive";
FinanceOtherPay.prototype.URL_NOTIFY = "/finance/other/pay/notify";

FinanceOtherPay.prototype.mockData = function () {

}

FinanceOtherPay.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
    new Filter(Filter.prototype.Type.HTTP_SELECTION, '付款项目', 'projectId', null, Project),
		new Filter("SELECTION", "状态", "status", this.getStatusList()),
		new Filter('INPUT', '关键字', 'keyword'),
    new Filter("CHECK", "归档", "archive"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

];
};

//We use this method to get the full js Object
FinanceOtherPay.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("user", User);
	this.renderEntity("operator", User);
  this.renderEntity("project", Project);
	this.renderEntity("notifyTime", Date);

}

FinanceOtherPay.prototype.getForm = function () {

	let form = {
    name: this.name,
    projectId: this.project.id,
    protocolSpaceId: this.protocolSpace.id,
    companyName: this.companyName,

    beneficiaryName: this.beneficiaryName,
    paymentTotal: this.paymentTotal,

    notifyTime: simpleDateTime(this.notifyTime),

    remarks: this.remarks,

    bank: this.bank,
    bankAccount: this.bankAccount,
    bankNo: this.bankNo,
    dutyName: this.dutyName,
    dutyPhone: this.dutyPhone,
    dutyAddress: this.dutyAddress
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}


FinanceOtherPay.prototype.validate = function () {
  if(!this.project.id && !this.protocolSpace.id) {
    this.errorMessage = "付款项目和合同必填一项！";
    return false;
  }
  if(!this.companyName) {
    this.errorMessage = "公司或联系人必填！";
    return false;
  }
  if(!this.beneficiaryName) {
    this.errorMessage = "收款项名称！";
    return false;
  }
  if(!this.paymentTotal) {
    this.errorMessage = "应付总额必填！";
    return false;
  }
  if (!this.notifyTime) {
    this.errorMessage = "落款时间必填！";
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

FinanceOtherPay.prototype.downloadPdfUrl = function () {
  return Vue.http.options.root + this.URL_DOWNLOAD_PDF.replace("{id}", this.id);
}
//获取该实体应有的notification.
FinanceOtherPay.prototype.httpNotification = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_NOTIFICATION, form, successCallback, failureCallback);
}
//归档操作。
FinanceOtherPay.prototype.httpArchive = function (reason, successCallback, failureCallback) {

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
//在发送notification之前应该调用notify方法 获取到 实时的 notification
FinanceOtherPay.prototype.httpNotify = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_NOTIFY, form, successCallback, failureCallback);
}



//该实体目前是否能够编辑
FinanceOtherPay.prototype.canEdit = function () {
  return true;
}
//该实体目前是否能够删除
FinanceOtherPay.prototype.canDel = function () {
  return true;
}
