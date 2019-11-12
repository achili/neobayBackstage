import BaseEntity from "../base/BaseEntity"
import {simpleDateTime, str2Date} from "../../filter/time";
import Vue from "vue";

let Status = {
	OK: "OK"
}
let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "success"
	}
}

export default function ProjectFinancing() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.investmentTime = new Date();
	this.investmentPeople = null;
	this.investmentValue = null;
	this.equityRatio = null;

	this.status = Status.OK;


	if (Vue.store.state.debug) {
		this.mockData();
	}
}



//extend BaseEntity
ProjectFinancing.prototype = new BaseEntity();
ProjectFinancing.prototype.constructor = ProjectFinancing;


//测试数据。
ProjectFinancing.prototype.mockData = function () {
	this.investmentTime = new Date();
	this.investmentPeople = "李嘉诚";
	this.investmentValue = 2000;
	this.equityRatio = 13.2;
}


//We use this method to get the full js Object.
ProjectFinancing.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.investmentTime = str2Date(this.investmentTime);
}

ProjectFinancing.prototype.getForm = function () {

	let form = {
		name: this.name,
		investmentTime: simpleDateTime(this.investmentTime),
		investmentPeople: this.investmentPeople,
		investmentValue: this.investmentValue,
		equityRatio: this.equityRatio

	};
	if (this.id) {
		form.id = this.id;
	}


	return form;

}

ProjectFinancing.prototype.validate = function () {

	if (!this.investmentPeople) {
		this.errorMessage = "投资人(方)必填！";
		return false;
	}
	if (!this.investmentTime) {
		this.errorMessage = "投资时间必填！";
		return false;
	}
	if (!this.investmentValue) {
		this.errorMessage = "投资金额必填！";
		return false;
	}
	if (!this.equityRatio) {
		this.errorMessage = "占股权比例必填！";
		return false;
	}

	return true;
}




