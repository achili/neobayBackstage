import BaseEntity from "../base/BaseEntity";
import Survey from "../survey/Survey";
import User from "../user/User";
import Filter from "../base/Filter";


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


export default function SurveyAnswer() {

	//extend Base's Attributes.
	BaseEntity.call(this, arguments);

	this.user = new User();
	this.survey = new Survey();
	this.content = new Survey();

	//状态
	this.status = Status.OK;


}

//extend BaseEntity's methods.
SurveyAnswer.prototype = new BaseEntity();
SurveyAnswer.prototype.constructor = SurveyAnswer;

SurveyAnswer.prototype.URL_READY = "/survey/answer/ready/{surveyId}";

SurveyAnswer.prototype.Status = Status;
SurveyAnswer.prototype.StatusMap = StatusMap;
SurveyAnswer.prototype.StatusList = SurveyAnswer.prototype.getStatusList();
SurveyAnswer.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("INPUT", "用户ID", "userId", null, null, false),
		new Filter("INPUT", "表单ID", "surveyId", null, null, false)
	];
};


SurveyAnswer.prototype.setProcedure = function (p) {

	// this.survey.setProcedure(p);
	this.content.setProcedure(p);
}


SurveyAnswer.prototype.getForm = function () {

	let form = {
		content: JSON.stringify(this.content.getForm())
	};

	if (this.id) {
		form.id = this.id;
	}

	return form;
}

//Extend some all the things include arrays. More powerful than extend.
SurveyAnswer.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	if (this.content) {
		this.renderEntity("content", Survey);
	}

	if (this.user) {
		this.renderEntity("user", User);
	}

}

SurveyAnswer.prototype.validate = function () {

	let hasError = false;
	for (let index in this.content.questions) {
		let question = this.content.questions[index];
		let questionValidate = question.answerValidate();
		hasError = !questionValidate || hasError;
	}

	if (hasError) {
		this.errorMessage = "请按照要求填写每个问题。";
		return false;
	} else {
		this.errorMessage = null;
		return true;
	}
}

SurveyAnswer.prototype.httpReady = function (surveyId, successCallback, errorCallback) {
	let that = this;
	let url = this.URL_READY.replace("{surveyId}", surveyId);
	this.httpPost(url, {}, function (response) {

		that.render(response.data[that.getTAG()]);

		that.setProcedure(Survey.prototype.Procedure.ANSWER_EDIT);

		successCallback && successCallback(response);

	}, errorCallback);
}



