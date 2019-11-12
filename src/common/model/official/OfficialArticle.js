/**
 *
 * Created by lxd on 03/05/2017.
 */
import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import User from "../user/User";
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

let Type = {
	NEO_BAY_NEWS: "NEO_BAY_NEWS",
	NEO_TALK_SAY: "NEO_TALK_SAY",
	REPORT: "REPORT",
	POLICY: "POLICY",
	PROJECT_DYNAMICS: "PROJECT_DYNAMICS"
}
let TypeMap = {
	NEO_BAY_NEWS: {
		name: "neoBay新闻",
		value: "NEO_BAY_NEWS",
		style: ""
	},
	NEO_TALK_SAY: {
		name: "neoTalk牛说",
		value: "NEO_TALK_SAY",
		style: ""
	},
	REPORT: {
		name: "媒体报道",
		value: "REPORT",
		style: ""
	},
	POLICY: {
		name: "政策公布",
		value: "POLICY",
		style: ""
	},
	PROJECT_DYNAMICS: {
		name: "项目动态",
		value: "PROJECT_DYNAMICS",
		style: ""
	}
}

export default function OfficialArticle() {
	BaseEntity.call(this, arguments);

	this.user = new User();

	this.title = null;
	//Tank Object
	this.poster = new Tank("image", false, 1024 * 1024, "图片大小不超过1M");
	this.posterUrl = null;
	this.type = Type.NEO_BAY_NEWS;

	this.tags = [];
	this.releaseTime = new Date();
	this.author = null;
	this.digest = null;
	this.content = null;
	this.status = Status.OK;

}

//extend BaseEntity
OfficialArticle.prototype = new BaseEntity();
OfficialArticle.prototype.constructor = OfficialArticle;


OfficialArticle.prototype.Status = Status;
OfficialArticle.prototype.StatusMap = StatusMap;
OfficialArticle.prototype.StatusList = OfficialArticle.prototype.getStatusList();

OfficialArticle.prototype.Type = Type;
OfficialArticle.prototype.TypeMap = TypeMap;
OfficialArticle.prototype.TypeList = OfficialArticle.prototype.getTypeList();

OfficialArticle.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "点击量", "orderHit"),
		new Filter("SORT", "发布时间", "orderReleaseTime"),
		new Filter("SORT", "作者", "orderAuthor"),
		new Filter("INPUT", "标签", "tag"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "标题", "title"),
		new Filter("SELECTION", "类型", "type", this.TypeList),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

];
};

OfficialArticle.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("releaseTime", Date);

	this.renderEntity("poster", Tank);

}

OfficialArticle.prototype.getForm = function () {

	let form = {
		title: this.title,
		tags: JSON.stringify(this.tags),
		type: this.type,
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


OfficialArticle.prototype.validate = function () {

  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必填！";
    return false;
  }

	if (!this.title) {
		this.errorMessage = "标题必填！";
		return false;
	}

  if (this.tags.length === 0) {
    this.errorMessage = "标签必填！";
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
	if (!this.type) {
		this.errorMessage = "类型必选！";
		return false;
	}

	return true;
}
