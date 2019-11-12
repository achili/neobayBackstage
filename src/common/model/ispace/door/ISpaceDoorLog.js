import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import User from "../../user/User";

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

export default function ISpaceDoorLog() {

  BaseEntity.call(this, arguments);
  this.doorId = null;
  this.doorName = null;
  this.employeeName = null;
  this.recordTime = null;
  this.recordType = null;
  this.resDoorUserData = null;
  this.nickname = null;
  this.gender = null;
  this.phone = null;
  this.email = null;
  this.login = null;
}

ISpaceDoorLog.prototype = new BaseEntity();
ISpaceDoorLog.prototype.constructor = ISpaceDoorLog;

ISpaceDoorLog.prototype.Status = Status;
ISpaceDoorLog.prototype.StatusMap = StatusMap;

ISpaceDoorLog.prototype.URL_PAGE = "/i/space/door/log/page";
/*ISpaceDoorLog.prototype.URL_FIND_DOOR_USER = "/ispace/door/findDoorUser";*/

ISpaceDoorLog.prototype.getFilters = function () {  //搜索功能得实现
  return [
    new Filter("INPUT", "门ID", "doorId"),
    /*new Filter("INPUT", "按时间查询", "doorId"),*/
    /*new Filter("SORT", "ID排序", "orderId"),*/
      new Filter(Filter.prototype.Type.HTTP_SELECTION, '用户', 'userId',null, User),
    new Filter("INPUT", "关键字(门名称)", "keyword")
  ];
};


/*ISpaceDoorLog.prototype.httpFindDoorUser = function (successCallback, errorCallback) {
  let that = this;
  this.httpPost(this.URL_FIND_DOOR_USER, {}, function (response) {
    console.log("查找门径的用户列表，看看是什么鬼");
    console.log(response);
    that.resDoorUserData =  response.body;
    successCallback && successCallback();
  }, errorCallback);
};*/
