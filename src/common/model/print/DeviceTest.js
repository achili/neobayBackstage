import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";

export default function DeviceTest() {

  BaseEntity.call(this, arguments);
  this.keyValue = [{key: "deviceId", value: ""}];
  this.responseData = null;
}

/*设定访问路径*/
DeviceTest.prototype = new BaseEntity();
DeviceTest.prototype.constructor = DeviceTest;
DeviceTest.prototype.URL_DEVICE_LIST = "/ispace/print/history/device/list";

/*给page里面传参数*/
DeviceTest.prototype.getFilters = function () {
  return [
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "关键字", "keyword")
  ];
};
/*类中类*/
DeviceTest.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  if(!(this.keyValue instanceof Array)) {
    this.keyValue = JSON.parse(this.keyValue);
  }
};

/*把数据放到这个函数传递*/
DeviceTest.prototype.getForm = function () {
  let form = {
    keyValue: JSON.stringify(this.keyValue)
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

/*自动增加一行*/
DeviceTest.prototype.addParam = function (index) {
  if (index !== this.keyValue.length - 1) {
    return;
  }
  this.keyValue.push({key: "", value: ""});
};

/*点击减少一行*/
DeviceTest.prototype.subParam = function (param) {
  if(this.keyValue.length < 2) {
    return;
  }
  let index = this.keyValue.indexOf(param);
  if (index !== -1) {
    this.keyValue.splice(index, 1);
  }
};

DeviceTest.prototype.httpGetDeviceList = function (successCallback, errorCallback) {
  let that = this;
  this.httpPost(this.URL_DEVICE_LIST, {}, function (response) {
    that.responseData = response.data.responseData;
    successCallback && successCallback(response);
  }, errorCallback);
};



