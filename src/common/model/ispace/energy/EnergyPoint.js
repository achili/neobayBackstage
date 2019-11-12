import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import User from "../../user/User";
import ISpaceTaskInfo from "../door/ISpaceTaskInfo";

let Type = {
  WATT_METER:"WATT_METER",
  AIR_CONDITIONER:"AIR_CONDITIONER"
}

let TypeMap = {
  WATT_METER: {
    name: "电表",
    value: "WATT_METER",
    style: "success"
  },
  AIR_CONDITIONER: {
    name: "空调控制器",
    value: "AIR_CONDITIONER",
    style: "info"
  }
}

export default function EnergyPoint() {
  BaseEntity.call(this, arguments);
  this.creator =  new User();

  this.name = null;
  this.description = null;
  this.deviceId = null;
  this.point = null;

  this.type = Type.WATT_METER;
  this.value = null;
  this.acqTime = null;
}

EnergyPoint.prototype = new BaseEntity();
EnergyPoint.prototype.constructor = EnergyPoint;

EnergyPoint.prototype.Type = Type;
EnergyPoint.prototype.TypeMap = TypeMap;
EnergyPoint.prototype.TypeList = EnergyPoint.prototype.getTypeList();

EnergyPoint.prototype.URL_PAGE = "/ispace/energy/point/page";
EnergyPoint.prototype.URL_ENERGY_POINT_MORE = "/v1/ispace/energy/point/common/service";

EnergyPoint.prototype.getFilters = function () {
  return [
    new Filter("INPUT", "关键字(设备名称)", "keyword"),
    new Filter("SELECTION", "设备类型", "type", this.getTypeList())
  ];
};

EnergyPoint.prototype.getTypeStyle = function () {
  let item = TypeMap[this.type];
  if (item) {
    return item.style;
  } else {
    return "default";
  }
};
EnergyPoint.prototype.getTypeName = function () {
  let item = TypeMap[this.type];
  if (item) {
    return item.name;
  } else {
    return "未知状态";
  }
};

EnergyPoint.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("creator", User);
  this.renderEntity("acqTime", Date);
}

EnergyPoint.prototype.getForm = function () {
  return {
    name: this.name,
    creator: this.creator,
    description: this.description,
    deviceId: this.deviceId,
    point: this.point,
    type: this.type
  };
}

EnergyPoint.prototype.validate = function () {
  if (!this.name) {
    this.errorMessage = "设备名称必填！";
    return false;
  }
  if (!this.deviceId) {
    this.errorMessage = "设备ID必填！";
    return false;
  }
  if (!this.point) {
    this.errorMessage = "设备点位ID必填";
    return false;
  }
  if (!this.type) {
    this.errorMessage = "设备类型必填";
    return false;
  }
  return true;
};

let TypeList = [];
for (let key in TypeMap) {
  if (TypeMap.hasOwnProperty(key)) {
    TypeList.push(TypeMap[key]);
  }
}


EnergyPoint.prototype.getUrlPrefix = function () {
  return "/ispace/energy/point";
};


EnergyPoint.prototype.httpEnergyPointMore = function () {
      // window.location.href = this.URL_ENERGY_POINT_MORE   //在当前页打开新页面
      window.open(this.URL_ENERGY_POINT_MORE);  //在新窗口打开新页面
};
