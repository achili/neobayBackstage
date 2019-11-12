import BaseEntity from "../../base/BaseEntity";
import Tank from "../../tank/Tank"
import Filter from "../../base/Filter";
import SpaceRoom from "../../space/SpaceRoom";
import {isInteger} from "../../../util/Utils";
import AddedPrint from "./AddedPrint";

let Status = {
  PRINTING:"PRINTING",
  FREE:"FREE"
}
let StatusMap = {
  PRINTING: {
    name: "使用中",
    value: "PRINTING",
    style: "warning",
    icon: "sun-o"
  },
  FREE: {
    name: "空闲中",
    value: "FREE",
    style: "info",
    icon: "close"
  }
}


export default function PrintInformation() {
  BaseEntity.call(this, arguments);
  this.name = null;
  this.printPicture = new Tank("image",false);
  this.printId = null;
  this.address = null;
  this.deviceName = null;
  this.deviceId = null;


  this.status = Status.FREE;
}

PrintInformation.prototype = new BaseEntity();
PrintInformation.prototype.constructor = PrintInformation;
PrintInformation.prototype.Status = Status;
PrintInformation.prototype.StatusMap = StatusMap;
PrintInformation.prototype.StatusList = PrintInformation.prototype.getStatusList();


PrintInformation.prototype.getFilters = function () {
  return [
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT","关键字(打印机名称/地点)", "keyword"),
    new Filter("SELECTION", "状态", "status", this.getStatusList())
  ];
};

PrintInformation.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("printPicture", Tank);

}

PrintInformation.prototype.getForm = function () {
  let form = {
    printPictureFile: this.printPicture.code,
    name: this.name,
    printId:this.printId,
    address:this.address,
    deviceName:this.deviceName,
    deviceId:this.deviceId
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

PrintInformation.prototype.validate = function () {
  if (!this.printId) {
    this.errorMessage = "请选择打印机设备";
    return false;
  }
  if (!this.name) {
    this.errorMessage = "打印机名称必填";
    return false;
  }
  if (!this.printPicture.code) {
    this.errorMessage = "打印机图片必填";
    return false;
  }
  return true;
};


