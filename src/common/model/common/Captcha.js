import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";

let Status = {
	OK: "OK"
}

let StatusMap = {
	OK: {
		name: "OK",
		value: "OK",
		style: "success",
		icon: "hourglass"
	}
}


export default function Captcha() {

	BaseEntity.call(this, arguments);

	this.blob = null;
	this.blobUrl = null;
	this.token = null;
	this.value = null;

	//是否可见
	this.visible = true;

}


Captcha.prototype = new BaseEntity();
Captcha.prototype.constructor = Captcha;
Captcha.prototype.URL_CAPTCHA = "/captcha/fetch";


Captcha.prototype.Status = Status;
Captcha.prototype.StatusMap = StatusMap;
Captcha.prototype.StatusList = Captcha.prototype.getStatusList();

Captcha.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId")
	];
};

//We use this method to get the full js Object
Captcha.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);
}

Captcha.prototype.getForm = function () {

	let form = {};
	if (this.id) {
		form.id = this.id;
	}
	return form;

}


Captcha.prototype.validate = function () {

	return true;
}

Captcha.prototype.refresh = function () {
	this.httpCaptcha();
}


Captcha.prototype.httpCaptcha = function (successCallback, failureCallback) {
	let that = this;

	this.httpPost(this.URL_CAPTCHA, {"token": this.token}, function (response) {

		that.errorMessage = null;
		that.blob = response.data;
		let URL = window.URL || window.webkitURL;

		that.blobUrl = URL.createObjectURL(that.blob);

		that.token = response.headers.get("Token");

		if (typeof successCallback === "function") {
			successCallback();
		}

	}, failureCallback, {responseType: "blob"});
}

Captcha.prototype.reset = function () {
	this.value = null;

}
