import BaseEntity from "../base/BaseEntity";
import SurveyQuestion from "../survey/SurveyQuestion";
import Vue from "vue";


import $ from "jquery";
import Filter from "../base/Filter";
import SpaceRegional from "../space/SpaceRegional";


//edit mode的表达能力不够，因此借用Procedure
let Procedure = {
	SURVEY_CREATE: "SURVEY_CREATE",
	SURVEY_EDIT: "SURVEY_EDIT",
	SURVEY_DISPLAY: "SURVEY_DISPLAY",
	ANSWER_EDIT: "ANSWER_EDIT",
	ANSWER_DISPLAY: "ANSWER_DISPLAY"

}

let Status = {
	NEW: "NEW",
	RUNNING: "RUNNING",
	STOP: "STOP"
}

let StatusMap = {
	NEW: {
		name: "待发布",
		value: "NEW",
		style: "info"
	},
	RUNNING: {
		name: "运行中",
		value: "RUNNING",
		style: "success"
	},
	STOP: {
		name: "已停止",
		value: "STOP",
		style: "danger"
	}
}

export default function Survey() {

	//extend Base's Attributes.
	BaseEntity.call(this, arguments);

	this.user = null;
	this.title = null;
	this.description = null;
	this.questions = [];
	this.questionMapList = [];
	//状态
	this.status = Status.NEW;
	this.surveyAnswers = [];

	//local fields.
	this.procedure = null;
}

//extend BaseEntity's methods.
Survey.prototype = new BaseEntity();
Survey.prototype.constructor = Survey;

Survey.prototype.URL_STATUS = "/survey/status";

Survey.prototype.Status = Status;
Survey.prototype.StatusMap = StatusMap;
Survey.prototype.StatusList = Survey.prototype.getStatusList();
Survey.prototype.Procedure = Procedure;
Survey.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("SELECTION", "状态", "status", this.getStatusList()),
		new Filter("MULTI_SELECTION", "状态多选", "statuses", this.getStatusList()),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

Survey.prototype.setProcedure = function (p) {

	this.procedure = p;
	for (let i = 0; i < this.questions.length; i++) {
		let question = this.questions[i];
		question.setProcedure(p);
	}
}

Survey.prototype.addQuestion = function (type) {
	let question = new SurveyQuestion(type);
	question.setProcedure(this.procedure);
	question.editMode = true;
	this.questions.push(question);
}

Survey.prototype.copyQuestion = function (index) {
	let question = this.questions[index];
	this.questions.push($.extend(new SurveyQuestion(), question));
}

Survey.prototype.upQuestion = function (index) {
	let question = this.questions[index];
	if (index !== 0) {
		this.questions.splice(index, 1);
		this.questions.splice(index - 1, 0, question);
	}
}
Survey.prototype.downQuestion = function (index) {

	let question = this.questions[index];
	if (index < this.questions.length - 1) {

		this.questions.splice(index, 1);
		this.questions.splice(index + 1, 0, question);
	}
}

Survey.prototype.delQuestion = function (index) {

	this.questions.splice(index, 1);

}


Survey.prototype.getForm = function () {

	let questionsInfo = [];
	if (this.questions) {
		for (let i = 0; i < this.questions.length; i++) {
			let question = this.questions[i];

			questionsInfo.push(question.getForm());
		}
	}

	let form = {
		title: this.title,
		description: this.description,
		questions: JSON.stringify(questionsInfo),
    spaceRegional:this.spaceRegional.id
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;
}

//Extend some all the things include arrays. More powerful than extend.
Survey.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderList("questions", SurveyQuestion);

}

Survey.prototype.validate = function () {


	if (!this.title) {
		this.errorMessage = "标题必填！";
		return false;
	}

	if (!this.questions || this.questions.length === 0) {
		this.errorMessage = "请至少准备一个问题！";
		return false;

	}
	//每个question都不是处于edit状态
	for (let index in this.questions) {
		let question = this.questions[index];
		if (question.editMode) {
			this.errorMessage = "请确保所有问题都处于非编辑状态！";
			return false;
		}
	}

	this.errorMessage = null;

	return true;

}

Survey.prototype.downloadCsv = function () {
	window.location = Vue.http.options.root + "/survey/download/csv/" + this.id;
}

Survey.prototype.downloadXls = function () {
	window.location = Vue.http.options.root + "/survey/download/xls/" + this.id;
}


//切换表单状态
Survey.prototype.httpStatus = function (status, successCallback, errorCallback) {

	if (status === this.status) {
		this.errorMessage = "状态未作修改";
		this.defaultErrorHandler(this.errorMessage, errorCallback);
		return;
	}

	if (!StatusMap[status]) {
		this.errorMessage = "状态:" + status + "不存在";
		this.defaultErrorHandler(this.errorMessage, errorCallback);
		return;
	}

	let that = this;
	this.httpPost(this.URL_STATUS, {id: this.id, status: status}, function (response) {
		that.status = status;
		successCallback && successCallback(response);
	}, errorCallback);

};


