import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import Tank from "../tank/Tank";
import {Notification, MessageBox} from 'element-ui';
import User from "../user/User";

let Status = {
	NEW: "NEW",
	REVIEWING: "REVIEWING",
	PASS: "PASS",
	REJECT: "REJECT"
}
let StatusMap = {
	NEW: {
		name: "新建",
		value: "NEW",
		style: "success"
	},
	REVIEWING: {
		name: "正在审核中",
		value: "REVIEWING",
		style: "info"
	},
	PASS: {
		name: "审核通过",
		value: "PASS",
		style: "success"
	},
	REJECT: {
		name: "申请驳回",
		value: "REJECT",
		style: "danger"
	}
}

export default function ParkingApply() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.user = new User();
	this.name = null;
	this.phone = null;
	this.email = null;
	this.reason = null;
	this.status = Status.OK;

	//Tank Objects
	this.idCardFront = new Tank("image", false);
	this.idCardBack = new Tank("image", false);
	this.drivingLicenceFront = new Tank("image", false);
	this.drivingLicenceBack = new Tank("image", false);
	this.driverLicenceFront = new Tank("image", false);
	this.driverLicenceBack = new Tank("image", false);

}

//extend BaseEntity
ParkingApply.prototype = new BaseEntity();
ParkingApply.prototype.constructor = ParkingApply;

ParkingApply.prototype.URL_STATUS = "/parking/apply/status";


ParkingApply.prototype.Status = Status;
ParkingApply.prototype.StatusMap = StatusMap;
ParkingApply.prototype.StatusList = ParkingApply.prototype.getStatusList();

ParkingApply.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("INPUT", "名称", "name"),
		new Filter("SELECTION", "申请状态", "status", this.getStatusList())
	];
};

ParkingApply.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("idCardFront", Tank);
	this.renderEntity("idCardBack", Tank);
	this.renderEntity("drivingLicenceFront", Tank);
	this.renderEntity("drivingLicenceBack", Tank);
	this.renderEntity("driverLicenceFront", Tank);
	this.renderEntity("driverLicenceBack", Tank);

}

ParkingApply.prototype.getForm = function () {
	let form = {
		name: this.name,
		phone: this.phone,
		email: this.email,
		idCardFrontCode: this.idCardFront.code,
		idCardBackCode: this.idCardBack.code,
		drivingLicenceFrontCode: this.drivingLicenceFront.code,
		drivingLicenceBackCode: this.drivingLicenceBack.code,
		driverLicenceFrontCode: this.driverLicenceFront.code,
		driverLicenceBackCode: this.driverLicenceBack.code
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;
}

ParkingApply.prototype.validate = function () {
	if (!this.name) {
		this.errorMessage = "申请人姓名必填!";
		return false;
	}

	if (!this.phone) {
		this.errorMessage = "电话号码必填!";
		return false;
	}

	if (!this.email) {
		this.errorMessage = "邮箱必填!";
		return false;
	}

	return true;
}

//状态过滤
ParkingApply.prototype.statusFilter = function (oldStatus, newStatus) {
	let result = false;
	if (oldStatus === Status.NEW) {
		if (newStatus === Status.REVIEWING) {
			result = true;
		}
	} else if (oldStatus === Status.REVIEWING) {
		if (newStatus !== Status.REVIEWING) {
			result = true;
		}
	} else if (oldStatus === Status.PASS) {
		if (newStatus === Status.REJECT) {
			result = true;
		}
	} else if (oldStatus === Status.REJECT) {
		if (newStatus === Status.PASS) {
			result = true;
		}
	}
	return result;

}

//审核
ParkingApply.prototype.httpReviewing = function (successCallback) {
	let that = this;
	this.httpDetail(function (response) {
		if (that.status === Status.NEW) {
			that.requestChange("REVIEWING", successCallback);
		} else {
			successCallback && successCallback(response);
		}
	});
}

//更改状态
ParkingApply.prototype.requestChange = function (state, successCallback) {
	let that = this;
	let params = {
		id: this.id,
		status: state
	}
	if (state === Status.REJECT) {
		MessageBox.prompt('请输入拒绝的理由', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			inputPattern: /\S/,
			inputErrorMessage: '理由不能为空'
		}).then(({value}) => {
			params.reason = value;
			that.httpStatus(params, function (response) {
				successCallback && successCallback(response);
			});
		}).catch(() => {
			return;
		});
	} else {
		this.httpStatus(params, function (response) {
			successCallback && successCallback(response);
		});
	}
}
//操作响应
ParkingApply.prototype.requestChangeClicker = function (state) {
	this.requestChange(state, function () {
		Notification.success({
			message: '操作成功!'
		});
	})
}

ParkingApply.prototype.isRefuse = function () {
	return this.status === Status.REJECT;
}

ParkingApply.prototype.httpStatus = function (params, successCallback) {
	let that = this;
	this.httpPost(this.URL_STATUS, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	});
}
