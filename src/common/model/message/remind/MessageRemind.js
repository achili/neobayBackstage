import BaseEntity from "../../base/BaseEntity";
import User from "../../user/User";
import Filter from "../../base/Filter";

import MessageNotify from "../notify/MessageNotify";


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


export default function MessageRemind() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.owner = new User();

	this.messageNotify = new MessageNotify();

	this.read = false;

	this.remark = null;


	this.status = Status.OK;


}


//extend BaseEntity
MessageRemind.prototype = new BaseEntity();
MessageRemind.prototype.constructor = MessageRemind;
MessageRemind.prototype.Status = Status;
MessageRemind.prototype.StatusMap = StatusMap;
MessageRemind.prototype.StatusList = MessageRemind.prototype.getStatusList();

MessageRemind.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId")
	];
};

//We use this method to get the full js Object.
MessageRemind.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("owner", User);
	this.renderEntity("messageNotify", MessageNotify);


}

MessageRemind.prototype.getForm = function () {

	return {};

}


MessageRemind.prototype.validate = function () {

	return true;
}

