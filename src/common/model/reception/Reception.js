import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Vue from 'vue'
import User from '../user/User'
import { simpleDateTime } from '../../filter/time'
import Tank from '../tank/Tank'
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  OK: "OK"
}

let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "success",
    icon: "hourglass"
  }
}

let Type = {
  //活动
  ACTIVITY: "ACTIVITY",
  //接待
  RECEPTION: "RECEPTION"
}

let TypeMap = {
  ACTIVITY: {
    name: "活动",
    value: "ACTIVITY",
    style: "success"
  },
  RECEPTION: {
    name: "接待",
    value: "RECEPTION",
    style: "info"
  }
}
let Ors = {
  //国际
  INTERNATIONAL:"INTERNATIONAL",
  //国内
  DOMESTIC:"DOMESTIC"
}
let OrsTypeMap = {
  INTERNATIONAL:{
    name: "国际",
    value: "INTERNATIONAL",
    style: "success"
  },
  DOMESTIC:{
    name: "国内",
    value: "DOMESTIC",
    style: "success"
  }
}

export default function Reception() {

  BaseEntity.call(this, arguments);

  this.creator = new User();
  this.ors = Ors.DOMESTIC;
  this.type = Type.ACTIVITY;
  this.name = null;
  //来访单位名称(仅接待有)
  this.visitingUnit = null;
  this.startTime = new Date();
  this.endTime = new Date();
  //活动地点(只有活动才有)
  this.locale = null;
  //通知人员（user_id数组）
  this.personnels = [];
  //参与人员(仅活动有)
  this.participants = null;
  //来源(仅接待有)
  this.source = null;
  //附件s(仅活动有)
  this.attachments = [];

  this.detailsHtml = null;

  //状态
  this.status = Status.OK;

  if (Vue.store.state.debug) {
    this.mockData();
  }
}

Reception.prototype = new BaseEntity();
Reception.prototype.constructor = Reception;

Reception.prototype.Status = Status;
Reception.prototype.StatusMap = StatusMap;
Reception.prototype.StatusList = Reception.prototype.getStatusList();
Reception.prototype.Type = Type;
Reception.prototype.TypeMap = TypeMap;
Reception.prototype.TypeList = Reception.prototype.getTypeList();

Reception.prototype.Ors = Ors;
Reception.prototype.OrsTypeMap = OrsTypeMap;
Reception.prototype.OrsTypeList = Reception.prototype.getOrsTypeList();

Reception.prototype.mockData = function () {
  this.ors = Ors.DOMESTIC;
  this.type = Type.ACTIVITY;
  this.name = "王者荣耀比晒";
  this.startTime = new Date();
  this.endTime = new Date('2020.7.1');
  //活动地点(只有活动才有)
  this.locale = "上海市闵行区剑川路951号一号楼A-8";
  //通知人员（user_id数组）
  this.personnels = [];
  //参与人员(仅活动有)
  this.participants = "张三 李四 王五";
  this.detailsHtml = "<p>SSFSF</p>";
}

Reception.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "名称", "orderName"),
    new Filter('SORT', '开始时间', 'orderStartTime'),
    new Filter('SORT', '结束时间', 'endTimeTime'),
    new Filter('SELECTION', '类型', 'type', this.getTypeList()),
    new Filter('SELECTION','来源','ors',this.getOrsTypeList()),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object
Reception.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);

  this.renderEntity("creator", User);
  this.renderEntity("startTime", Date);
  this.renderEntity("endTime", Date);

  this.renderList('personnels', User);
  this.renderList('attachments', Tank);

}

Reception.prototype.getForm = function () {

  let attachmentsInfo = [];
  if (this.attachments && this.attachments.length) {
    for (let i = 0; i < this.attachments.length; i++) {
      let tank = this.attachments[i];
      if (tank.exist()) {
        attachmentsInfo.push(tank.code);
      }
    }
  }
  let personnelIds = [];
  if (this.personnels && this.personnels.length) {
    for (let i = 0; i < this.personnels.length; i++) {
      let user = this.personnels[i];
      personnelIds.push(user.id);
    }
  }
  let form = {
    spaceRegional:this.spaceRegional.id,
    type: this.type,
    ors:this.ors,
    name: this.name,
    visitingUnit: this.visitingUnit,
    startTime: simpleDateTime(this.startTime),
    endTime: simpleDateTime(this.endTime),
    locale: this.locale,
    personnelIds: JSON.stringify(personnelIds),
    participants: this.participants,
    source: this.source,
    attachmentsInfo: JSON.stringify(attachmentsInfo),
    detailsHtml: this.detailsHtml
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
}

Reception.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必填";
    return false;
  }
  if (!this.type) {
    this.errorMessage = "类型必填";
    return false;
  }
  if (!this.ors) {
    this.errorMessage = "国际类型必填";
    return false;
  }
  if (!this.name) {
    this.errorMessage = "名称必填";
    return false;
  }
  if (!this.startTime) {
    this.errorMessage = "开始时间必填";
    return false;
  }
  if (!this.endTime) {
    this.errorMessage = "结束时间必填";
    return false;
  }
  if (this.type === Type.ACTIVITY) {
    if (!this.locale) {
      this.errorMessage = "活动地点必填";
      return false;
    }
  } else {
    if (!this.visitingUnit) {
      this.errorMessage = "来访单位必填";
      return false;
    }
  }
  this.errorMessage = null;
  return true;
}


Reception.prototype.canEdit = function (financePayInfo) {
  return true;
}
Reception.prototype.canDel = function (financePayInfo) {
  return true;
}
