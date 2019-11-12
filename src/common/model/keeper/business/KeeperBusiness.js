import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import KeeperBusinessOrganization from "./KeeperBusinessOrganization";
import KeeperBusinessType from "./KeeperBusinessType";
import User from "../../user/User";
import Project from "../../project/Project";
import {str2Date} from "../../../filter/time";
import Vue from "vue";
import SpaceRegional from "../../space/SpaceRegional";

let Status = {
	NEW: "NEW",
	PASS: "PASS",
	REJECT: "REJECT"
}

let StatusMap = {
	NEW: {
		name: "等待审核",
		value: "NEW",
		style: "warning",
		icon: "star"
	},
	PASS: {
		name: "已通过",
		value: "PASS",
		style: "success",
		icon: "check"
	},
	REJECT: {
		name: "未通过",
		value: "REJECT",
		style: "danger",
		icon: "ban"
	}
}


export default function KeeperBusiness() {

	BaseEntity.call(this, arguments);
	this.creator = new User();
	this.project = new Project();
	this.name = null;
	this.companyName = null;
	this.projectName = null;
	this.leaderName = null;
	this.leaderPhone = null;
	this.leaderEmail = null;
	this.reason = null;
	this.no = null;
	this.date = new Date();
	this.archive = false;
	this.status = Status.NEW;
	this.businessType = new KeeperBusinessType();
	this.organization = new KeeperBusinessOrganization();
}


KeeperBusiness.prototype = new BaseEntity();
KeeperBusiness.prototype.constructor = KeeperBusiness;

KeeperBusiness.prototype.URL_STATUS = "/keeper/business/status";
KeeperBusiness.prototype.URL_ARCHIVE = "/keeper/business/archive";
KeeperBusiness.prototype.URL_NOTIFICATION = "/keeper/business/notification";
KeeperBusiness.prototype.URL_DOWNLOAD_PDF = "/keeper/business/download/pdf/{id}";
KeeperBusiness.prototype.URL_NOTIFY = "/keeper/business/notify";


KeeperBusiness.prototype.Status = Status;
KeeperBusiness.prototype.StatusMap = StatusMap;
KeeperBusiness.prototype.StatusList = KeeperBusiness.prototype.getStatusList();


//从当前状态允许变成的下一个状态列表
KeeperBusiness.prototype.availableStatusList = function () {
	let list = [];
	if (this.status === this.Status.NEW) {

		list.push(this.StatusMap[this.Status.PASS]);
		list.push(this.StatusMap[this.Status.REJECT]);

	} else if (this.status === this.Status.PASS) {

		list.push(this.StatusMap[this.Status.REJECT]);

	} else if (this.status === this.Status.REJECT) {

		list.push(this.StatusMap[this.Status.PASS]);

	}
	return list;

};

KeeperBusiness.prototype.isRefuse = function () {
	return this.status === this.Status.REJECT;
}

KeeperBusiness.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "创建时间", "orderCreateTime"),
		new Filter("HTTP_SELECTION", "服务类型", "businessTypeId", null, KeeperBusinessType),
		new Filter("INPUT", "项目名称", "projectName"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("CHECK", "归档", "archive"),
		new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false),
    new Filter(Filter.prototype.Type.SELECTION, "状态", "status", this.getStatusList(), null, null, false),
    new Filter(Filter.prototype.Type.MULTI_SELECTION, "状态", "statuses", this.getStatusList()),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

KeeperBusiness.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.date = str2Date(this.date);
	this.renderEntity("creator", User);
	this.renderEntity("businessType", KeeperBusinessType);
	this.renderEntity("organization", KeeperBusinessOrganization);
}

KeeperBusiness.prototype.getForm = function () {
	let form = {
    keyword: this.keyword,
		projectId: this.project.id,
		companyName: this.companyName,
		projectName: this.projectName,
		leaderName: this.leaderName,
		leaderPhone: this.leaderPhone,
		leaderEmail: this.leaderEmail,
		organizationId: this.organization.id,
		businessTypeId: this.businessType.id
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}

KeeperBusiness.prototype.validate = function () {
	if (!this.projectName) {
		this.errorMessage = "项目名称必填！";
		return false;
	}
	if (!this.leaderName) {
		this.errorMessage = "联系人姓名必填！";
		return false;
	}
	if (!this.leaderPhone) {
		this.errorMessage = "联系人手机必填！";
		return false;
	}
	if (!this.leaderEmail) {
		this.errorMessage = "联系人邮箱必填！";
		return false;
	}
	if (!this.organization.id) {
		this.errorMessage = "未选择服务机构！";
		return false;
	}
	if (!this.businessType.id) {
		this.errorMessage = "咦 服务类型不见了！";
		return false;
	}
	return true;
}

KeeperBusiness.prototype.httpStatus = function (params, successCallback, failureCallback) {
	let that = this;
	this.httpPost(this.URL_STATUS, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

KeeperBusiness.prototype.downloadPdfUrl = function () {
	return Vue.http.options.root + this.URL_DOWNLOAD_PDF.replace("{id}", this.id);
}

//在发送notification之前应该调用notify方法
KeeperBusiness.prototype.httpNotify = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  }
  this.httpPost(this.URL_NOTIFY, form, successCallback, failureCallback);
}

//获取该实体应有的notification.
KeeperBusiness.prototype.httpNotification = function (action, successCallback, failureCallback) {
  let that = this;
  let form = {
    id: this.id,
    action: action
  };
  this.httpPost(this.URL_NOTIFICATION, form, successCallback, failureCallback);
};

//归档操作。
KeeperBusiness.prototype.httpArchive = function (reason, successCallback, failureCallback) {

	let that = this;

	let form = {
		id: this.id,
		archive: !this.archive,
		reason: reason
	};

	if (!this.URL_ARCHIVE) {
		console.error("没有定义URL_ARCHIVE");
		return;
	}
	this.httpPost(this.URL_ARCHIVE, form, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);

}

