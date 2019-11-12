import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Project from "../project/Project";
import Filter from "../base/Filter";
import Tank from "../tank/Tank";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import {simpleDateTime} from "../../filter/time";

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

export default function MakerMarket() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.project = new Project();
  this.projectName = null;
  this.companyName = null;
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;
  this.title = null;
  //介绍
  this.description = null;

  this.poster = new Tank("image", false, 1024 * 1024, "请上传1MB以内的图片");
  this.posterUrl = null;

  this.posters = [];
  this.postersUrls = [];
  //活动
  this.startTime = new Date();
  this.endTime = new Date();
  this.activityAddress = null;
  //品牌
  this.brandName = null;
  this.brandDetails = null;
  this.status = Status.OK;

}

MakerMarket.prototype = new BaseEntity();
MakerMarket.prototype.constructor = MakerMarket;

MakerMarket.prototype.URL_STATUS = "/maker/market/status";

MakerMarket.prototype.Status = Status;
MakerMarket.prototype.StatusMap = StatusMap;
MakerMarket.prototype.StatusList = MakerMarket.prototype.getStatusList();

MakerMarket.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword')
  ];
};

MakerMarket.prototype.render = function (obj,one2one = false) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
  this.renderEntity("project", Project);
  this.renderEntity("startTime", Date);
  this.renderEntity("endTime", Date);

  this.renderEntity("poster", Tank);
  this.renderList("posters", Tank);

  if(this.postersInfo){
    if(this.postersInfo.length !== 0 ){
      this.postersInfo = JSON.parse(this.postersInfo)
    }
  }

};

MakerMarket.prototype.getForm = function () {
  let postersInfo = [];
  if(this.posters && this.posters.length){
    for(let i = 0; i < this.posters.length; i++){
      let tank = this.posters[i];
      if(tank.exist()){
        postersInfo.push(tank.code);
      }
    }
  }
  let form = {
    projectId: this.project.id,
    projectName: this.projectName,
    companyName: this.companyName,
    leaderName: this.leaderName,
    leaderPhone: this.leaderPhone,
    leaderEmail: this.leaderEmail,

    startTime: simpleDateTime(this.startTime),
    endTime: simpleDateTime(this.endTime),
    activityAddress: this.activityAddress,
    title: this.title,
    description: this.description,
    posterCode: this.poster.code,
    postersInfo:  JSON.stringify(postersInfo),

    brandName: this.brandName,
    brandDetails: this.brandDetails
  };
  if(this.id){
    form.id = this.id;
  }
  return form;
};

MakerMarket.prototype.validate = function () {
  if (!this.projectName) {
    this.errorMessage = "项目名称必填！";
    return false;
  }
  if (!this.leaderName) {
    this.errorMessage = "联系人姓名必填！";
    return false;
  }
  if (!this.leaderPhone) {
    this.errorMessage = "联系人手机必填！";
    return false;
  }
  if (!this.leaderEmail) {
    this.errorMessage = "联系人邮箱必填！";
    return false;
  }
  if(!this.title){
    this.errorMessage = "参展物品名称必填！";
    return false;
  }
  if(!this.description){
    this.errorMessage = "参展物品介绍必填！";
    return false;
  }
  if(!this.startTime){
    this.errorMessage = "活动结束时间必填！";
    return false;
  }
  if(!this.endTime){
    this.errorMessage = "活动结束时间必填！";
    return false;
  }
  if(!this.activityAddress){
    this.errorMessage = "活动地点必填！";
    return false;
  }
  if(!this.brandName){
    this.errorMessage = "品牌名必填！";
    return false;
  }
  if(!this.brandDetails){
    this.errorMessage = "品牌详情必填！";
    return false;
  }
  if(!this.poster.code){
    this.errorMessage = "参展物品照片必须上传！";
    return false;
  }
  return true;
};
//将信息从本地读取出来。
MakerMarket.prototype.renderFromLocalStorage = function () {
  try {
    let String = readLocalStorage(this.getTAG());
    if (String) {
      let json = JSON.parse(String);
      this.render(json);
    }
  } catch (e) {
    removeLocalStorage(this.getTAG());
  }
};
//保存到本地
MakerMarket.prototype.saveToLocalStorage = function () {
  this.errorMessage = null;
  saveToLocalStorage(this.getTAG(), JSON.stringify(this));
};
//清除本地信息
MakerMarket.prototype.clearLocalStorage = function () {
  removeLocalStorage(this.getTAG());
};
MakerMarket.prototype.httpStatus = function (status, successCallback, failureCallback) {

  this.httpPost(this.URL_STATUS, {"id": this.id, status}, successCallback, failureCallback);
  return true;
};
