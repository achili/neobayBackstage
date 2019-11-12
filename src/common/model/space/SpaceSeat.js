import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import Vue from "vue";
import Project from "../project/Project";
import SpaceRegional from "./SpaceRegional";

let Status = {
	//空闲状态
	FREE: "FREE",
	//被占用
	OCCUPIED: "OCCUPIED",
	//禁用
	DISABLE: "DISABLE",
  //释放中
  RELEASE: "RELEASE"
}

let StatusMap = {
	FREE: {
		name: "空闲",
		value: "FREE",
		style: "success"
	},
	OCCUPIED: {
		name: "被占用",
		value: "OCCUPIED",
		style: "info"
	},
	DISABLE: {
		name: "禁用",
		value: "DISABLE",
		style: "danger"
	},
  RELEASE:{
    name: "释放中",
    value: "RELEASE",
    style: "warning"
  }

}


let Type = {
	//西边
	WEST: "WEST",
	//东边
	EAST: "EAST"
}

let TypeMap = {
	WEST: {
		name: "西区",
		value: "WEST",
		style: "success"
	},
	EAST: {
		name: "东区",
		value: "EAST",
		style: "info"
	}

}

export default function SpaceSeat() {

	BaseEntity.call(this, arguments);
	this.no = null;
	this.name = null;

	this.description = null;
	this.address = null;
	this.propertyNo = null;

	this.type = Type.WEST;
	this.status = Status.FREE;

	this.project = new Project();
	this.remark = null;


	if (Vue.store.state.debug) {
		this.mockData();
	}

	//当前是否是被选中的状态 在工位图中有用到。
	this.selected = false;
}


SpaceSeat.prototype = new BaseEntity();
SpaceSeat.prototype.constructor = SpaceSeat;

SpaceSeat.prototype.URL_DISTRIBUTION = "/space/seat/distribution";

SpaceSeat.prototype.Status = Status;
SpaceSeat.prototype.StatusMap = StatusMap;
SpaceSeat.prototype.StatusList = SpaceSeat.prototype.getStatusList();

SpaceSeat.prototype.Type = Type;
SpaceSeat.prototype.TypeMap = TypeMap;
SpaceSeat.prototype.TypeList = SpaceSeat.prototype.getTypeList();


SpaceSeat.prototype.mockData = function () {

	this.name = "101";
	this.no = "NB-SEAT001";
	this.description = "这是一个标准工位101";
	this.address = "上海市闵行区剑川路951号";
	this.propertyNo = "沪房地字闵 2007 第 040372 号";
	this.status = Status.FREE;
}


SpaceSeat.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("SORT", "房间号", "orderSpaceRoom"),
		new Filter("INPUT", "工位名", "name"),
		new Filter("SELECTION", "东西区", "type", this.getTypeList()),
    new Filter(Filter.prototype.Type.SELECTION, "状态", "status", this.getStatusList(), null, null, false),
    new Filter(Filter.prototype.Type.MULTI_SELECTION, "状态", "statuses", this.getStatusList()),
    new Filter("CHECK", "已分配项目", "isPredistribution"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};


SpaceSeat.prototype.Status = Status;

//We use this method to get the full js Object
SpaceSeat.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("project",Project);

}

//尝试将自己用最简单的方式呈现，不然在列表处太慢了。
SpaceSeat.prototype.simpleRender = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("project",Project);
}


SpaceSeat.prototype.getForm = function () {

	let form = {
		name: this.name,
		no: this.no,
		description: this.description,
		address: this.address,
		propertyNo: this.propertyNo,
		type: this.type,
    project: this.project.id,
    remark: this.remark
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


SpaceSeat.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}
	if (!this.no) {
		this.errorMessage = "工位号必填！";
		return false;
	}
	if (!this.address) {
		this.errorMessage = "地址必填！";
		return false;
	}
	if (!this.propertyNo) {
		this.errorMessage = "产权证编号必填！";
		return false;
	}

	return true;
}
SpaceSeat.prototype.httpDistribution = function (params,successCallback,failureCallback) {
  let that = this;
  this.httpPost(this.URL_DISTRIBUTION,params,function (response) {
    successCallback && successCallback(response);
  },failureCallback);
}










