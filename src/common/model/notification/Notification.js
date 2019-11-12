import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import User from '../user/User'
import MessageNotify from '../message/notify/MessageNotify'

let Status = {
	NEW: "NEW",
	OK: "OK",
	ERROR: "ERROR",
  PARTIAL_ERROR: 'PARTIAL_ERROR',
	UNKNOWN: "UNKNOWN"
}
let StatusMap = {
	NEW: {
		name: "准备发送",
		value: "NEW",
		style: "info"
	},
	OK: {
		name: "成功",
		value: "OK",
		style: "success"
	},

	ERROR: {
		name: "失败",
		value: "ERROR",
		style: "danger"
	},
  PARTIAL_ERROR: {
    name: '部分失败',
    value: 'PARTIAL_ERROR',
    style: 'danger'
  },
	UNKNOWN: {
		name: "未知",
		value: "UNKNOWN",
		style: "warning"
	}

}


let Method = {
	MAIL: "MAIL",
	MESSAGE: "MESSAGE",
	SMS: "SMS"
}
let MethodMap = {
	MAIL: {
		name: "邮件",
		value: "MAIL",
		style: "success"
	},
	MESSAGE: {
		name: "站内信",
		value: "MESSAGE",
		style: "info"
	},
	SMS: {
		name: "短信",
		value: "SMS",
		style: "primary"
	}
}

let MethodList = [];
for (let key in MethodMap) {
	MethodList.push(MethodMap[key]);
}


let Type = {
	//初审通过
	ENTRY_APPLY_FIRST_REVIEW_PASS: "ENTRY_APPLY_FIRST_REVIEW_PASS",
	//初审未通过
	ENTRY_APPLY_FIRST_REVIEW_REJECT: "ENTRY_APPLY_FIRST_REVIEW_REJECT",
	//终审通过
	ENTRY_APPLY_FINAL_REVIEW_PASS: "ENTRY_APPLY_FINAL_REVIEW_PASS",
	//终审拒绝
	ENTRY_APPLY_FINAL_REVIEW_REJECT: "ENTRY_APPLY_FINAL_REVIEW_REJECT",
	//孵化协议状态变更
	ENTRY_PROTOCOL_STATUS_CHANGE: "ENTRY_PROTOCOL_STATUS_CHANGE"
};

let TypeMap = {
	ENTRY_APPLY_FIRST_REVIEW_PASS: {
		name: "初审通过",
		value: Type.ENTRY_APPLY_FIRST_REVIEW_PASS,
		style: "primary"
	},
	ENTRY_APPLY_FIRST_REVIEW_REJECT: {
		name: "初审未通过",
		value: Type.ENTRY_APPLY_FIRST_REVIEW_REJECT,
		style: "info"
	},
	ENTRY_APPLY_FINAL_REVIEW_PASS: {
		name: "终审通过",
		value: Type.ENTRY_APPLY_FINAL_REVIEW_PASS,
		style: "success"
	},
	ENTRY_APPLY_FINAL_REVIEW_REJECT: {
		name: "终审拒绝",
		value: Type.ENTRY_APPLY_FINAL_REVIEW_REJECT,
		style: "success"
	},
	ENTRY_PROTOCOL_STATUS_CHANGE: {
		name: "孵化协议状态变更",
		value: Type.ENTRY_PROTOCOL_STATUS_CHANGE,
		style: "success"
	}
};


export default function Notification() {
	BaseEntity.call(this, arguments);
	this.name = null;
	this.operator = new User();
	this.receiver = new User();
	this.messageNotify = new MessageNotify();
	this.mailFromAddress = null;
	this.mailToAddress = null;
	this.mailSubject = null;
	this.mailContent = null;
	this.mailStatus = Status.NEW;
	this.mailEnable = true;
	this.mailResult = null;

	this.smsPhone = null;
	this.smsContent = null;
	this.smsStatus = Status.NEW;
	this.smsEnable = null;
	this.smsResult = null;
	this.messageSubject = null;
	this.messageContent = null;
	this.messageStatus = Status.NEW;
	this.messageEnable = true;
	this.messageResult = null;

	this.entityId = null;
	this.entityClass = null;

	this.action = null;


	this.status = Status.NEW;
}


Notification.prototype = new BaseEntity();
Notification.prototype.constructor = Notification;


