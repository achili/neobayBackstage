/**
 *
 * Created by lxd on 03/05/2017.
 */
import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import User from "../user/User";
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

let Type = {}
let TypeMap = {}

export default function OfficialActivityType() {
	BaseEntity.call(this, arguments);

	this.name = null;

	this.status = Status.OK;

}

//extend BaseEntity
OfficialActivityType.prototype = new BaseEntity();
OfficialActivityType.prototype.constructor = OfficialActivityType;


OfficialActivityType.prototype.Status = Status;
OfficialActivityType.prototype.StatusMap = StatusMap;
OfficialActivityType.prototype.StatusList = OfficialActivityType.prototype.getStatusList();


OfficialActivityType.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "序号", "orderSort"),
		new Filter("INPUT", "标题", "name"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

OfficialActivityType.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
}

OfficialActivityType.prototype.getForm = function () {

	let form = {
		name: this.name,
    spaceRegional: this.spaceRegional.id

  };
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


OfficialActivityType.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}

	return true;
}
