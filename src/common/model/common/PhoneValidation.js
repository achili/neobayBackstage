import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import Captcha from "./Captcha";

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


export default function PhoneValidation() {

	BaseEntity.call(this, arguments);

	this.phone = null;
	this.value = null;

	this.refreshTime = new Date();

	//true值时，当手机号注册过会抛异常。
	this.checkLogin = false;

	//true值时，当手机号没有注册过会抛异常。
	this.checkNotLogin = false;

	this.captcha = new Captcha();

	//冷却中
	this.coldingDown = 0;
	this.coldDownInterval = null;
}


PhoneValidation.prototype = new BaseEntity();
PhoneValidation.prototype.constructor = PhoneValidation;
PhoneValidation.prototype.URL_FETCH = "/sms/phone/validation/fetch";
PhoneValidation.prototype.URL_SHARE_FETCH = "/sms/phone/validation/share/fetch";

PhoneValidation.prototype.Status = Status;
PhoneValidation.prototype.StatusMap = StatusMap;
PhoneValidation.prototype.StatusList = PhoneValidation.prototype.getStatusList();

PhoneValidation.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId")
	];
};

//We use this method to get the full js Object
PhoneValidation.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("captcha", Captcha);
}

PhoneValidation.prototype.getForm = function () {

	let form = {};
	form.phone = this.phone;
	form.token = this.captcha.token;
	form.captcha = this.captcha.value;
	form.checkLogin = this.checkLogin;
	form.checkNotLogin = this.checkNotLogin;
	return form;

}


PhoneValidation.prototype.validate = function () {
	if (!this.phone) {
		this.errorMessage = "请输入手机号";
		return false;
	}
	if (!this.captcha) {
		this.errorMessage = "验证码模块出错";
		return false;
	}
	if (!this.captcha.value) {
		this.errorMessage = "请填写图形验证码";
		return false;
	}

	this.errorMessage = null;
	return true;
}

PhoneValidation.prototype.coldDown = function () {
	let that = this;

	if (this.coldingDown) {
		return;
	}

	this.refreshTime = new Date();

	if (this.coldDownInterval) {
		//清除定时器
		clearInterval(that.coldDownInterval);
	}
	this.coldDownInterval = setInterval(function () {
		that.coldingDown = parseInt(60 - (((new Date()).getTime() - that.refreshTime.getTime()) / 1000));
		if (that.coldingDown <= 0) {
			that.coldingDown = 0;

			//清除定时器
			clearInterval(that.coldDownInterval);
		}
	}, 1000);

}

PhoneValidation.prototype.reset = function () {
	let that = this;
	if (this.coldDownInterval) {
		//清除定时器
		clearInterval(that.coldDownInterval);
	}

	this.coldingDown = 0;
	this.phone = null;
	this.value = null;

	this.captcha.reset();

}

PhoneValidation.prototype.httpFetch = function (successCallback, failureCallback) {
	let that = this;

	if (!this.validate()) {
		return;
	}

	if (this.coldingDown > 0) {
		this.errorMessage = "您的操作太频繁";
		return;
	}

	this.httpPost(this.URL_FETCH, this.getForm(), function (response) {

		that.coldDown();

		if (typeof successCallback === "function") {
			successCallback();
		}

	}, failureCallback);
}

PhoneValidation.prototype.httpShareFetch = function (phone, successCallback, failureCallback) {
  let that = this;
  let form = {
    phone: phone
  }

  this.httpPost(this.URL_SHARE_FETCH, form, function (response) {

    that.coldDown();

    if (typeof successCallback === "function") {
      successCallback();
    }

  }, failureCallback);
}


