import BaseEntity from "../../base/BaseEntity";
import UserRole from "../role/UserRole";
import UserNode from "../UserNode";
import {FeatureType, FeatureTypeMap} from "../../core/feature/FeatureType";
import {ModuleType, ModuleTypeMap} from "../../core/feature/ModuleType";
import UserModule from "../module/UserModule";


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


export default function UserFeature() {

	BaseEntity.call(this, arguments);

	this.name = null;
	this.type = null;
	this.module = null;
	this.description = null;

	this.status = Status.OK;


}

UserFeature.prototype = new BaseEntity();
UserFeature.prototype.constructor = UserFeature;
UserFeature.prototype.CHANGE_ACTIV_URL = "/user/feature/edit";

UserFeature.prototype.Status = Status;
UserFeature.prototype.StatusMap = StatusMap;
UserFeature.prototype.StatusList = UserFeature.prototype.getStatusList();

UserFeature.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("role", UserRole);
	this.renderEntity("node", UserNode);
}

UserFeature.prototype.getFeatureTypes = function (moduleType) {

	let map = {};
	map[ModuleType.PUBLIC] = [
		FeatureType.PUBLIC
	];

	map[ModuleType.OFFICIAL] = [
		FeatureType.OFFICIAL_CAROUSEL,
		FeatureType.OFFICIAL_ARTICLE,
		FeatureType.OFFICIAL_STAR,
		FeatureType.OFFICIAL_TOPIC
	];

	map[ModuleType.ENTRY_APPLY] = [
		FeatureType.ENTRY_APPLY_MY_LIST,
		FeatureType.ENTRY_APPLY_LIST,
		FeatureType.ENTRY_APPLY_NOTIFICATION,
		FeatureType.ENTRY_APPLY_FIELD
	];

	map[ModuleType.STARTUP_PROJECT] = [
		FeatureType.STARTUP_PROJECT_PROJECT_MY_LIST,
		FeatureType.STARTUP_PROJECT_PROJECT_LIST,
		FeatureType.STARTUP_PROJECT_COMPANY_MY_LIST,
		FeatureType.STARTUP_PROJECT_COMPANY_LIST,
		FeatureType.STARTUP_PROJECT_PROJECT_FIELD
	];

	map[ModuleType.KEEPER_BUSINESS] = [
		FeatureType.KEEPER_BUSINESS_MY_LIST,
		FeatureType.KEEPER_BUSINESS_LIST,
		FeatureType.KEEPER_BUSINESS_TYPE_LIST
	];


	map[ModuleType.SPACE] = [
		FeatureType.SPACE_APPLY_MY_LIST,
		FeatureType.SPACE_APPLY_LIST,
		FeatureType.SPACE_FIELD
	];

	map[ModuleType.PROTOCOL] = [
		FeatureType.PROTOCOL_INCUBATOR,
		FeatureType.PROTOCOL_SPACE
	];

	map[ModuleType.FINANCE] = [
		FeatureType.FINANCE_PAY_INFO,
		FeatureType.FINANCE_PAY_INFO_REMINDER,
		FeatureType.FINANCE_BILL
	];

	map[ModuleType.USER] = [
		FeatureType.USER_LIST
	];

	map[ModuleType.MESSAGE] = [
		FeatureType.MESSAGE_REMIND,
		FeatureType.MESSAGE_LETTER
	];

  map[ModuleType.INVESTMENT] = [
    FeatureType.INVESTMENT
  ];

	map[ModuleType.OTHER] = [
		FeatureType.OTHER
	];

	return map[moduleType];

}
