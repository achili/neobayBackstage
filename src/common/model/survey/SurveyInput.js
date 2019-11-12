import SurveyComponent from "./SurveyComponent";
import Survey from "./Survey";
import {simpleDateTime, simpleDate, simpleMinute, str2Date} from "../../filter/time";
import Tank from "../tank/Tank";

let Type = {
	//普通文本
	TEXT: "TEXT",
	//时间
	TIME: "TIME",
	//日期
	DATE: "DATE",
	//日期时间
	DATETIME: "DATETIME",
	//文件上传
	UPLOAD: "UPLOAD"
};


export default function SurveyInput() {

	//extend SurveyComponent's Attributes.
	SurveyComponent.call(this, arguments);

	this.title = null;

  this.value = null;

	this.time = new Date();
	this.date = new Date();
	this.datetime = new Date();

	this.tank = new Tank("*", true);

	this.tank.disabled = true;

	this.row = 1;

	this.col = 12;

	this.validation = null;
	this.type = Type.TEXT;

}
//extend SurveyComponent
SurveyInput.prototype = new SurveyComponent();
SurveyInput.prototype.constructor = SurveyInput;
SurveyInput.prototype.Type = Type;


//render方法可能是从服务器来的，也可能是DYNAMIC_GROUP时添加组所得。
SurveyInput.prototype.render = function (obj) {

	SurveyComponent.prototype.render.call(this, obj);

	if (this.type === Type.TEXT) {

	} else if (this.type === Type.TIME) {

		if (obj.time) {
			this.time = new Date(simpleDate(new Date()) + " " + this.time + ":00");
		} else {
			this.time = new Date();
		}

	} else if (this.type === Type.DATE) {

		if (obj.date) {
			this.date = str2Date(obj.date);
		} else {
			this.date = new Date();
		}


	} else if (this.type === Type.DATETIME) {

		if (obj.datetime) {
			this.datetime = str2Date(obj.datetime);
		} else {
			this.datetime = new Date();
		}

	} else if (this.type === Type.UPLOAD) {


		this.renderEntity("tank", Tank);

	}

}


SurveyInput.prototype.getForm = function () {
	let form = {
		title: this.title,
		row: this.row,
		col: this.col,
		type: this.type
	}


	if (this.type === Type.TEXT) {

		form.value = this.value;
		form.validation = this.validation;

	} else if (this.type === Type.TIME) {

		if (this.procedure === Survey.prototype.Procedure.SURVEY_CREATE ||
			this.procedure === Survey.prototype.Procedure.SURVEY_EDIT
		) {
			form.time = null;
		} else {
			form.time = simpleMinute(this.time);
		}

	} else if (this.type === Type.DATE) {

		if (this.procedure === Survey.prototype.Procedure.SURVEY_CREATE ||
			this.procedure === Survey.prototype.Procedure.SURVEY_EDIT
		) {
			form.date = null;
		} else {
			form.date = simpleDate(this.date);
		}

	} else if (this.type === Type.DATETIME) {

		if (this.procedure === Survey.prototype.Procedure.SURVEY_CREATE ||
			this.procedure === Survey.prototype.Procedure.SURVEY_EDIT
		) {
			form.datetime = null;
		} else {
			form.datetime = simpleDateTime(this.datetime);
		}

	} else if (this.type === Type.UPLOAD) {

		if (this.procedure === Survey.prototype.Procedure.SURVEY_CREATE ||
			this.procedure === Survey.prototype.Procedure.SURVEY_EDIT
		) {
			form.value = null;
		} else {
			form.value = this.tank.code;
		}

	}

	return form;

}


SurveyInput.prototype.answerValidate = function () {

	if (this.type === Type.TEXT) {
		if (this.value === null) {
			this.errorMessage = "文本框必填";
			return false;
		}
	} else if (this.type === Type.TIME) {

	} else if (this.type === Type.DATE) {

	} else if (this.type === Type.DATETIME) {

	} else if (this.type === Type.UPLOAD) {

		if (!this.tank.exist()) {
			this.errorMessage = "请选择上传文件";
			return false;
		}

	}

	this.errorMessage = null;
	return true;

}

SurveyInput.prototype.setProcedure = function (p) {
	this.procedure = p;
	if (this.type === Type.UPLOAD) {

		this.tank.disabled = this.procedure !== Survey.prototype.Procedure.ANSWER_EDIT;

	}


}

