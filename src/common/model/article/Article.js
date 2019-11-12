import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import User from "../user/User";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import SpaceRegional from "../space/SpaceRegional";
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

export default function Article() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.user = new User();
	this.title = null;
	//Array
	this.tags = [];
	//Tank Object
	this.poster = new Tank("image", false);
	this.author = null;
	this.digest = null;
	this.content = null;
	this.hit = null;
	this.top = false;
	//Date
	this.releaseTime = new Date();
	this.special = false;
	this.status = Status.OK;

}


//extend BaseEntity
Article.prototype = new BaseEntity();
Article.prototype.constructor = Article;


Article.prototype.Status = Status;
Article.prototype.StatusMap = StatusMap;
Article.prototype.StatusList = Article.prototype.getStatusList();


Article.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "点击量", "orderHit"),
		new Filter("SORT", "发布时间", "orderReleaseTime"),
		new Filter("SORT", "作者", "orderAuthor"),
		new Filter("INPUT", "标签", "tag"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "标题", "title"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};


//We use this method to get the full js Object.
Article.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("user", User);

	this.renderEntity("releaseTime", Date);

	this.renderEntity("poster", Tank);


}



Article.prototype.getForm = function () {

	let form = {
		title: this.title,
		tags: JSON.stringify(this.tags),
		posterCode: this.poster.code,
		author: this.author,
		digest: this.digest,
		content: this.content,
		hit: this.hit,
		releaseTime: simpleDateTime(this.releaseTime),
    spaceRegional:this.spaceRegional.id
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


Article.prototype.validate = function () {

  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必填！";
    return false;
  }

	if (!this.title) {
		this.errorMessage = "标题必填！";
		return false;
	}

	if (!this.poster.code) {
		this.errorMessage = "图片必填！";
		return false;
	}

	if (!this.releaseTime) {
		this.errorMessage = "发布日期必填！";
		return false;
	}

	if (!this.author) {
		this.errorMessage = "作者必填！";
		return false;
	}
	if (!this.content) {
		this.errorMessage = "内容必填！";
		return false;
	}


	return true;
}

