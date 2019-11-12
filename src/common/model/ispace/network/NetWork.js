import BaseEntity from "../../base/BaseEntity";
import EntryApplyMember from "../../entry/apply/EntryApplyMember";
import EntryApply from "../../entry/apply/EntryApply";
import EntryBatch from "../../entry/batch/EntryBatch";
import Tank from "../../tank/Tank";
import User from "../../user/User";
import ProjectMentor from "../../project/ProjectMentor";
export default function NetWork() {

}

NetWork.prototype = new BaseEntity();
NetWork.prototype.constructor = NetWork;


NetWork.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("updateTime", Date);
};

//在线人数
NetWork.prototype.GET_ONLINE_NUMBER = "/network/people";

//设备列表
NetWork.prototype.GET_DEVICE_LIST = "/network/facility";

//获取认证历史信息
NetWork.prototype.GET_CREDENTIALS = "/network/authentication";

//云端定位
NetWork.prototype.GET_CLOUD_LOCATION = "/network/location";

//来访
NetWork.prototype.GET_VISITING_HISTORY = "/network/visited";

//设备流量
NetWork.prototype.GET_DEVICE_FLOW = "/network/rate";

//在线用户厂商统计
NetWork.prototype.GET_DEVICE_MANUFACTURER = "/network/manufacturer";

//终端流量统计
NetWork.prototype.GET_TERMINAL_STATISTICS = "/network/flow";

//radio
NetWork.prototype.GET_TERMINAL_RADIO = "/network/radio";

//网络分类
NetWork.prototype.GET_NET_CLASS = "/network/ssid";

NetWork.prototype.GET_NET_SUB_CLASS = "/network/ssidSubclass";


NetWork.prototype.httpOasis = function (url,params,successCallback,errorCallback) {
  let that = this;
  this.httpPost(url,params,function (response) {
    successCallback && successCallback(response.data);
  },errorCallback)
};

