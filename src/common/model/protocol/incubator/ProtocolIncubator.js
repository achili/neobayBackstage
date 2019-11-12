import BaseEntity from '../../base/BaseEntity'
import Filter from '../../base/Filter'
import User from '../../user/User'
import Project from '../../project/Project'
import Vue from 'vue'
import { simpleDateTime } from '../../../filter/time'
import Tank from '../../tank/Tank'
import { Status, StatusList, StatusMap } from '../ProtocolStatus'
import ProjectMentor from '../../project/ProjectMentor'
import SpaceRegional from "../../space/SpaceRegional";

export default function ProtocolIncubator() {

	BaseEntity.call(this, arguments);

	this.user = new User();
	this.operator = new User();
	this.project = new Project();
	//编号
	this.no = null;
	//名称
	this.name = null;
	this.description = null;
	//甲方
	this.partyA = Vue.store.state.preference.party
	//乙方
	this.partyB = null;
	//合同年限
	this.year = null;
	//开始时间
	this.startTime = new Date();
	//结束时间
	this.endTime = new Date();
	//空间
	this.space = Vue.store.state.preference.incubatorSpace;
	//甲方签署时间
	this.partyATime = new Date();
	//甲方法人
	this.partyARepresentative = null;
	//乙方签署时间
	this.partyBTime = new Date();
	//乙方法人
	this.partyBRepresentative = null;

	this.scanning = new Tank(".doc|.docx|.pdf|.jpg|.jpeg|.png", true, 50 * 1024 * 1024, "可上传doc,docx,pdf,jpg,jpeg,png格式的扫描件");
	//附件
	this.attachments = [];

	this.reason = null;

	this.archive = false;

  //合同版本号
  this.contractNo = null;

  //当前字段
  this.currentAttachments = []

	//状态
	this.status = Status.NEW;

	if (Vue.store.state.debug) {
		this.mockData();
	}
}


ProtocolIncubator.prototype = new BaseEntity();
ProtocolIncubator.prototype.constructor = ProtocolIncubator;

ProtocolIncubator.prototype.URL_DOWNLOAD_PDF = "/protocol/incubator/download/pdf/{id}";
ProtocolIncubator.prototype.URL_STATUS = "/protocol/incubator/status";
ProtocolIncubator.prototype.URL_ARCHIVE = "/protocol/incubator/archive";
ProtocolIncubator.prototype.URL_REFRESH_STATUS = "/protocol/incubator/refresh/status";
ProtocolIncubator.prototype.URL_UPLOAD_ATTACHMENTS = '/protocol/incubator/upload/attachments'

ProtocolIncubator.prototype.Status = Status;
ProtocolIncubator.prototype.StatusMap = StatusMap;
ProtocolIncubator.prototype.StatusList = StatusList;


ProtocolIncubator.prototype.mockData = function () {
	this.project = new Project();
	//编号
	this.no = null;
	//名称
	this.name = "零号湾孵化器孵化协议";
	this.description = "这里是零号湾孵化器孵化协议的描述";
	//甲方
	this.partyA = "上海零号湾创业投资有限公司";
	//乙方
	this.partyB = "上海xx信息科技有限公司";
	//合同年限
	this.year = "2";
	//开始时间
	this.startTime = new Date();
	this.startTime.setYear(2017);
	this.startTime.setMonth(1);
	this.startTime.setDate(1);
	//结束时间
	this.endTime = new Date();
	this.endTime.setYear(2018);
	this.endTime.setMonth(11);
	this.endTime.setDate(31);
	this.year = "2";
	//状态
	this.status = Status.NEW;
}

ProtocolIncubator.prototype.getFilters = function () {
	return [
		new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
		new Filter(Filter.prototype.Type.SORT, "名称", "orderName"),
    new Filter(Filter.prototype.Type.SORT, '编号', 'orderNo'),
		new Filter(Filter.prototype.Type.SORT, "开始时间", "orderStartTime"),
		new Filter(Filter.prototype.Type.SORT, "结束时间", "orderEndTime"),
		new Filter(Filter.prototype.Type.SELECTION, "状态", "status", this.getStatusList(), null, null, false),
    new Filter(Filter.prototype.Type.MULTI_SELECTION, "状态", "statuses", this.getStatusList()),
		new Filter(Filter.prototype.Type.INPUT, "协议名称", "name"),
		new Filter(Filter.prototype.Type.INPUT, "关键字", "keyword"),
    new Filter(Filter.prototype.Type.INPUT, '编号', 'no'),
    new Filter(Filter.prototype.Type.HTTP_SELECTION, '项目', 'projectId', null, Project),
    new Filter(Filter.prototype.Type.HTTP_SELECTION, '项目经理', 'projectMentorId', null, ProjectMentor),
		new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "起始时间", "fromDate"),
		new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "终止时间", "toDate"),
		new Filter(Filter.prototype.Type.CHECK, "归档", "archive"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

ProtocolIncubator.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("user", User);
	this.renderEntity("operator", User);
	this.renderEntity("startTime", Date);
	this.renderEntity("endTime", Date);
	if (this.partyATime) {
		this.renderEntity("partyATime", Date);
	}
	if (this.partyBTime) {
		this.renderEntity("partyBTime", Date);
	}
  this.renderEntity('project', Project)

	this.renderEntity("scanning", Tank);
	this.renderList("attachments", Tank);


}

