import BaseEntity from '../base/BaseEntity'
import Tank from '../tank/Tank'
import Filter from '../base/Filter'
import User from '../user/User'
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  OK: "OK",
  DISABLED: "DISABLED"
};

let StatusMap = {
  OK: {
    name: "生效",
    value: "OK",
    style: "success"
  },
  DISABLED: {
    name: "未生效",
    value: "DISABLED",
    style: "danger"
  }
};

let StatusList = [];
for (let key in StatusMap) {
  StatusList.push(StatusMap[key]);
}


export default function MakerCarousel() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);

  this.user = new User();

  this.name = null;
  //Tank Object
  this.image = new Tank("image", false);

  this.description = null;
  this.title = null;
  this.subtitle = null;

  this.url = null;

  this.status = Status.OK;


}


//extend BaseEntity
MakerCarousel.prototype = new BaseEntity();
MakerCarousel.prototype.constructor = MakerCarousel;

MakerCarousel.prototype.URL_STATUS = "/maker/carousel/status";

MakerCarousel.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "SORT", "orderSort"),
    new Filter('`', '关键字', 'keyword'),
    new Filter("INPUT", "名称", "name"),
    new Filter("SELECTION", "状态", "status", StatusList),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

MakerCarousel.prototype.Status = Status;
MakerCarousel.prototype.StatusMap = StatusMap;
MakerCarousel.prototype.StatusList = StatusList;

//We use this method to get the full js Object.
MakerCarousel.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);

  let image = new Tank();
  image.render(obj.image);
  this.image = image;
};

MakerCarousel.prototype.getForm = function () {

  let form = {
    name: this.name,
    imageCode: this.image.code,
    title: this.title,
    subtitle: this.subtitle,
    url: this.url,
    spaceRegional:this.spaceRegional.id

  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

};


MakerCarousel.prototype.validate = function () {
  //简单验证一下
  if (!this.name) {
    this.errorMessage = "轮播图名称必填！";
    return false;
  }
  if (!this.title) {
    this.errorMessage = "标题必填！";
    return false;
  }
  if (!this.subtitle) {
    this.errorMessage = "副标题必填！";
    return false;
  }

  if (!this.image.code) {
    this.errorMessage = "图片必填！";
    return false;
  }

  if (!this.url) {
    this.errorMessage = "url必填！";
    return false;
  }

  return true;
};

MakerCarousel.prototype.httpStatus = function (status, successCallback, failureCallback) {


  this.httpPost(this.URL_STATUS, {"id": this.id, status}, successCallback, failureCallback);

  return true;
};

//点击轮播图之后的跳转。
MakerCarousel.prototype.click = function () {

  window.location.href = this.url;
};


