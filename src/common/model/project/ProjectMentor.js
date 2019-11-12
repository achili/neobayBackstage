import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import Tank from "../tank/Tank";
import User from "../user/User";
import Project from "./Project";
import SpaceRegional from "../space/SpaceRegional";


let Status = {
	OK: "OK"
}
let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "success"
	}
}


export default function ProjectMentor() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.user = new User();

	this.name = null;
	this.avatar = new Tank("image", false, 1024 * 1024, "图片尺寸不超过1M");
	this.phone = null;
	this.email = null;
	this.description = null;
	this.status = Status.OK;

	//一对多字段
	this.projects = [];

}

//extend BaseEntity
ProjectMentor.prototype = new BaseEntity();
ProjectMentor.prototype.constructor = ProjectMentor;

ProjectMentor.prototype.Status = Status;
ProjectMentor.prototype.StatusMap = StatusMap;
ProjectMentor.prototype.StatusList = ProjectMentor.prototype.getStatusList();


ProjectMentor.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "姓名", "orderName"),
		new Filter("INPUT", "姓名", "name"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

];
};


//We use this method to get the full js Object.
ProjectMentor.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("user", User);
	this.renderEntity("avatar", Tank);
	this.renderList("projects", Project);


};


ProjectMentor.prototype.getForm = function () {
	let form = {
    spaceRegional: this.spaceRegional.id,
		userId: this.user.id,
		name: this.name,
		avatarCode: this.avatar.code,
		phone: this.phone,
		email: this.email,
		description: this.description
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;

};

ProjectMentor.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }
	if (!this.user.id) {
		this.errorMessage = "请关联一位用户！";
		return false;
	}

	if (!this.name) {
		this.errorMessage = "姓名必填！";
		return false;
	}
	if (!this.avatar.exist()) {
		this.errorMessage = "头像必填！";
		return false;
	}
	if (!this.description) {
		this.errorMessage = "简介必填！";
		return false;
	}

	if (!this.phone) {
		this.errorMessage = "电话必填！";
		return false;
	}
	if (!this.email) {
		this.errorMessage = "邮箱必填！";
		return false;
	}
	return true;
}







