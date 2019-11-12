import BaseEntity from "../base/BaseEntity";
import SpaceBuilding from "../space/SpaceBuilding";
import Filter from "../base/Filter";
import Vue from "vue";
import {twoDigital} from "../../filter/number";
import Project from "../project/Project";
import FinanceBillReceipt from '../finance/FinanceBillReceipt'
import Pager from "../base/Pager";
import {isInteger} from "../../util/Utils";
import SpaceRegional from "./SpaceRegional";
import {simpleDateTime} from "../../filter/time";


let Status = {
	//空闲状态
	FREE: "FREE",
	//被占用
	OCCUPIED: "OCCUPIED",
	//禁用
	DISABLE: "DISABLE",
  //即将到期
  SOON: "SOON"
};

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
  SOON:{
    name: "即将到期",
    value: "SOON",
    style: "warning"
  }

};


let Type = {
	MEETING_ROOM: "MEETING_ROOM",
	OFFICE: "OFFICE",
  GATE: "GATE",
  OURSELVES_ROOM: "OURSELVES_ROOM"
};

let TypeMap = {
	MEETING_ROOM: {
		name: "会议室",
		value: "MEETING_ROOM",
		style: "info"
	},
	OFFICE: {
		name: "办公室",
		value: "OFFICE",
		style: "success"
	},
  GATE: {
		name: "闸机",
		value: "GATE",
		style: "danger"
	},
  OURSELVES_ROOM: {
		name: "自用房",
		value: "OURSELVES_ROOM",
		style: "warning"
	}
};


export default function SpaceRoom() {

	BaseEntity.call(this, arguments);
	this.no = null;
	this.name = null;
	this.description = null;
	this.area = null;
	this.address = null;
	this.propertyNo = null;
	this.type = Type.OFFICE;
	this.status = Status.OK;
	this.spaceBuilding = new SpaceBuilding();
  this.project = new Project();
  this.remark = null;
  this.doors = [];
  this.doorName = null;

  //门常开设置
  this.password = null;
  this.msg = null;
  this.flags = false; //0.开 1.关
  this.startTime = new Date();
  this.endTime = new Date();
  this.weeks = [];
  //开门权限用户
  this.users = [];
  //门密码修改
  this.pwd1 = null;
  this.pwd2 = null;
  this.manager = null;

  //可视化部分
  this.dom = '';
  this.uuid = 0;
  this.dragBarClass = "drag1";
  this.canvasLeft = 350;
  this.canvasTop = 46;
  this.canvasWidth = 200;
  this.canvasHeight = 142;
  this.dirctDom = false;
  this.number = 0;
  this.canvasFloor = Math.ceil(this.top / 345);
	if (Vue.store.state.debug) {
		this.mockData();
	}
}

SpaceRoom.prototype = new BaseEntity();
SpaceRoom.prototype.constructor = SpaceRoom;

SpaceRoom.prototype.URL_DISTRIBUTION = "/space/room/distribution";
SpaceRoom.prototype.URL_VISUAL_PAGE = "/space/room/visual/page";
SpaceRoom.prototype.URL_DOORCHECKMETHOD = "/space/room/door/check/method";
SpaceRoom.prototype.URL_OPENDOORSWITCH = "/space/room/open/door/switch";
SpaceRoom.prototype.URL_OPENDOORSWITCHQUERY = "/space/room/open/door/switch/query";
SpaceRoom.prototype.URL_RESETPASSWORD = "/space/room/reset/password";
SpaceRoom.prototype.URL_RESETPASSWORDQUERY = "/space/room/reset/password/query";
//
SpaceRoom.prototype.URL_IGNORE_NOTIFICATION = "/device/notifi/ignore";
SpaceRoom.prototype.URL_LOADER_DATA = "/device/notifi/loader/data";

SpaceRoom.prototype.Status = Status;
SpaceRoom.prototype.StatusMap = StatusMap;
SpaceRoom.prototype.StatusList = SpaceRoom.prototype.getStatusList();


SpaceRoom.prototype.Type = Type;
SpaceRoom.prototype.TypeMap = TypeMap;
SpaceRoom.prototype.TypeList = SpaceRoom.prototype.getTypeList();

SpaceRoom.prototype.mockData = function () {
	this.name = "标准办公室";
	this.no = "200";
	this.description = "这是一间普通的办公室";
	this.area = 100;

	this.propertyNo = "沪房地字闵 2007 第 040372 号";

	this.status = Status.OK;
	this.type = Type.OFFICE;

};


SpaceRoom.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("SORT", "容量", "orderCapacity"),
		new Filter("SORT", "所在大楼", "orderSpaceBuilding"),
		new Filter("SORT", "工位数", "orderSeatNum"),
		new Filter("INPUT", "房间名", "name"),
		new Filter("HTTP_SELECTION", "大楼", "spaceBuildingId", null, SpaceBuilding),
    new Filter(Filter.prototype.Type.SELECTION, "房间类型", "type", this.getTypeList(), null, null, false),
    new Filter(Filter.prototype.Type.MULTI_SELECTION, "房间类型", "types", this.getTypeList()),
    new Filter(Filter.prototype.Type.SELECTION, "状态", "status", this.getStatusList(), null, null, false),
    new Filter(Filter.prototype.Type.MULTI_SELECTION, "状态", "statuses", this.getStatusList()),
    new Filter("CHECK", "已分配项目", "isPredistribution"),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};



//We use this method to get the full js Object
SpaceRoom.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

	this.renderEntity("spaceBuilding", SpaceBuilding);
  this.renderEntity("project",Project);
	//小数的转换。
  this.area = twoDigital(this.area);

};

