import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Vue from 'vue'
import User from '../user/User'
import ProtocolSpace from '../protocol/space/ProtocolSpace'
import { simpleDateTime } from '../../filter/time'
import ConferenceRoomReservation from "../conference/ConferenceRoomReservation";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
	//缴款中
	PAYING: "PAYING",
  //待支付
  WAIT:"WAIT",
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
	},
  WAIT: {
    name: "待支付",
    value: "WAIT",
    style: "warning",
    icon: "check"
  }
}


let Type = {
	//按天
	DAY: "DAY",
	//按月
	MONTH: "MONTH"
}

let TypeMap = {
	DAY: {
		name: "按天计算",
		value: "DAY",
		style: "success"
	},
	MONTH: {
		name: "按月计算",
		value: "MONTH",
		style: "success"
	}
}


export default function FinancePayInfo() {

	BaseEntity.call(this, arguments);


	//被通知的用户
	this.user = new User();

	//操作员
	this.operator = new User();

	//关联的租赁合同。
	this.protocolSpace = new ProtocolSpace();

  //租赁合同上对应的空间名称
  this.spaceName = "(创建后自动生成)";

	//名称 标题。
	this.name = null;

	//合同编号
	this.protocolNo = null;

	//公司名或负责人（称呼）
	this.companyName = null;

	this.type = Type.MONTH;

	this.day = 10;

	this.month = 3;

	//签约时间
	this.signTime = new Date();


	//计算租金和物业管理费起始时间
	this.rentStartTime = new Date();

	//押金
	this.deposit = 0;

	//押金起始时间
	this.depositStartTime = null;

	//押金结束时间
	this.depositEndTime = null;


	//租金（月）
	this.rental = 0;
	//租金总额
	this.rentalTotal = 0;

	//租金起始时间
	this.startTime = null;

	//租金结束时间
	this.endTime = null;


	this.innoToken = 0;
	this.innoTokenTotal = 0;
  this.innoTokenTypes = null;
  this.innoTokenRemarks = null;

	this.stepTotal = 0;
	this.total = 0;

	//大写租金
	this.capitalTotal = null;

	//履约保证金已付
	this.depositPaid = null;

	//租金已付
	this.rentalPaid = null;

	//应付余额。
	this.remainTotal = null;

	//应付余额大写
	this.remainCapital = null;

	//开户银行
	this.bank = Vue.store.state.preference.bank;
	//银行户名
	this.bankAccount = Vue.store.state.preference.bankName;
	//银行账号
	this.bankNo = Vue.store.state.preference.bankNo;

	//落款时间
	this.notifyTime = new Date();

	this.dutyName = Vue.store.state.preference.financeDuty;
	this.dutyPhone = Vue.store.state.preference.financePhone;
	this.dutyAddress = Vue.store.state.preference.financeAddress;

  //从履约保证金中扣除
  this.deduction = null;

  //从履约保证金中扣除大写
  this.deductionCapital = null;


	this.link = null;

	this.remark = null;

	//状态
	this.status = Status.PAYING;
  this.archive = false;
	if (Vue.store.state.debug) {
		this.mockData();
	}
}


FinancePayInfo.prototype = new BaseEntity();
FinancePayInfo.prototype.constructor = FinancePayInfo;

FinancePayInfo.prototype.URL_NOTIFY = "/finance/pay/info/notify";
FinancePayInfo.prototype.URL_NOTIFICATION = "/finance/pay/info/notification";

FinancePayInfo.prototype.URL_DOWNLOAD_PDF = "/finance/pay/info/download/pdf/{id}";
FinancePayInfo.prototype.URL_STATUS = "/finance/pay/info/status";
FinancePayInfo.prototype.URL_REMINDER = "/finance/pay/info/reminder";

FinancePayInfo.prototype.URL_ARCHIVE = "/finance/pay/info/archive";
FinancePayInfo.prototype.URL_INVOICE = "/finance/pay/info/invoice";

FinancePayInfo.prototype.URL_ORDER = "/finance/pay/info/order";
FinancePayInfo.prototype.QUERY_PAY_STATE_URL = "/finance/pay/info/query/pay/state";


FinancePayInfo.prototype.Status = Status;
FinancePayInfo.prototype.StatusMap = StatusMap;
FinancePayInfo.prototype.StatusList = FinancePayInfo.prototype.getStatusList();

