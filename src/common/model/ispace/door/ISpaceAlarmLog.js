import BaseEntity from "../../base/BaseEntity";


export default function ISpaceAlarmLog() {

  BaseEntity.call(this, arguments);
  this.doorId = null;
  this.doorName = null;
  this.recordTime = null;
  this.recordType = null;
}

ISpaceAlarmLog.prototype = new BaseEntity();
ISpaceAlarmLog.prototype.constructor = ISpaceAlarmLog;

ISpaceAlarmLog.prototype.URL_PAGE = "/i/space/alarm/log/page";
