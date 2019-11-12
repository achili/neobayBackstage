import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import Vue from "vue";
import SpaceRoom from "./SpaceRoom";
import SpaceRegional from "./SpaceRegional";

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

export default function SpaceBuilding() {

	BaseEntity.call(this, arguments);

	this.no = null;
	this.name = null;
	this.description = null;
	this.capacity = null;
	this.roomNum = null;
	this.floorNum = null;
	this.address = null;
	this.propertyNo = null;
	this.status = Status.OK;


	//一对多字段
	this.spaceRooms = [];

	if (Vue.store.state.debug) {
		this.mockData();
	}
}


SpaceBuilding.prototype = new BaseEntity();
SpaceBuilding.prototype.constructor = SpaceBuilding;


SpaceBuilding.prototype.Status = Status;
SpaceBuilding.prototype.StatusMap = StatusMap;
SpaceBuilding.prototype.StatusList = SpaceBuilding.prototype.getStatusList();

SpaceBuilding.prototype.mockData = function () {
	this.name = "零号湾1号大楼";
	this.no = "NB001";
	this.description = "零号湾入驻有专业的孵化机构，整合多方资源，为各创业团队提供苗圃阶段的全方位孵化服务。";
	this.capacity = 200;
	this.roomNum = 180;
	this.floorNum = 10;
	this.address = "上海市闵行区剑川路951号2号楼";
	this.propertyNo = "沪房地字闵 2007 第 040372 号";
	this.status = Status.OK;
	this.spaceRooms = [];
}


SpaceBuilding.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("SORT", "容量", "orderCapacity"),
		new Filter("SORT", "房间数", "orderRoomNum"),
		new Filter("SORT", "楼层数", "orderFloorNum"),
		new Filter("INPUT", "楼栋名", "name"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};


//We use this method to get the full js Object
SpaceBuilding.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderList("spaceRooms", SpaceRoom);
}

SpaceBuilding.prototype.getForm = function () {

	let form = {
    spaceRegional: this.spaceRegional.id,
		name: this.name,
		no: this.no,
		capacity: this.capacity,
		floorNum: this.floorNum,
		address: this.address,
		propertyNo: this.propertyNo,
		roomNum: this.roomNum,
		description: this.description
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


SpaceBuilding.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }
	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}
	if (!this.no) {
		this.errorMessage = "楼号必填！";
		return false;
	}
	if (!this.floorNum) {
		this.errorMessage = "楼层数必填！";
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


	if (!this.capacity) {
		this.errorMessage = "容量必填！";
		return false;
	}
	if (!this.roomNum) {
		this.errorMessage = "房间数必填！";
		return false;
	}

	return true;
}