FinancePayInfo.prototype.Type = Type;
FinancePayInfo.prototype.TypeMap = TypeMap;
FinancePayInfo.prototype.TypeList = FinancePayInfo.prototype.getTypeList();


FinancePayInfo.prototype.mockData = function () {

}

FinancePayInfo.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter('SORT', '租金起始时间', 'orderStartTime'),
		new Filter("SELECTION", "状态", "status", this.getStatusList()),
		new Filter('INPUT', '名称', 'name'),
		new Filter('INPUT', '关键字(编号/名称/公司)', 'keyword'),
    new Filter(Filter.prototype.Type.CHECK, "归档", "archive"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object
FinancePayInfo.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("user", User);
	this.renderEntity("operator", User);

	if (!one2one) {
		this.renderEntity("protocolSpace", ProtocolSpace, true);
	}

	this.renderEntity("signTime", Date);
	this.renderEntity("rentStartTime", Date);
	this.renderEntity("depositStartTime", Date);
	this.renderEntity("depositEndTime", Date);
	this.renderEntity("startTime", Date);
	this.renderEntity("endTime", Date);
	this.renderEntity("notifyTime", Date);

}

FinancePayInfo.prototype.getForm = function () {

	let form = {

		//关联的租赁合同申请。
		protocolSpaceId: this.protocolSpace.id,
		//合同编号
		protocolNo: this.protocolNo,
    //租赁房屋
    spaceName:this.spaceName,
		//名称 标题。
		companyName: this.companyName,
		type: this.type,
		//几天
		day: this.day,
		//几个月
		month: this.month,
		//签约时间
		signTime: simpleDateTime(this.signTime),
		//计算租金和物业管理费起始时间
		rentStartTime: simpleDateTime(this.rentStartTime),

		//押金
		deposit: this.deposit,
		//押金
		depositStartTime: simpleDateTime(this.depositStartTime),
		//押金
		depositEndTime: simpleDateTime(this.depositEndTime),

		//租金（月）
		rental: this.rental,

		//租金起始时间
		startTime: simpleDateTime(this.startTime),

		//租金结束时间
		endTime: simpleDateTime(this.endTime),


		//大写租金
		capitalTotal: this.capitalTotal,

		innoToken: this.innoToken,
    innoTokenTypes: this.innoTokenTypes,
    innoTokenRemarks: this.innoTokenRemarks,
    innoTokenTotal: this.innoTokenTotal,

		//银行
		bank: this.bank,
		bankAccount: this.bankAccount,
		bankNo: this.bankNo,

		notifyTime: simpleDateTime(this.notifyTime),

		//财务部联系人
		dutyName: this.dutyName,
		dutyPhone: this.dutyPhone,
		dutyAddress: this.dutyAddress
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}


FinancePayInfo.prototype.validate = function () {


	if (!this.protocolSpace.id) {
		this.errorMessage = "必须关联一个租赁合同";
		return false;
	}

  //租赁房屋
  if (!this.spaceName) {
    this.errorMessage = "租赁房屋必填！";
    return false;
  }

	//公司或者抬头
	if (!this.companyName) {
		this.errorMessage = "公司或者抬头必填！";
		return false;
	}


	if (this.type === Type.MONTH) {
		//月数
		if (!this.month) {
			this.errorMessage = "月数必填！";
			return false;
		}
	} else if (this.type === Type.DAY) {
		//天数
    if (!this.day) {
			this.errorMessage = "天数必填！";
			return false;
		}
	} else {
		this.errorMessage = "按天或者按月计算错误！";
		return false;
	}


	//签约时间
	if (!this.signTime) {
		this.errorMessage = "签约时间必填！";
		return false;
	}


	//计算租金和物业管理费起始时间
	if (!this.rentStartTime) {
		this.errorMessage = "计算租金和物业管理费起始时间必填！";
		return false;
	}

	//押金
	if (this.deposit) {

		if (!this.depositStartTime) {
			this.errorMessage = "押金起始时间必填！";
			return false;
		}
		if (!this.depositEndTime) {
			this.errorMessage = "押金结束时间必填！";
			return false;
		}

	}


	//租金
	if (this.rental === null) {
		this.errorMessage = "租金必填！";
		return false;
	}

	if (!this.startTime) {
		this.errorMessage = "租金起始时间必填！";
		return false;
	}
	if (!this.endTime) {
		this.errorMessage = "租金结束时间必填！";
		return false;
	}


	//大写租金
	if (!this.capitalTotal) {
		this.errorMessage = "大写租金必填！";
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

//根据当前的 spaceApply来填充一些字段信息。
FinancePayInfo.prototype.fillByProtocolSpace = function () {

	this.name = this.protocolSpace.name + "-付款信息";
	this.protocolNo = this.protocolSpace.no;

	this.companyName = this.protocolSpace.partyB;

	this.month = this.protocolSpace.intervalMonth;


	this.signTime = this.protocolSpace.startTime;
	this.rentStartTime = this.protocolSpace.rentStartTime;

	//只有第一张信息单才有押金。
	if (!this.protocolSpace.financePayInfos.length) {
		this.deposit = this.protocolSpace.rental;
		this.depositStartTime = this.protocolSpace.startTime;
		this.depositEndTime = this.protocolSpace.endTime;
	} else {
		this.deposit = 0;
		this.depositStartTime = null;
		this.depositEndTime = null;
	}

	this.rental = this.protocolSpace.rental;


	//第几次缴款决定了时间。
	let latestTime = new Date();
	for (let i = 0; i < this.protocolSpace.financePayInfos.length; i++) {
		let peerInfo = this.protocolSpace.financePayInfos[i];
		if (peerInfo.endTime.getTime() > latestTime.getTime()) {
			latestTime = peerInfo.endTime;
		}
	}

	let start = new Date();
	let end = new Date();
	start.setTime(latestTime.getTime() + 3600 * 1000 * 24);
	end.setTime(start.getTime() + 3600 * 1000 * 24 * 30 * this.month);
	this.startTime = start;
	this.endTime = end;

	this.bank = this.protocolSpace.partyABank;
	this.bankNo = this.protocolSpace.partyABankNo;

}

FinancePayInfo.prototype.downloadPdfUrl = function () {
	return Vue.http.options.root + this.URL_DOWNLOAD_PDF.replace("{id}", this.id);
}

FinancePayInfo.prototype.httpStatus = function (params, successCallback, failureCallback) {
	let that = this;
	this.httpPost(this.URL_STATUS, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

//在发送notification之前应该调用notify方法
FinancePayInfo.prototype.httpNotify = function (action, successCallback, failureCallback) {
	let that = this;
	let form = {
		id: this.id,
		action: action
	}
	this.httpPost(this.URL_NOTIFY, form, successCallback, failureCallback);
}


//获取该实体应有的notification.
FinancePayInfo.prototype.httpNotification = function (action, successCallback, failureCallback) {
	let that = this;
	let form = {
		id: this.id,
		action: action
	}
	this.httpPost(this.URL_NOTIFICATION, form, successCallback, failureCallback);
}

//获取该实体发票应有的notification.
FinancePayInfo.prototype.httpInvoiceNotification = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_INVOICE, form, successCallback, failureCallback);
}


//一键群催款
FinancePayInfo.prototype.httpReminder = function (ids, successCallback, failureCallback) {
	let that = this;

	if (ids instanceof Array) {
		this.httpPost(this.URL_REMINDER, {"ids": ids.join(",")}, successCallback, failureCallback);
	} else {
		this.errorMessage = "id格式不正确";
	}
}

//归档操作。
FinancePayInfo.prototype.httpArchive = function (reason, successCallback, failureCallback) {

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
FinancePayInfo.prototype.canEdit = function () {
	return false;
}

//该实体目前是否能够删除
FinancePayInfo.prototype.canDel = function () {
	return true;
}

FinancePayInfo.prototype.httpFetchCode = function (no, entity, isPay, successCallback, errorCallback) {
  let form = {
    id: entity.id,
    pay_interface_no:no,
    isPay:isPay
  };
  this.httpPost(this.URL_ORDER, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

FinancePayInfo.prototype.httpPcPayment = function (entity, isPay, successCallback, errorCallback) {
  let form = {
    id: entity.id,
    isPay:isPay,
    remark:entity.remark
  };
  this.httpPost(this.URL_ORDER, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

FinancePayInfo.prototype.httpQueryPayState = function (id,successCallback, errorCallback) {
  let form = {
    id: id
  };
  this.httpPost(this.QUERY_PAY_STATE_URL, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
};

