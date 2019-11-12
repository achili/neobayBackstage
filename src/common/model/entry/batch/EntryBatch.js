import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import {simpleDateTime, str2Date} from "../../../filter/time";
import Vue from "vue";
import SpaceRegional from "../../space/SpaceRegional";

let Status = {
	PROCESSING: "PROCESSING",
	FINISH: "FINISH"
}

let StatusMap = {
	PROCESSING: {
		name: "正在进行中",
		value: "PROCESSING",
		style: "info"
	},
	FINISH: {
		name: "已完成",
		value: "FINISH",
		style: "success"
	}
}

export default function EntryBatch() {

	BaseEntity.call(this, arguments);

	this.name = null;
	this.no = null;
	this.description = null;
	this.startTime = new Date();
	this.endTime = new Date();
	this.status = Status.PROCESSING;

	this.batchEntryApplies = [];

	if (Vue.store.state.debug) {
		this.mockData();
	}
}


EntryBatch.prototype = new BaseEntity();
EntryBatch.prototype.constructor = EntryBatch;
EntryBatch.prototype.Status = Status;
EntryBatch.prototype.StatusMap = StatusMap;
EntryBatch.prototype.StatusList = EntryBatch.prototype.getStatusList();


EntryBatch.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("SORT", "开始时间", "orderStartTime"),
		new Filter("SORT", "结束时间", "orderEndTime"),
		new Filter("SELECTION", "状态", "status", this.getStatusList()),
		new Filter("INPUT", "批次名称", "name"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

EntryBatch.prototype.mockData = function () {
	this.name = "2017年第一批";
	this.startTime = new Date();
	let endTime = new Date();
	endTime.setTime(endTime.getTime() + 60 * 60 * 24 * 14);
	this.endTime = endTime;
	this.description = "2017年第一批";

}
//We use this method to get the full js Object
EntryBatch.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("startTime", Date);
	this.renderEntity("endTime", Date);

}

EntryBatch.prototype.getForm = function () {

	let form = {
    spaceRegional:this.spaceRegional.id,
		name: this.name,
		description: this.description,
		startTime: simpleDateTime(this.startTime),
		endTime: simpleDateTime(this.endTime),
		status: this.status
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;

}


EntryBatch.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }
	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}
	if (!this.endTime) {
		this.errorMessage = "批次日期范围必填！";
		return false;
	}
	if (!this.startTime) {
		this.errorMessage = "批次日期范围必填！";
		return false;
	}
	return true;
}

