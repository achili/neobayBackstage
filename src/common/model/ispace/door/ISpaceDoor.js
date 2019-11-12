import Base from "../../base/Base";
import SpaceRoom from "../../space/SpaceRoom";
import ConferenceRoom from "../../conference/ConferenceRoom";
import User from "../../user/User";
import Filter from "../../base/Filter";

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

export default function ISpaceDoor() {

  Base.call(this, arguments);
  this.companyId = null;
  this.doorAddress = null;
  this.doorName = null;
  this.deviceList = [];
  this.doorId = null;
  this.status = Status.OK;

  this.spaceRoom = new SpaceRoom();
  this.conferenceRoom = new ConferenceRoom();

  this.users = [];
  this.consumer = [];
}

ISpaceDoor.prototype = new Base();
ISpaceDoor.prototype.constructor = ISpaceDoor;
ISpaceDoor.prototype.Status = Status;
ISpaceDoor.prototype.StatusMap = StatusMap;
ISpaceDoor.prototype.StatusList = ISpaceDoor.prototype.getStatusList();


ISpaceDoor.prototype.URL_DETAIL = "/i/space/door/detail/{doorId}";
ISpaceDoor.prototype.URL_PAGE = "/i/space/door/page"
ISpaceDoor.prototype.URL_MANAGEROPENDOORUSERS = "/space/room/manager/open/door/users";
ISpaceDoor.prototype.URL_CONSUMEROPENDOORUSERS = "/space/room/consumer/open/door/users";

ISpaceDoor.prototype.getFilters = function () {  //搜索功能得实现
  return [
    new Filter("INPUT", "关键字(门名称)", "keyword")
  ];
};
ISpaceDoor.prototype.render = function (obj) {
  Base.prototype.render.call(this, obj);
  this.renderEntity("spaceRoom", SpaceRoom);
  this.renderEntity("conferenceRoom", ConferenceRoom);
  this.renderList("users", User);
  this.renderList("consumer", User);
  if(!(this.deviceList instanceof Array)) {
    this.deviceList = JSON.parse(this.deviceList);
  }

};

ISpaceDoor.prototype.httpDetail = function (successCallback, errorCallback) {
  let that = this;
  if (!this.doorId) {
    this.errorMessage = "没有doorId！";
    this.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  let url = this.URL_DETAIL.replace("{doorId}", this.doorId);
  if (!url) {
    this.errorMessage = "没有url！";
    this.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  this.detailLoading = true;
  this.httpGet(url, {}, function (response) {
    that.detailLoading = false;
    that.editMode = true;
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, function (response) {
    that.detailLoading = false;
    if (typeof errorCallback === "function") {
      errorCallback();
    } else {
      //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
      that.defaultErrorHandler(response);
    }
  });
};

//开门权限用户管理员组
ISpaceDoor.prototype.httpManagerOpenDoorUsers = function (successCallback,failureCallback) {
  let that = this;
  this.detailLoading = true;
  this.httpGet(this.URL_MANAGEROPENDOORUSERS, {}, function (response) {
    that.detailLoading = false;
    that.editMode = true;
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  });
};
//开门权限用户用户组
ISpaceDoor.prototype.httpConsumerOpenDoorUsers = function (roomId, successCallback,failureCallback) {
  let that = this;
  this.detailLoading = true;
  let params = {
    roomId: this.roomId
  };
  this.httpGet(this.URL_CONSUMEROPENDOORUSERS, params, function (response) {
    that.detailLoading = false;
    that.editMode = true;
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  });
};
