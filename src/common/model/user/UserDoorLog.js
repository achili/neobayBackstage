import BaseEntity from "../../model/base/BaseEntity";
import Filter from "../../model/base/Filter";
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

export default function UserDoorLog() {

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

UserDoorLog.prototype = new BaseEntity();
UserDoorLog.prototype.constructor = UserDoorLog;

UserDoorLog.prototype.Status = Status;
UserDoorLog.prototype.StatusMap = StatusMap;

UserDoorLog.prototype.URL_PAGE = "/user/door/log/page";

UserDoorLog.prototype.getFilters = function () {  //搜索功能得实现
  return [
    new Filter(Filter.prototype.Type.INPUT, '用户', 'userId',null, null, false),
    new Filter("INPUT", "关键字(门名称)", "keyword")
  ];
};
