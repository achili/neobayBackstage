import Base from "../base/Base";
import Pager from "../base/Pager";
import MessageRemind from "./remind/MessageRemind";
import MessageLetter from "./letter/MessageLetter";
import Vue from "vue";

export default function MessageManager(id = null, name = null, description = null) {

	//extend Base's Attributes.
	Base.call(this, arguments);

	this.remindCount = 0;
	this.letterCount = 0;
	this.totalCount = 0;


	this.messageRemindPager = new Pager(MessageRemind, 10);
	this.messageLetterPager = new Pager(MessageLetter, 10);

	this.messageRemind = new MessageRemind();
	this.messageLetter = new MessageLetter();

	//轮询的间隔 60s
	this.INTERVAL = 60 * 1000;
	this.countIntevalFunction = null;



	this.initialized = false;

}


//extend Base's methods.
MessageManager.prototype = new Base();
MessageManager.prototype.constructor = MessageManager;
MessageManager.prototype.URL_COUNT = "/message/manager/count";

//We use this method to get the full js Object.
MessageManager.prototype.render = function (obj) {

	Base.prototype.render.call(this, obj);

}


MessageManager.prototype.start = function () {

	let that = this;
	if (this.initialized) {
		console.error("MessageManager已经启动，请勿重复操作！");
		return;
	}

	if (this.countIntevalFunction) {
		clearInterval(this.countIntevalFunction);
		this.countIntevalFunction = null;
	}
	//开始轮询。
	this.httpCount();
	this.countIntevalFunction = setInterval(function () {
		that.httpCount();
	}, this.INTERVAL);

}

MessageManager.prototype.httpCount = function (successCallback, errorCallback) {

	let that = this;

	//只在登录了的情况下去轮询。
	if (!Vue.store.state.user.isLogin) {
		return;
	}

	this.httpGet(this.URL_COUNT, {}, function (response) {

		that.render(response.data[that.getTAG()]);

		successCallback && successCallback(response);

	}, function (errorMessage) {
		console.error("轮询出错了");
		console.error(errorMessage);
	}, {showProgressBar: false});

}
