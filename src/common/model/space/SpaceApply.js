import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import {MessageBox, Notification} from "element-ui";
import Project from "../project/Project";
import {simpleDateTime} from "../../filter/time";
import SpaceSeat from "./SpaceSeat";
import Vue from "vue";
import ProtocolSpace from "../protocol/space/ProtocolSpace";
import SpaceRoom from "./SpaceRoom";
import User from "../user/User";
import {Type, TypeMap, TypeList} from "./SpaceType";
import SpaceRegional from "./SpaceRegional";

let Status = {
	NEW: "NEW",
	REVIEWING: "REVIEWING",
	PASS: "PASS",
	REJECT: "REJECT"
}
let StatusMap = {
	NEW: {
		name: "等待审核",
		value: "NEW",
		style: "warning",
		icon: "hourglass-half"
	},
	REVIEWING: {
		name: "正在审核中",
		value: "REVIEWING",
		style: "info",
		icon: "eye"
	},
	PASS: {
		name: "审核通过",
		value: "PASS",
		style: "success",
		icon: "check"
	},
	REJECT: {
		name: "申请驳回",
		value: "REJECT",
		style: "danger",
		icon: "ban"
	}

}


export default function SpaceApply() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.creator = new User();

	this.project = new Project();


	this.name = null;

	this.projectName = null;
	this.companyName = null;
	this.leaderName = null;
	this.leaderPhone = null;
	this.leaderEmail = null;
	this.memberNum = null;
	this.seatNum = null;
	this.area = null;
	this.spacePurpose = null;
	this.estimatedTime = new Date();
	this.address = null;
	this.propertyNo = null;

	this.reason = null;

	this.status = Status.NEW;
	this.type = Type.INCUBATOR;
	this.archive = null;

	//一对一字段
	this.protocolSpace = null;

	this.spaceSeats = [];
	this.spaceRooms = [];


	if (Vue.store.state.debug) {
		this.mockData();
	}

}

//extend BaseEntity
SpaceApply.prototype = new BaseEntity();
SpaceApply.prototype.constructor = SpaceApply;

SpaceApply.prototype.URL_STATUS = "/space/apply/status";
SpaceApply.prototype.URL_REVIEWING = "/space/apply/reviewing/{id}";
SpaceApply.prototype.URL_ARCHIVE = "/space/apply/archive";

//编辑租赁协议部分
SpaceApply.prototype.URL_PROTOCOL_EDIT = "/space/apply/protocol/edit";
SpaceApply.prototype.URL_PROTOCOL_DOWNLOAD_PDF = "/space/apply/protocol/download/pdf/{id}";

SpaceApply.prototype.Status = Status;
SpaceApply.prototype.StatusMap = StatusMap;
SpaceApply.prototype.StatusList = SpaceApply.prototype.getStatusList();

SpaceApply.prototype.Type = Type;
SpaceApply.prototype.TypeMap = TypeMap;
SpaceApply.prototype.TypeList = SpaceApply.prototype.getTypeList();

//测试数据。
SpaceApply.prototype.mockData = function () {
	this.seatNum = 23;
	this.spacePurpose = "日常办公使用";
	this.area = 80;
}

SpaceApply.prototype.getFilters = function () {

	return [
		new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
		new Filter(Filter.prototype.Type.INPUT, "公司名称", "companyName"),
		new Filter(Filter.prototype.Type.INPUT, "项目名称", "projectName"),
		new Filter(Filter.prototype.Type.INPUT, "负责人", "leaderName"),
		new Filter(Filter.prototype.Type.CHECK, "有租赁合同", "hasProtocolSpace"),
    new Filter(Filter.prototype.Type.SELECTION, "状态", "status", this.getStatusList(), null, null, false),
    new Filter(Filter.prototype.Type.MULTI_SELECTION, "状态", "statuses", this.getStatusList()),
		new Filter(Filter.prototype.Type.SELECTION, "类型", "type", this.getTypeList()),
		new Filter(Filter.prototype.Type.HTTP_SELECTION, "创建者", "creatorId", null, User, false),
		new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "起始时间", "fromDate"),
		new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "终止时间", "toDate"),
		new Filter(Filter.prototype.Type.CHECK, "归档", "archive"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

SpaceApply.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("creator", User);
	this.renderEntity("project", Project);
	this.renderEntity("estimatedTime", Date);
	this.renderList("spaceSeats", SpaceSeat);
	this.renderList("spaceRooms", SpaceRoom);
	this.renderEntity("signTime", Date);

	if (!one2one) {
		this.renderEntity("protocolSpace", ProtocolSpace, true);
	}
}


