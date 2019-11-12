import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";

export default function DevicePrintTest() {

  BaseEntity.call(this, arguments);
  this.keyValue = [{key: "deviceId", value: ""}];
  this.responseData = null;
}

/*设定访问路径*/
DevicePrintTest.prototype = new BaseEntity();
DevicePrintTest.prototype.constructor = DevicePrintTest;
DevicePrintTest.prototype.URL_DEVICE_PRINT = "/ispace/print/history/device/print/list";

/*给page里面传参数*/
DevicePrintTest.prototype.getFilters = function () {
  return [
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "关键字", "keyword")
  ];
};
/*类中类*/
DevicePrintTest.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  if(!(this.keyValue instanceof Array)) {
    this.keyValue = JSON.parse(this.keyValue);
  }
};

/*把数据放到这个函数传递*/
DevicePrintTest.prototype.getForm = function () {
  let form = {
    keyValue: JSON.stringify(this.keyValue)
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

/*自动增加一行*/
DevicePrintTest.prototype.addParam = function (index) {
  if (index !== this.keyValue.length - 1) {
    return;
  }
  this.keyValue.push({key: "", value: ""});
};

/*点击减少一行*/
DevicePrintTest.prototype.subParam = function (param) {
  if(this.keyValue.length < 2) {
    return;
  }
  let index = this.keyValue.indexOf(param);
  if (index !== -1) {
    this.keyValue.splice(index, 1);
  }
};

DevicePrintTest.prototype.httpGetDevicePrintList = function (successCallback, errorCallback) {
  this.errorMessage = null;
  let that = this;
  let form = {
    keyValue: JSON.stringify(this.keyValue)
  };
  this.httpPost(this.URL_DEVICE_PRINT, form, function (response) {
    that.responseData = response.data.responseData;
    successCallback && successCallback(response);
  }, errorCallback);
};

