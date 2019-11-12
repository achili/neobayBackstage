import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import User from "../user/User";
import OfficialActivity from "./OfficialActivity";


export default function OfficialActivityApply() {
	BaseEntity.call(this, arguments);

	this.user = new User();

	this.officialActivity = new OfficialActivity();
	this.personNum = 0;
	this.leader = null;

	this.phone = null;

}

//extend BaseEntity
OfficialActivityApply.prototype = new BaseEntity();
OfficialActivityApply.prototype.constructor = OfficialActivityApply;


OfficialActivityApply.prototype.getFilters = function () {
	return [
		new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
		new Filter(Filter.prototype.Type.INPUT, "活动编号", "officialActivityId")
	];
};

OfficialActivityApply.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("user", User);

	this.renderEntity("officialActivity", OfficialActivity);

}


OfficialActivityApply.prototype.getForm = function () {

	let form = {
		officialActivityId: this.officialActivity.id,
		personNum: this.personNum,
		leader: this.leader,
		phone: this.phone
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


OfficialActivityApply.prototype.validate = function () {

	if (!this.personNum) {
		this.errorMessage = "人数必选！";
		return false;
	}

	if (!this.phone) {
		this.errorMessage = "联系方式必填！";
		return false;
	}

	if (!this.leader) {
		this.errorMessage = "姓名必填！";
		return false;
	}



	return true;
}