SpaceApply.prototype.getForm = function () {

	this.name = this.projectName + "的空间申请";

	let form = {
		projectId: this.project.id,
		name: this.name,
		projectName: this.projectName,
		companyName: this.companyName,
		leaderName: this.leaderName,
		leaderPhone: this.leaderPhone,
		leaderEmail: this.leaderEmail,
		memberNum: this.memberNum,
		seatNum: this.seatNum,
		area: this.area,
		spacePurpose: this.spacePurpose,
		estimatedTime: simpleDateTime(this.estimatedTime),
		type: this.type
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;
}


SpaceApply.prototype.validate = function () {
	if (!this.project.id) {
		this.errorMessage = "请首先选择一个您的项目!";
		return false;
	}

	if (!this.companyName) {
		this.errorMessage = "公司名称必填!";
		return false;
	}


	if (!this.projectName) {
		this.errorMessage = "项目名称必填!";
		return false;
	}

	if (!this.leaderName) {
		this.errorMessage = "负责人名字必填!";
		return false;
	}

	if (!this.leaderPhone) {
		this.errorMessage = "负责人手机必填!";
		return false;
	}

	if (!this.leaderEmail) {
		this.errorMessage = "负责人邮箱必填!";
		return false;
	}

	if (!this.memberNum) {
		this.errorMessage = "团队人数必填!";
		return false;
	}


	if (this.type === Type.NURSERY) {
		if (!this.seatNum) {
			this.errorMessage = "申请工位数必填!";
			return false;
		}
	} else {
		if (!this.area) {
			this.errorMessage = "申请面积必填!";
			return false;
		}
	}

	return true;
}

//审核
SpaceApply.prototype.httpReviewing = function (successCallback, errorCallback) {
	let that = this;

	let url = this.URL_REVIEWING.replace("{id}", this.id);

	this.detailLoading = true;
	this.httpGet(url, {}, function (response) {
		that.detailLoading = false;

		that.render(response.data[that.getTAG()]);
		that.editMode = true;

		successCallback && successCallback(response);

	}, function (response) {
		that.detailLoading = false;

		if (typeof errorCallback === "function") {
			errorCallback();
		} else {
			//没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
			that.defaultErrorHandler(response);
		}
	});

}

SpaceApply.prototype.isRefuse = function () {
	return this.status === Status.REJECT;
}


//从当前状态允许变成的下一个状态列表
SpaceApply.prototype.availableStatusList = function () {
	let list = [];
	if (this.status === this.Status.NEW) {
		list.push(this.StatusMap[this.Status.REVIEWING]);
	} else if (this.status === this.Status.REVIEWING) {
		list.push(this.StatusMap[this.Status.NEW]);
		list.push(this.StatusMap[this.Status.PASS]);
		list.push(this.StatusMap[this.Status.REJECT]);
	} else if (this.status === this.Status.PASS) {
		//可能给用户重新分配位置
		list.push(this.StatusMap[this.Status.PASS]);
		list.push(this.StatusMap[this.Status.REJECT]);
	} else if (this.status === this.Status.REJECT) {
		list.push(this.StatusMap[this.Status.PASS]);
		//可能用户修改资料后还是拒绝。
		list.push(this.StatusMap[this.Status.REJECT]);
	}
	return list;

}

SpaceApply.prototype.httpStatus = function (params, successCallback) {
	let that = this;
	this.httpPost(this.URL_STATUS, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	});
}


SpaceApply.prototype.downloadPdfUrl = function () {
	return Vue.http.options.root + this.URL_PROTOCOL_DOWNLOAD_PDF.replace("{id}", this.id);
}
//归档操作。
SpaceApply.prototype.httpArchive = function (reason, successCallback, failureCallback) {

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

SpaceApply.prototype.canEdit = function () {

	if (!this.archive) {

		if (this.status === Status.NEW) {
			return true;
		}
	}

	return false;

}
SpaceApply.prototype.canDel = function () {
	if (!this.archive) {

		if (this.status === Status.NEW) {
			return true;
		}
	}

	return false;
}