ProtocolIncubator.prototype.getForm = function () {

	let form = {
		projectId: this.project.id,
		//名称
		name: this.name,
		//合同编号
		no: this.no,
    keyword: this.keyword,
		description: this.description,
		//甲方
		partyA: this.partyA,
		//乙方
		partyB: this.partyB,
		//合同年限
		year: this.year,
		//开始时间
		startTime: simpleDateTime(this.startTime),
		//结束时间
		endTime: simpleDateTime(this.endTime),
		//空间
		space: this.space

	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}


ProtocolIncubator.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}
	if (!this.partyA) {
		this.errorMessage = "甲方必填！";
		return false;
	}
	if (!this.partyB) {
		this.errorMessage = "乙方必填！";
		return false;
	}
	if (!this.year) {
		this.errorMessage = "合同年限！";
		return false;
	}
	if (!this.endTime) {
		this.errorMessage = "协议日期范围必填！";
		return false;
	}
	if (!this.startTime) {
		this.errorMessage = "协议日期范围必填！";
		return false;
	}
	if (!this.project.id) {
		this.errorMessage = "必须关联一个入驻申请！";
		return false;
	}

	return true;
}


ProtocolIncubator.prototype.downloadPdfUrl = function () {
	return Vue.http.options.root + this.URL_DOWNLOAD_PDF.replace("{id}", this.id);
}

//从当前状态允许变成的下一个状态列表
ProtocolIncubator.prototype.availableStatusList = function () {
	let list = [];
	if (this.status === this.Status.NEW) {

		list.push(this.StatusMap[this.Status.PROCESSING]);
		list.push(this.StatusMap[this.Status.EXCEPTION]);

	} else if (this.status === this.Status.PROCESSING) {

		list.push(this.StatusMap[this.Status.EXCEPTION]);

	} else if (this.status === this.Status.EXCEPTION) {

		list.push(this.StatusMap[this.Status.PROCESSING]);

	}
	return list;

};


ProtocolIncubator.prototype.validateChangeStatusForm = function () {


	if (!this.partyBRepresentative) {
		this.errorMessage = "请填写乙方代表！";
		return false;
	}
	if (!this.scanning.exist()) {
		this.errorMessage = "请上传扫描件！";
		return false;
	}
	this.errorMessage = null;

	return true;
}


ProtocolIncubator.prototype.httpStatus = function (status, reason, successCallback, failureCallback) {


	let attachmentsCodes = [];
	let form = null;
	if (status === Status.PROCESSING) {
		if (!this.validateChangeStatusForm()) {
			return;
		}

		this.attachments.forEach(tank => {
			attachmentsCodes.push(tank.code);
		});

		form = {
			"id": this.id,
			"status": status,
			"partyARepresentative": this.partyARepresentative,
			"partyBRepresentative": this.partyBRepresentative,
			"partyATime": simpleDateTime(this.partyATime),
			"partyBTime": simpleDateTime(this.partyBTime),
			"scanningCode": this.scanning.code,
			"attachmentsCodes": JSON.stringify(attachmentsCodes),
			"reason": reason
		};

	} else if (status === Status.EXCEPTION) {

		form = {
			"id": this.id,
			"status": status,
			"reason": reason
		};
	}

	let that = this;
	this.httpPost(this.URL_STATUS, form, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

ProtocolIncubator.prototype.httpUploadAttachments = function (successCallback, failureCallback) {

  let attachmentsCodes = []
  this.currentAttachments.forEach(tank => {
    attachmentsCodes.push(tank.code)
  })
  let form = {
    'id': this.id,
    'attachmentsCodes': JSON.stringify(attachmentsCodes)
  }

  let that = this
  this.httpPost(this.URL_UPLOAD_ATTACHMENTS, form, function (response) {
    that.render(response.data[that.getTAG()])
    successCallback && successCallback(response)
  }, failureCallback)
}


/**
 * 归档状态不能编辑
 * 不是NEW状态不能编辑
 */
ProtocolIncubator.prototype.canEdit = function () {

	if (this.archive) {
		return false;
	} else {
		if (this.status === Status.NEW) {
			return true;
		} else {
			return false;
		}
	}

}

/**
 * 只有NEW状态可以删除。
 */
ProtocolIncubator.prototype.canDel = function () {
	if (this.status === Status.NEW) {
		return true;
	} else {
		return false;
	}
}


//归档操作。
ProtocolIncubator.prototype.httpArchive = function (reason, successCallback, failureCallback) {

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


//手动刷新过期的合同状态.
ProtocolIncubator.prototype.httpRefreshStatus = function (successCallback, failureCallback) {

	let that = this;

	this.httpPost(this.URL_REFRESH_STATUS, {}, function (response) {

		successCallback && successCallback(response);
	}, failureCallback);



}
