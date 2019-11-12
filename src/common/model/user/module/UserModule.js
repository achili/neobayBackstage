import BaseEntity from "../../base/BaseEntity";
import UserRole from "../role/UserRole";
import UserNode from "../UserNode";
import {FeatureType, FeatureTypeMap} from "../../core/feature/FeatureType";
import {ModuleType, ModuleTypeMap} from "../../core/feature/ModuleType";


let Status = {
	OK: "OK",
	ERROR: "ERROR"
}
let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "success"
	},
	ERROR: {
		name: "错误",
		value: "ERROR",
		style: "error"
	}
}

export default function UserModule() {

	BaseEntity.call(this, arguments);
	this.name = null;
	this.type = null;
	this.description = null;

	this.status = Status.OK;
}

UserModule.prototype = new BaseEntity();
UserModule.prototype.constructor = UserModule;

UserModule.prototype.Status = Status;
UserModule.prototype.StatusMap = StatusMap;
UserModule.prototype.StatusList = UserModule.prototype.getStatusList();

UserModule.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);

}

UserModule.prototype.getForm = function () {
	let form = {
		active: this.active,
		roleId: this.role.id,
		nodeId: this.node.id
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}

