import BaseEntity from "../base/BaseEntity";

import User from "../user/User";
import Filter from "../base/Filter";
import Tank from "../tank/Tank";
import SpaceBuilding from "../space/SpaceBuilding";
import KeeperBusinessType from "../keeper/business/KeeperBusinessType";
import SpaceRegional from "../space/SpaceRegional";
import SpaceRoom from "../space/SpaceRoom";

let ServicesMap = {
  "LED":{
    val: "LED",
    name:"两个带有VGA/HDMI连接口的84\" LED"
  },
  "DEMONSTRATION":{
    val: "DEMONSTRATION",
    name:"无线演示设备"
  },
  "VIDEO":{
    val: "VIDEO",
    name:"企业级视频会议"
  },
  "MICROPHONE":{
    val: "MICROPHONE",
    name:"企业级桌面话筒"
  },
  "HORN":{
    val: "HORN",
    name:"顶置式喇叭"
  },
  "WIFI":{
    val: "WIFI",
    name:"高速WIFI"
  },
  "STATIONERY":{
    val: "STATIONERY",
    name:"可移动白板代，带马克笔和文具"
  },
  "TEA":{
    val: "TEA",
    name:"免费咖啡/茶水"
  }
};

let CapacityMap = {
  "MINIMUM":{
    value: "MINIMUM",
    name:"1-6人"
  },
  "SECONDARY":{
    value: "SECONDARY",
    name:"6-10人"
  },
  "SPACIOUS":{
    value: "SPACIOUS",
    name:"10人以上"
  }
};

export default function ConferenceRoom() {
  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.name = "会议室";
  this.introduce = "详细说明";
  this.capacity = CapacityMap.MINIMUM.value;
  this.price = null;
  this.services = [];

  this.poster = new Tank("image", false, 1024 * 1024, "请上传1MB以内的图片");
  this.posterUrl = null;

  this.address = "";

  this.contacts = new User();
  this.spaceBuilding = new SpaceBuilding();

  this.spaceRoom = new SpaceRoom();
}

ConferenceRoom.prototype = new BaseEntity();
ConferenceRoom.prototype.constructor = ConferenceRoom;
ConferenceRoom.prototype.CapacityMap = CapacityMap;
ConferenceRoom.prototype.ServicesMap = ServicesMap;

ConferenceRoom.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter("HTTP_SELECTION", "类型", "spaceBuildingId", null, SpaceBuilding),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

ConferenceRoom.prototype.render = function (obj,one2one = false) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
  this.renderEntity("poster", Tank);
  this.renderEntity("contacts", User);
  this.renderEntity("spaceBuilding", SpaceBuilding);
  this.renderEntity("spaceRoom", SpaceRoom);
};

ConferenceRoom.prototype.getForm = function () {
  let services = this.services;
  let servicesInfo = [];
  for (let i = 0; i < services.length; i++) {
    let service = services[i];
    servicesInfo.push(service);
  }
  let form = {
    name: this.name,
    introduce: this.introduce,
    contactsId:this.contacts.id,
    spaceBuildingId: this.spaceBuilding.id,
    capacity: this.capacity,
    price: this.price,
    address: this.address,
    services: JSON.stringify(servicesInfo),
    posterCode: this.poster.code,
    spaceRoomId: this.spaceRoom.id
  };
  if(this.id){
    form.id = this.id;
  }
  return form;
};

ConferenceRoom.prototype.validate = function () {
  if (!this.name) {
    this.errorMessage = "会议室名称必填！";
    return false;
  }
  if (!this.contacts.id) {
    this.errorMessage = "请选择一个联系人！";
    return false;
  }
  if (!this.spaceBuilding.id) {
    this.errorMessage = "请选择所属楼栋！";
    return false;
  }
  if(!this.poster.code){
    this.errorMessage = "会议室照片必须上传！";
    return false;
  }
  if (!this.introduce) {
    this.introduce = "详细说明必填！";
    return false;
  }
  if (!this.address) {
    this.errorMessage = "详细地址必填！";
    return false;
  }
  if (!this.price) {
    this.errorMessage = "每小时价格必填！";
    return false;
  }
  if(!this.capacity){
    this.errorMessage = "可容纳人数必填！";
    return false;
  }
  if(!this.services.length > 0){
    this.errorMessage = "设施及服务必填！";
    return false;
  }
  if(!this.spaceRoom || !this.spaceRoom.id){
    this.errorMessage = "所属房间必填！";
    return false;
  }
  if(this.spaceRoom.type !== "MEETING_ROOM"){
    this.errorMessage = "所属房间必须是会议室！";
    return false;
  }
  return true;
};
