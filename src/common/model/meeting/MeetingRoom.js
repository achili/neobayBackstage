/**
 * Created by Matring on 1/1/17.
 */
import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import User from "../user/User";

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


export default function MeetingRoom() {
	BaseEntity.call(this, arguments);

	this.user = new User();
	this.status = Status.OK;
	this.roomNum = null;
	this.buildingNum = null;
	this.capacity = null;
	this.allowedBeginTime = "08:00";
	this.allowedEndTime = "18:00";
	this.description = null;
	this.tags = null;
	this.name = null;
	this.image = new Tank("image", false);
}

MeetingRoom.prototype = new BaseEntity();
MeetingRoom.prototype.constructor = MeetingRoom;

MeetingRoom.prototype.Status = Status;
MeetingRoom.prototype.StatusMap = StatusMap;
MeetingRoom.prototype.StatusList = MeetingRoom.prototype.getStatusList();

MeetingRoom.prototype.FILTERS = [
	new Filter("SORT", "ID", "orderId"),
	new Filter("SORT", "容纳人数", "orderCapacity"),
	new Filter("SORT", "最早预订时间", "orderAllowedBeginTime"),
	new Filter("INPUT", "标签", "tags"),
	new Filter("INPUT", "楼栋", "buildingNum")
]



MeetingRoom.prototype.parseTime = function (time) {
	let parseTime = time.split(":");
	let result = parseInt(parseTime[0]);
	if (parseInt(parseTime[1]) === 0) {
		return result * 2;
	} else {
		return result * 2 + 1;
	}
}


MeetingRoom.prototype.getForm = function () {
	let form = {
		roomNum: this.roomNum,
		buildingNum: this.buildingNum,
		capacity: this.capacity,
		allowedBeginTime: this.parseTime(this.allowedBeginTime),
		allowedEndTime: this.parseTime(this.allowedEndTime),
		description: this.description,
		imageCode: this.image.code,
		tags: this.tags
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}

MeetingRoom.prototype.validate = function () {
	if (!this.roomNum) {
		this.errorMessage = "房间号必填！";
		return false;
	}

	if (!this.buildingNum) {
		this.errorMessage = "所在楼栋必填！";
		return false;
	}

	if (!this.capacity) {
		this.errorMessage = "可容纳人数必填！";
		return false;
	}

	if (!this.image) {
		this.errorMessage = "会议室图片必填！";
		return false;
	}

	return true;
}


MeetingRoom.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("image", Tank);
}









