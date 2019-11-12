import BaseEntity from "../../model/base/BaseEntity";
import Filter from "../../model/base/Filter";

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

export default function SpaceDoorLog() {

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

SpaceDoorLog.prototype = new BaseEntity();
SpaceDoorLog.prototype.constructor = SpaceDoorLog;

SpaceDoorLog.prototype.Status = Status;
SpaceDoorLog.prototype.StatusMap = StatusMap;

SpaceDoorLog.prototype.URL_PAGE = "/space/room/door/log/page";

SpaceDoorLog.prototype.getFilters = function () {  //搜索功能得实现
  return [
    new Filter(Filter.prototype.Type.INPUT, '房间id', 'id',null, null, false),
    new Filter("INPUT", "关键字(门名称)", "keyword")
  ];
};

/*SpaceDoorLog.prototype.getTAGS = function () {  //pager的数据  取决与 getTag的值，getTag默认取决于类名，除非你更改
  return "userDoorLogs";
}*/
