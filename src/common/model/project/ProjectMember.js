import BaseEntity from "../base/BaseEntity"
import {simpleDateTime, str2Date} from "../../filter/time";
import Tank from "../tank/Tank";
import Vue from "vue";
import Project from "./Project";


export default function ProjectMember() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.name = null;
	this.department = null;
	this.position = null;
	this.telephone = null;
	this.fax = null;
	this.phone = null;
	this.docType = null;
	this.docNo = null;
	this.mail = null;
	this.education = null;
	this.highestTitle = null;
	this.firstWorkingYear = null;
	this.isShareholder = null;
	this.isPersonLiable = null;
	this.isContinuous = null;
	this.features = null;
	this.isOverseas = null;
	this.isPujiangTalent = null;
	this.isThousandPlan = null;
	this.thousandPlanCode = null;
	this.resume = new Tank("*", true);

	this.project = new Project();


	if (Vue.store.state.debug) {
		this.mockData();
	}
}


ProjectMember.prototype = new BaseEntity();
ProjectMember.prototype.constructor = ProjectMember;

//测试数据。
ProjectMember.prototype.mockData = function () {
	this.name = "爱因斯坦";
	this.department = "科研部";
	this.position = "首席科学家";
	this.telephone = "110";
	this.fax = "0123-123224";
	this.docType = "身份证";
	this.docNo = "500228199004555052";
	this.mail = "xxx@fax.com";
	this.phone = "15216716235";
	this.education = "博士";
	this.highestTitle = "首席专家科学家";
	this.firstWorkingYear = "1924";
	this.isShareholder = true;
	this.isPersonLiable = false;
	this.isContinuous = true;
	this.features = "大学生创业";
	this.isOverseas = true;
	this.isPujiangTalent = false;
	this.isThousandPlan = false;
	this.thousandPlanCode = "NB22324232";
	this.resume = new Tank("*", true);
	this.resume.mockDataPdfPrivacy();

}


//We use this method to get the full js Object.
ProjectMember.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("resume", Tank);
}

ProjectMember.prototype.getForm = function () {

	let form = {
		name: this.name,
		department: this.department,
		position: this.position,
		telephone: this.telephone,
		fax: this.fax,
		phone: this.phone,
		docType: this.docType,
		docNo: this.docNo,
		mail: this.mail,
		education: this.education,
		highestTitle: this.highestTitle,
		firstWorkingYear: this.firstWorkingYear,
		isShareholder: this.isShareholder,
		isPersonLiable: this.isPersonLiable,
		isContinuous: this.isContinuous,
		features: this.features,
		isOverseas: this.isOverseas,
		isPujiangTalent: this.isPujiangTalent,
		isThousandPlan: this.isThousandPlan,
		thousandPlanCode: this.thousandPlanCode,
		resumeCode: this.resume.code
	};
	if (this.id) {
		form.id = this.id;
	}


	return form;

}

ProjectMember.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "成员姓名必填！";
		return false;
	}

	if (!this.position) {
		this.errorMessage = "职位必填！";
		return false;
	}
	if (!this.docType) {
		this.errorMessage = "证件类型必填！";
		return false;
	}
	if (!this.docNo) {
		this.errorMessage = "证件号码必填！";
		return false;
	}
	if (!this.mail) {
		this.errorMessage = "邮件必填！";
		return false;
	}


	if (!this.phone) {
		this.errorMessage = "手机必填！";
		return false;
	}
	if (!this.education) {
		this.errorMessage = "学历必填！";
		return false;
	}

	// if (!this.firstWorkingYear) {
  //   this.errorMessage = "初次工作年份必填！";
  //   return false;
  // }
	if (!this.features) {
		this.errorMessage = "创业者特征必填！";
		return false;
	}
	if (!this.isShareholder) {
		this.errorMessage = "是否本公司股东必填！";
		return false;
	}
	if (!this.isPersonLiable) {
		this.errorMessage = "是否实际负责人必填！";
		return false;
	}
	if (!this.isContinuous) {
		this.errorMessage = "是否连续创业必填！";
		return false;
	}
	if (!this.isOverseas) {
		this.errorMessage = "是否海外引进必填！";
		return false;
	}
	if (!this.isPujiangTalent) {
		this.errorMessage = "是否浦江人才必填！";
		return false;
	}
	if (!this.isThousandPlan) {
		this.errorMessage = "是否千人计划必填！";
		return false;
	}
	// if (!this.resume.code) {
	// 	this.errorMessage = "简历必须添加！";
	// 	return false;
	// }

	return true;
}






