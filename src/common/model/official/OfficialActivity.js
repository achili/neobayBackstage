import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import User from "../user/User";
import OfficialActivityType from "./OfficialActivityType";
import {isInteger} from "../../util/Utils";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
	//尚未开始
	NEW: "NEW",
	//活动中止
	EXCEPTION: "EXCEPTION",
	//进行中
	PROCESSING: "PROCESSING",
	//活动结束
	STOP: "STOP"
}
let StatusMap = {
	NEW: {
		name: "正在报名中",
		value: "NEW",
		style: "primary"
	},
	EXCEPTION: {
		name: "活动中止",
		value: "EXCEPTION",
		style: "danger"
	},
	PROCESSING: {
		name: "进行中",
		value: "PROCESSING",
		style: "success"
	},
	STOP: {
		name: "活动结束",
		value: "STOP",
		style: "default"
	}
}

let Category = {
	//自己的活动，可以提供报名
	SELF: "SELF",
	//别人的活动，不提供报名
	OTHER: "OTHER"
}
let CategoryMap = {
	SELF: {
		name: "自己的活动，可以在线报名",
		value: "SELF",
		style: "primary"
	},
	OTHER: {
		name: "别人的活动，不可在线报名",
		value: "OTHER",
		style: "danger"
	}
}

export default function OfficialActivity() {
	BaseEntity.call(this, arguments);

	this.user = new User();

	this.title = null;
	this.address = null;
	//Tank Object
	this.poster = new Tank("image", false, 1024 * 1024, "图片大小不超过1M");

	this.posterUrl = null;

	this.type = new OfficialActivityType();

	this.sponsor = null;
	this.applyStartTime = new Date();
	this.applyEndTime = new Date();
	this.num = 0;
	this.maxNum = 0;
	this.startTime = new Date();
	this.endTime = new Date();
	this.releaseTime = new Date();
	this.author = null;
	this.digest = null;
	this.content = null;
	this.category = Category.SELF;
	this.status = Status.NEW;

}

//extend BaseEntity
OfficialActivity.prototype = new BaseEntity();
OfficialActivity.prototype.constructor = OfficialActivity;
OfficialActivity.prototype.URL_STATUS = "/official/activity/status";

OfficialActivity.prototype.Status = Status;
OfficialActivity.prototype.StatusMap = StatusMap;
OfficialActivity.prototype.StatusList = OfficialActivity.prototype.getStatusList();

OfficialActivity.prototype.registerEnum("Category", CategoryMap);

OfficialActivity.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
    new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "类型编号", "typeId"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)
  ];
};

OfficialActivity.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("applyStartTime", Date);
	this.renderEntity("applyEndTime", Date);
	this.renderEntity("releaseTime", Date);
	this.renderEntity("startTime", Date);
	this.renderEntity("endTime", Date);

	this.renderEntity("poster", Tank);

	this.renderEntity("user", User);

	this.renderEntity("type", OfficialActivityType);

}

OfficialActivity.prototype.getForm = function () {

	let form = {
    keyword: this.keyword,
		title: this.title,
		address: this.address,
		posterCode: this.poster.code,
		typeId: this.type.id,
		sponsor: this.sponsor,
		applyStartTime: simpleDateTime(this.applyStartTime),
		applyEndTime: simpleDateTime(this.applyEndTime),
		maxNum: this.maxNum,
		startTime: simpleDateTime(this.startTime),
		endTime: simpleDateTime(this.endTime),
		releaseTime: simpleDateTime(this.releaseTime),
		author: this.author,
		digest: this.digest,
		content: this.content,
		category: this.category,
		status: this.status
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


OfficialActivity.prototype.validate = function () {

	if (!this.title) {
		this.errorMessage = "标题必填！";
		return false;
	}

	if (!this.address) {
		this.errorMessage = "地址必填！";
		return false;
	}

	if (!this.poster.code) {
		this.errorMessage = "图片必填！";
		return false;
	}

	if (!this.type.id) {
		this.errorMessage = "活动类型必填！";
		return false;
	}

	if (!this.sponsor) {
		this.errorMessage = "活动发起方必填！";
		return false;
	}

	if (!this.applyStartTime) {
		this.errorMessage = "报名开始日期必填！";
		return false;
	}

	if (!this.applyEndTime) {
		this.errorMessage = "报名结束日期必填！";
		return false;
	}

	// type为number的输入框的值是String类型，正则判断输入值是否全为整数
  let reg = /^\d+$/;
	if (this.maxNum === null || !reg.test(this.maxNum)) {
		this.errorMessage = "活动最大人数必填整数！";
		return false;
	}

	if (!this.startTime) {
		this.errorMessage = "活动开始日期必填！";
		return false;
	}

	if (!this.endTime) {
		this.errorMessage = "活动结束日期必填！";
		return false;
	}

	if (!this.releaseTime) {
		this.errorMessage = "发布日期必填！";
		return false;
	}

	if (!this.author) {
		this.errorMessage = "作者必填！";
		return false;
	}

	if (!this.digest) {
		this.errorMessage = "摘要必选！";
		return false;
	}

	if (!this.content) {
		this.errorMessage = "内容必填！";
		return false;
	}

	if (!this.category) {
		this.errorMessage = "活动分类必填！";
		return false;
	}

	if (!this.status) {
		this.errorMessage = "活动状态必填！";
		return false;
	}

	return true;
}

OfficialActivity.prototype.httpStatus = function (params, successCallback, failureCallback) {
	let that = this;
	this.httpPost(this.URL_STATUS, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}
