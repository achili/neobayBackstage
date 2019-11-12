import BaseEntity from '../base/BaseEntity'
import Tank from '../tank/Tank'
import { simpleDateTime, str2Date } from '../../filter/time'
import Filter from '../base/Filter'
import User from '../user/User'
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

export default function OfficialStar() {
	BaseEntity.call(this, arguments);
	this.user = new User();
	this.name = null;
  this.score = null
	this.likeNum = 0;
  this.interviewLink = null;
  this.interviewLinkText = null;
	this.category = null;
	this.carousel = [];
	this.carouselUrls = [];

	//Tank Object
	this.poster = new Tank("image", false, 1024 * 1024, "建议尺寸4:3以达到最佳效果");

	this.posterUrl = null;

	this.content = null;
	this.releaseTime = new Date();

	this.status = Status.OK;


}

OfficialStar.prototype = new BaseEntity();
OfficialStar.prototype.constructor = OfficialStar;
OfficialStar.prototype.URL_LIKE = "/official/star/like/{id}"
OfficialStar.prototype.Status = Status;
OfficialStar.prototype.StatusMap = StatusMap;
OfficialStar.prototype.StatusList = OfficialStar.prototype.getStatusList();


OfficialStar.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "发布时间", "orderReleaseTime"),
    new Filter('INPUT', '名称', 'name'),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter('SORT', '点赞数', 'orderLike'),
    new Filter('SORT', '评分', 'orderScore'),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)
  ];
};

OfficialStar.prototype.addCarousel = function () {

	this.carousel.push(new Tank("image", false));
};

OfficialStar.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
	this.releaseTime = str2Date(this.releaseTime);
	this.renderList("carousel", Tank);
	this.renderEntity("poster", Tank);
};


OfficialStar.prototype.getForm = function () {
	let carouselInfo = [];
	if (this.carousel && this.carousel.length) {
		for (let i = 0; i < this.carousel.length; i++) {
			let tank = this.carousel[i];
			if (tank.exist()) {
				carouselInfo.push(tank.code);
			}
		}
	}
	let form = {
		name: this.name,
    keyword: this.keyword,
    interviewLink: this.interviewLink,
    interviewLinkText: this.interviewLinkText,
    score: this.score,
		category: this.category,
		posterCode: this.poster.code,
		carouselInfo: JSON.stringify(carouselInfo),
		content: this.content,
		likeNum: this.likeNum,
		releaseTime: simpleDateTime(this.releaseTime),
    spaceRegional:this.spaceRegional.id
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
};

OfficialStar.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选!";
    return false;
  }
	if (!this.name) {
		this.errorMessage = "明星项目的名称必填!";
		return false;
	}
	if (!this.category) {
		this.errorMessage = "明星项目的类型必填!";
		return false;
	}
	if (!this.content) {
		this.errorMessage = "内容必填！";
		return false;
	}
	if (this.carousel.length === 0) {
		this.errorMessage = "图片必须上传!";
		return false;
	}
	return true;
};

OfficialStar.prototype.httpLike = function (params, successCallback, failureCallback) {
	let that = this;
	let url = this.URL_LIKE.replace("{id}", this.id);
	this.httpPost(url, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}