Notification.prototype.Type = Type;
Notification.prototype.TypeMap = TypeMap;
Notification.prototype.TypeList = Notification.prototype.getTypeList();


Notification.prototype.Status = Status;
Notification.prototype.StatusMap = StatusMap;
Notification.prototype.StatusList = Notification.prototype.getStatusList();

Notification.prototype.Method = Method;
Notification.prototype.MethodList = MethodList;
Notification.prototype.MethodMap = MethodMap;

Notification.prototype.ANNOUNCEMENT_DETAILS = '/notification/announcement/details';
Notification.prototype.RESEND = '/notification/resend';


Notification.prototype.getStatusName = function (status = null) {
	if (!status) {
		status = this.status;
	}
	if (status && this.StatusMap) {
		let item = this.StatusMap[status];
		if (item) {
			return item.name;
		}

		console.error("没有定义 " + status);
	} else {
		console.error("没有定义 status");

	}

	return "未知状态";
};

Notification.prototype.getStatusStyle = function (status = null) {
	if (!status) {
		status = this.status;
	}
	if (status && this.StatusMap) {
		let item = this.StatusMap[status];
		if (item) {
			return item.style;
		}
		console.error(this.getTAG() + "没有定义 " + status);
	} else {
		console.error(this.getTAG() + "没有定义 status");
	}

	return "default";
};


Notification.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword'),
		new Filter("SELECTION", "类型", "type", this.getTypeList())
	];
};

Notification.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("operator", User);
	this.renderEntity("receiver", User);
	this.renderEntity("messageNotify", MessageNotify);

}


Notification.prototype.getForm = function () {

	let form = {
		receiverId: this.receiver.id,
		messageNotifyId: this.messageNotify.id,
		name: this.name,
		mailFromAddress: this.mailFromAddress,
		mailToAddress: this.mailToAddress,
		mailSubject: this.mailSubject,
		mailContent: this.mailContent,
		mailEnable: this.mailEnable,
		smsPhone: this.smsPhone,
		smsContent: this.smsContent,
		smsEnable: this.smsEnable,
		messageSubject: this.messageSubject,
		messageContent: this.messageContent,
		messageEnable: this.messageEnable,
		entityId: this.entityId,
		entityClass: this.entityClass,
		action: this.action
	}
	if (this.id) {
		form.id = this.id;
	}
	return form;
}


Notification.prototype.validate = function () {


	if (!this.receiver || !this.receiver.id) {
		this.errorMessage = "被通知用户必须指定！";
		return false;
	}


	if (!this.messageNotify || !this.messageNotify.id) {
		this.errorMessage = "MessageNotify必须指定！";
		return false;
	}


	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}

	if (this.mailEnable) {

		if (!this.mailFromAddress) {
			this.errorMessage = "邮件发件人必填！";
			return false;
		}
		if (!this.mailToAddress) {
			this.errorMessage = "邮件收件人必填！";
			return false;
		}
		if (!this.mailSubject) {
			this.errorMessage = "邮件主题必填！";
			return false;
		}
		if (!this.mailContent) {
			this.errorMessage = "邮件内容必填必填！";
			return false;
		}

	}

	if (this.messageEnable) {

		if (!this.messageSubject) {
			this.errorMessage = "站内信主题必填！";
			return false;
		}
		if(this.messageSubject.length > 85 ){
      this.errorMessage = "站内信主题不能超过85个字符！";
      return false;
    }

		if (!this.messageContent) {
			this.errorMessage = "站内信内容必填！";
			return false;
		}

	}

	if (this.smsEnable) {
		if (!this.smsPhone) {
			this.errorMessage = "手机必填！";
			return false;
		}
		if (!this.smsContent) {
			this.errorMessage = "短信内容必填！";
			return false;
		}
	}

	if (!this.mailEnable && !this.smsEnable && !this.messageEnable) {
		this.errorMessage = "请至少选择一种通知方式！";
		return false;
	}

	this.errorMessage = null;
	return true;
}

Notification.prototype.hasMethod = function (method) {
	if (method === Method.MESSAGE) {
		return this.messageEnable;
	} else if (method === Method.MAIL) {
		return this.mailEnable;
	} else if (method === Method.SMS) {
		return this.smsEnable;
	} else {
		return false;
	}


}

Notification.prototype.httpResend = function (successCallback, failureCallback) {
  this.httpPost(this.RESEND, {"id": this.id}, successCallback, failureCallback);
};
