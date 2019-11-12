import BaseEntity from "../../base/BaseEntity";
import Tank from "../../tank/Tank";
import User from "../../user/User";
import Filter from "../../base/Filter";

let Status = {
	//收件箱
	INBOX: "INBOX",
	//发件箱
	OUTBOX: "OUTBOX",
	//已删除
	DELETED: "DELETED"
}

let StatusMap = {
	INBOX: {
		name: "收件箱",
		value: "INBOX",
		style: "info",
		icon: "fa fa-inbox"
	},
	OUTBOX: {
		name: "发件箱",
		value: "OUTBOX",
		style: "info",
		icon: "fa fa-envelope-o"
	},
	DELETED: {
		name: "已删除",
		value: "DELETED",
		style: "danger",
		icon: "fa fa-trash-o"
	}
}

let Type = {
	NORMAL: "NORMAL",
	SYSTEM: "SYSTEM"
}

export default function MessageLetter() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.owner = new User();
	this.sender = new User();
	this.receiverIds = null;
	this.receivers = [];
	this.type = Type.NORMAL;
	this.subject = null;
	this.content = null;
	this.read = null;
	this.status = Status.INBOX;
	this.linkMessageTanks = [];
	this.attachments = [];
	this.attachmentsNum = 0;
	this.tags = [];
	this.flag = false;

	//local fields.
	this.checked = false;

}


//extend BaseEntity
MessageLetter.prototype = new BaseEntity();
MessageLetter.prototype.constructor = MessageLetter;
MessageLetter.prototype.URL_FLAG = "/message/letter/flag";
MessageLetter.prototype.URL_READ = "/message/letter/read";
MessageLetter.prototype.URL_STATUS = "/message/letter/status";
MessageLetter.prototype.URL_DELETE = "/message/letter/delete";
MessageLetter.prototype.Status = Status;
MessageLetter.prototype.StatusMap = StatusMap;
MessageLetter.prototype.StatusList = MessageLetter.prototype.getStatusList();

MessageLetter.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "CREATETIME", "orderCreateTime"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "标题", "subject"),
		new Filter("CHECK", "红旗", "flag"),
		new Filter("SELECTION", "消息状态", "status", this.getStatusList())

	];
};

//We use this method to get the full js Object.
MessageLetter.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderList("attachments", Tank);


	this.renderEntity("owner", User);
	this.renderEntity("sender", User);
	this.renderList("receivers", User);


}

MessageLetter.prototype.getForm = function () {

	let attachmentsInfo = [];
	if (this.attachments && this.attachments.length) {

		for (let i = 0; i < this.attachments.length; i++) {
			let tank = this.attachments[i];
			if (tank.exist()) {
				attachmentsInfo.push(tank.code);
			}
		}

	}

	let ids = [];
	for (let i = 0; i < this.receivers.length; i++) {
		let user = this.receivers[i];
		ids.push(user.id);
	}

	let form = {
		receiverIdsInfo: JSON.stringify(ids),
		subject: this.subject,
		content: this.content,
		attachmentsInfo: JSON.stringify(attachmentsInfo)
	};


	if (this.id) {
		form.id = this.id;
	}

	return form;

}


MessageLetter.prototype.validate = function () {

	if (!this.receivers.length) {
		this.errorMessage = "收信人必填！";
		return false;
	}


	if (!this.subject) {
		this.errorMessage = "主题必填！";
		return false;
	}


	if (!this.content) {
		this.errorMessage = "私信正文不能为空！";
		return false;
	}


	return true;
}


//标记或者取消加红旗
MessageLetter.prototype.getReceiverNames = function (max = 3) {

	let names = "";
	if (this.receivers && this.receivers.length) {
		for (let i = 0; i < this.receivers.length; i++) {
			let user = this.receivers[i];
			if (i === 0) {
				names = user.nickname;
			} else if (i < max) {
				names += "," + user.nickname;
			} else if (i === max) {
				names += " ...";
			}
		}
	}

	return names;

}

//标记或者取消加红旗
MessageLetter.prototype.httpFlag = function (ids, check, successCallback, errorCallback) {

	let that = this;

	let url = this.URL_FLAG;

	this.httpPost(url, {ids, check}, successCallback, errorCallback);

}
//标记或者已读或未读
MessageLetter.prototype.httpRead = function (ids, read, successCallback, errorCallback) {

	let that = this;

	let url = this.URL_READ;

	this.httpPost(url, {ids, read}, successCallback, errorCallback);

}


//改变状态。垃圾箱，正常
MessageLetter.prototype.httpStatus = function (ids, status, successCallback, errorCallback) {
	let that = this;

	let url = this.URL_STATUS;

	this.httpPost(url, {ids, status}, successCallback, errorCallback);

}

//从垃圾箱中彻底删除
MessageLetter.prototype.httpDelete = function (ids, successCallback, errorCallback) {
	let that = this;

	let url = this.URL_DELETE;

	this.httpPost(url, {ids}, successCallback, errorCallback);

}

