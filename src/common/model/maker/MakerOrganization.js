import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import User from "../user/User";
import {str2Date} from "../../filter/time";
import store from "../../../common/store"
import SpaceRegional from "../space/SpaceRegional";
import Tank from "../tank/Tank";

let Type = {
  //一卡通
  // ONE_CARD: "ONE_CARD",
  //园区市集
  // MARKET: "MARKET",
  //人才公寓
  APARTMENT: "APARTMENT",
  //协议酒店
  HOTEL: "HOTEL",
  //体育运动
  SPORT: "SPORT",
  //汽车租赁
  // CAR: "CAR",
  //电子维修
  // ELECTRONIC: "ELECTRONIC",
  //停车缴费
  PARK: "PARK",
  //美食
  // FOOD: "FOOD",
  //教育培训
  // EDUCATION: "EDUCATION",
  //快递物流
  // EXPRESS: "EXPRESS",
  //物业服务
  // SERVICE: "SERVICE",
  //心理辅导
  PSYCHOLOGICAL:"PSYCHOLOGICAL",
  //保险经纪
  INSURANCE:"INSURANCE"
};

let TypeMap = {
  // ONE_CARD: {
  //   name: "一卡通",
  //   value: "ONE_CARD"
  // },
  // MARKET: {
  //   name: "园区市集",
  //   value: "MARKET"
  // },
  APARTMENT: {
    name: "人才公寓",
    value: "APARTMENT"
  },
  HOTEL: {
    name: "协议酒店",
    value: "HOTEL"
  },
  SPORT: {
    name: "体育运动",
    value: "SPORT"
  },
  // CAR: {
  //   name: "汽车租赁",
  //   value: "CAR"
  // },
  // ELECTRONIC: {
  //   name: "电子维修",
  //   value: "ELECTRONIC"
  // },
  PARK: {
    name: "停车缴费",
    value: "PARK"
  },
  // FOOD: {
  //   name: "美食",
  //   value: "FOOD"
  // },
  // EDUCATION: {
  //   name: "教育培训",
  //   value: "EDUCATION"
  // },
  // EXPRESS: {
  //   name: "快递物流",
  //   value: "EXPRESS"
  // },
  // SERVICE: {
  //   name: "物业服务",
  //   value: "SERVICE"
  // },
  PSYCHOLOGICAL: {
    name: "心理辅导",
    value: "PSYCHOLOGICAL"
  },
  INSURANCE: {
    name: "保险经纪",
    value: "INSURANCE"
  }
};

let Status = {
  PROCESSING: "PROCESSING",
  FINISH: "FINISH"
};

let StatusMap = {
  PROCESSING: {
    name: "正在进行中",
    value: "PROCESSING",
    style: "info"
  },
  FINISH: {
    name: "审核通过",
    value: "FINISH",
    style: "success"
  }
}

export default function MakerOrganization() {

  BaseEntity.call(this, arguments);
  this.creator = new User();
  this.name = null;
  this.logo = new Tank("image", false);
  this.scanning = new Tank('image', false, 2 * 1024 * 1024, '最大不超过2M');
  this.description = null;
  this.url = null;
  this.type = Type.MARKET;
  this.status = Status.PROCESSING;
  this.orderUrl = store.state.domainName + "/by/maker/park/create";
  this.leaderName = null;
  this.leaderPhone = null;
  this.leaderEmail = null;
  this.reason = null;
}


MakerOrganization.prototype = new BaseEntity();
MakerOrganization.prototype.constructor = MakerOrganization;

MakerOrganization.prototype.URL_STATUS = "/maker/organization/status"

MakerOrganization.prototype.Type = Type;
MakerOrganization.prototype.TypeMap = TypeMap;
MakerOrganization.prototype.TypeList = MakerOrganization.prototype.getTypeList();
MakerOrganization.prototype.Status = Status;
MakerOrganization.prototype.StatusMap = StatusMap;
MakerOrganization.prototype.StatusList = MakerOrganization.prototype.getStatusList();

MakerOrganization.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false),
    new Filter("SELECTION", "项目类型", "type", this.getTypeList()),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

MakerOrganization.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.date = str2Date(this.date);
  this.renderEntity("creator", User);
  this.renderEntity("logo", Tank);
  this.renderEntity("scanning", Tank);
};

MakerOrganization.prototype.getForm = function () {
  let form = {
    spaceRegional:this.spaceRegional.id,
    name: this.name,
    logoCode: this.logo.code,
    scanningCode: this.scanning.code,
    description: this.description,
    url: this.url,
    type: this.type,
    orderUrl: this.orderUrl,
    leaderName: this.leaderName,
    leaderPhone: this.leaderPhone,
    leaderEmail: this.leaderEmail
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

MakerOrganization.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }
  if (!this.name) {
    this.errorMessage = "名称必填！";
    return false;
  }
  if (!this.logo) {
    this.errorMessage = "logo必填！";
    return false;
  }
  if (!this.scanning) {
    this.errorMessage = "营业执照必填！";
    return false;
  }
  if (!this.description) {
    this.errorMessage = "描述必填！";
    return false;
  }
  if (!this.type) {
    this.errorMessage = "服务类型必选！";
    return false;
  }
  if (!this.leaderName) {
    this.errorMessage = "联系人姓名必选！";
    return false;
  }
  if (!this.leaderPhone) {
    this.errorMessage = "联系人电话必选！";
    return false;
  }
  if (!this.leaderEmail) {
    this.errorMessage = "联系人邮箱必选！";
    return false;
  }
  return true;
};

//从当前状态允许变成的下一个状态列表
MakerOrganization.prototype.finishStatusList = function () {
  let list = [];
  list.push(this.StatusMap[this.Status.FINISH]);
  return list;
};

MakerOrganization.prototype.httpStatus = function (status, reason, successCallback, failureCallback) {
  let form = {
    "id": this.id,
    "status": status,
    "reason": reason
  };
  let that = this;
  this.httpPost(this.URL_STATUS, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};

