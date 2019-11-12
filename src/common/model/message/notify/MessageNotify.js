import BaseEntity from "../../base/BaseEntity";
import User from "../../user/User";
import Filter from "../../base/Filter";
import {Action, ActionMap, ActionList} from "../../core/action/Action";
import {EntityType, EntityTypeMap, EntityTypeList} from "../../core/type/EntityType";
import MessageRemind from "../remind/MessageRemind";
import Notification from "../../notification/Notification";

let Status = {
	OK: "OK"
}

let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "info"
	}
}


export default function MessageNotify() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.sender = new User();
	this.receiver = new User();
	this.entityId = null;

	this.entityType = null;
	this.action = null;

	this.content = null;
	this.remark = null;


	this.status = Status.OK;

	/**
	 * 一对多字段
	 */
	this.messageReminds = [];
	this.notifications = [];

}


//extend BaseEntity
MessageNotify.prototype = new BaseEntity();
MessageNotify.prototype.constructor = MessageNotify;

MessageNotify.prototype.Status = Status;
MessageNotify.prototype.StatusMap = StatusMap;
MessageNotify.prototype.StatusList = MessageNotify.prototype.getStatusList();

MessageNotify.prototype.getFilters = function () {
	return [
		new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
		new Filter(Filter.prototype.Type.INPUT, "实体ID", "entityId"),
		new Filter(Filter.prototype.Type.SELECTION, "实体类型", "entityType", EntityTypeList, null, false)
	];
};

//We use this method to get the full js Object.
MessageNotify.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("sender", User);
	this.renderEntity("receiver", User);

	//TODO: 渲染entity

	this.renderList("messageReminds", MessageRemind);
	this.renderList("notifications", Notification);


}

MessageNotify.prototype.getForm = function () {

	return {};

}


MessageNotify.prototype.validate = function () {

	return true;
}


MessageNotify.prototype.getActionItem = function () {

	let item = ActionMap[this.action];
	if (item) {
		return item;
	} else {
		return {
			name: "未知状态",
			value: null,
			style: "danger",
			icon: "ban"
		};
	}
}


MessageNotify.prototype.getActionName = function () {

	return this.getActionItem().name;
}


MessageNotify.prototype.getActionIcon = function () {

	return this.getActionItem().icon;
}

MessageNotify.prototype.getActionStyle = function () {

	return this.getActionItem().style;
}

