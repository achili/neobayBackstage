import BaseEntity from "../base/BaseEntity";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import User from "../user/User";
import OfficialPolicyArea from "./OfficialPolicyArea";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
	OK: "OK",
  ERROR: "ERROR"
};
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
};

// let Type = {
//   Introduce_Project: "Introduce_Project",
//   Find_Expert: "Find_Expert",
//   Intellectual_Property: "Intellectual_Property",
//   Policy_Subsidy: "Policy_Subsidy",
//   Honour_Endorsement: "Honour_Endorsement",
//   Innovation_Planning: "Innovation_Planning"
// }
//
// let TypeMap = {
//   Introduce_Project: {
//     name: "引进项目",
//     value: "Introduce_Project",
//     style: ""
//   },
//   Find_Expert: {
//     name: "找技术专家",
//     value: "Find_Expert",
//     style: ""
//   },
//   Intellectual_Property: {
//     name: "申报知识产权",
//     value: "Intellectual_Property",
//     style: ""
//   },
//   Policy_Subsidy: {
//     name: "拿政策补贴",
//     value: "Policy_Subsidy",
//     style: ""
//   },
//   Honour_Endorsement: {
//     name: "获荣誉背书",
//     value: "Honour_Endorsement",
//     style: ""
//   },
//   Innovation_Planning: {
//     name: "技术创新规划",
//     value: "Innovation_Planning",
//     style: ""
//   }
// }

export default function OfficialPolicy() {
	BaseEntity.call(this, arguments);

	this.user = new User();

	this.title = null;
	// this.type = Type.Innovation_Planning;
	this.tags = [];
	this.area = new OfficialPolicyArea();

  this.releaseTime = new Date();
	this.author = null;
	this.digest = null;
	this.content = null;
	this.status = Status.OK;

}

//extend BaseEntity
OfficialPolicy.prototype = new BaseEntity();
OfficialPolicy.prototype.constructor = OfficialPolicy;



OfficialPolicy.prototype.Status = Status;
OfficialPolicy.prototype.StatusMap = StatusMap;
OfficialPolicy.prototype.StatusList = OfficialPolicy.prototype.getStatusList();

// OfficialPolicy.prototype.Type = Type;
// OfficialPolicy.prototype.TypeMap = TypeMap;
// OfficialPolicy.prototype.TypeList = OfficialPolicy.prototype.getTypeList();

OfficialPolicy.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "发布时间", "orderReleaseTime"),
		new Filter("INPUT", "标题", "title"),
    new Filter("INPUT", "标签", "tag"),
    new Filter("INPUT", "地区", "area"),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("INPUT", "标题", "title"),
    new Filter("INPUT", "摘要", "digest"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)
    // new Filter("SELECTION", "类型", "type", this.TypeList)
	];
};

OfficialPolicy.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("releaseTime", Date);
	this.renderEntity("area", OfficialPolicyArea);


};


OfficialPolicy.prototype.getForm = function () {

  let form = {
    spaceRegional:this.spaceRegional.id,
    title: this.title,
    tags: JSON.stringify(this.tags),
    areaId: this.area.id,
    // type: this.type,
    author: this.author,
    digest: this.digest,
    content: this.content,
    releaseTime: simpleDateTime(this.releaseTime)
  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

};


OfficialPolicy.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }

  if (!this.title) {
    this.errorMessage = "标题必填！";
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

  if (!this.digest) {
    this.errorMessage = "摘要必填!";
    return false;
  }
  if (!this.content) {
    this.errorMessage = "内容必填！";
    return false;
  }
  // if(!this.type) {
  //   this.errorMessage = "类型必选! ";
  //   return false;
  // }
  if (!this.area.id) {
    this.errorMessage = "地区必填！";
    return false;
  }

  return true;
}