SpaceRoom.prototype.getForm = function () {

  let doorIds = [];
  if(this.doors && this.doors instanceof Array) {
    this.doors.forEach(door => {
      doorIds.push(door.doorId);
    })
  }
	let form = {
		name: this.name,
		no: this.no,
		area: this.area,
		address: this.address,
		propertyNo: this.propertyNo,
		spaceBuildingId: this.spaceBuilding.id,
		description: this.description,
		type: this.type,
    remark: this.remark,
    doorIds: JSON.stringify(doorIds),
    doorName: this.doorName,
    canvasTop:this.canvasTop,
    canvasLeft:this.canvasLeft,
    canvasFloor: Math.ceil(this.canvasTop / 345),
    canvasWidth:this.canvasWidth,
    weeks:this.weeks
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
};

SpaceRoom.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}

	if (!this.no) {
		this.errorMessage = "房号必填！";
		return false;
	}

	if (!this.area) {
		this.errorMessage = "房间面积必填！";
		return false;
	}

	if (!this.propertyNo) {
		this.errorMessage = "产权证编号必填！";
		return false;
	}

	if (!this.type) {
		this.errorMessage = "房间类型必填！";
		return false;
	}
	if (!this.spaceBuilding.id) {
		this.errorMessage = "请选择所属大楼！";
		return false;
	}
	return true;
};
//修改密码
SpaceRoom.prototype.validateResetPassword = function () {
  if (!this.pwd1 || !this.pwd2 || !this.manager) {
    this.errorMessage = "密码都必填！";
    return false;
  }
  let rePwd = new RegExp(/^\d{6}$/);       // ^表示开始  $表示结束
  if (!rePwd.test(this.pwd1) || !rePwd.test(this.pwd2) || !rePwd.test(this.manager)){
    this.errorMessage = "密码都只能是（0-9）长度为 6 位";
    return false;
  }
  if(this.pwd1 === this.pwd2 || this.pwd1 === this.manager || this.pwd2 === this.manager){
    this.errorMessage = "三个密码必须各不相同";
    return false;
  }
  return true;
}

// //忽略门的超时报警通知
// SpaceRoom.prototype.httpDoorIgnoreNotification = function (params,successCallback,failureCallback) {
//
//   let that = this;
//   this.httpPost(this.URL_IGNORE_NOTIFICATION, this.getForm(), function (response) {
//
//     that.render(response.data[that.getTAG()]);
//
//     successCallback && successCallback(response);
//   }, failureCallback);
// };
//页面加载获取门的信息
SpaceRoom.prototype.httpDoorLoaderData = function(successCallback,failureCallback) {

  let that = this;
  this.httpPost(this.URL_LOADER_DATA, this.getForm(), function (response) {

    // that.render(response.data[that.getTAG()]);

    successCallback && successCallback(response);
  }, failureCallback);
};




SpaceRoom.prototype.httpDistribution = function (params,successCallback,failureCallback) {
    let that = this;
    this.httpPost(this.URL_DISTRIBUTION,params,function (response) {
      successCallback && successCallback(response);
    },failureCallback);
};

SpaceRoom.prototype.httpGetVisualPage = function (pager, successCallback, errorCallback) {
  if (!isInteger(pager.page)) {
    pager.page = 0;
  }
  if (!isInteger(pager.pageSize)) {
    pager.pageSize = 200;
  }
  let params = {
    page: pager.page,
    pageSize: pager.pageSize
  };
  for (let i = 0; i < pager.FILTERS.length; i++) {
    let filter = pager.FILTERS[i];
    if (filter.getParam() !== null) {
      params[filter.key] = filter.getParam();
    }
  }
  pager.httpCustomPage(this.URL_VISUAL_PAGE, params, function () {
    successCallback(pager);
  }, errorCallback);
};

//门常开和门密码的用户验证
SpaceRoom.prototype.httpDoorCheckMethod = function(successCallback,failureCallback){
  let that = this;
  let params = {
    password: this.password
  };
  this.httpPost(this.URL_DOORCHECKMETHOD,params,function (response) {
    successCallback && successCallback(response);
  },failureCallback);
}
//门常开设置
SpaceRoom.prototype.httpOpenDoorSwitch = function (successCallback,failureCallback) {
  let that = this;
  let params = {
    id: this.id,
    flags: this.flags,
    startTime: simpleDateTime(this.startTime),
    endTime: simpleDateTime(this.endTime),
    weeks: this.weeks.toString()
  };
  this.httpPost(this.URL_OPENDOORSWITCH,params,function (response) {
    successCallback && successCallback(response);
  },failureCallback);
};
//门常开设置查询
SpaceRoom.prototype.httpOpenDoorSwitchQuery = function (successCallback,failureCallback) {
  let that = this;
  let params = {
    id: this.id
  };
  this.httpPost(this.URL_OPENDOORSWITCHQUERY,params,function (response) {
    successCallback && successCallback(response);
  },failureCallback);
};
//门密码修改
SpaceRoom.prototype.httpResetPassword = function (successCallback,errorCallback) {
  let that = this;
  if (!this.validateResetPassword()) {
    that.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  let params = {
    id: this.id,
    pwd1: this.pwd1,
    pwd2: this.pwd2,
    manager: this.manager
  };
  this.httpPost(this.URL_RESETPASSWORD,params,function (response) {
    successCallback && successCallback(response);
  },errorCallback);
};
//门密码查询
//门常开设置查询
SpaceRoom.prototype.httpResetPasswordQuery = function (successCallback,failureCallback) {
  let that = this;
  let params = {
    id: this.id
  };
  this.httpPost(this.URL_RESETPASSWORDQUERY,params,function (response) {
    successCallback && successCallback(response);
  },failureCallback);
};

