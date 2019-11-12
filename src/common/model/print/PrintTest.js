import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";

export default function PrintTest() {

  BaseEntity.call(this, arguments);
  this.keyValue = [{key: "deviceId", value: ""}];
  this.responseData = null;
}

/*设定访问路径*/
PrintTest.prototype = new BaseEntity();
PrintTest.prototype.constructor = PrintTest;

PrintTest.prototype.URL_PAGE = "/print/information/added/print/page";
PrintTest.prototype.URL_PRINT_DRIVE = "/ispace/print/history/print/drive";
PrintTest.prototype.URL_DELETE_PRINT = "/ispace/print/history/delete/print";

/*给page里面传参数*/
PrintTest.prototype.getFilters = function () {
  return [
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "关键字", "keyword")
  ];
};
/*类中类*/
PrintTest.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  if(!(this.keyValue instanceof Array)) {
    this.keyValue = JSON.parse(this.keyValue);
  }
};

/*把数据放到这个函数传递*/
PrintTest.prototype.getForm = function () {
  let form = {
    keyValue: JSON.stringify(this.keyValue)
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

/*自动增加一行*/
PrintTest.prototype.addParam = function (index) {
  if (index !== this.keyValue.length - 1) {
    return;
  }
  this.keyValue.push({key: "", value: ""});
};

/*点击减少一行*/
PrintTest.prototype.subParam = function (param) {
  if(this.keyValue.length < 2) {
    return;
  }
  let index = this.keyValue.indexOf(param);
  if (index !== -1) {
    this.keyValue.splice(index, 1);
  }
};

PrintTest.prototype.httpGetPrintDriveList = function (successCallback, errorCallback) {
  this.errorMessage = null;
  let that = this;
  let form = {
    keyValue: JSON.stringify(this.keyValue)
  };
  this.httpPost(this.URL_PRINT_DRIVE, form, function (response) {
    that.responseData = response.data.responseData;
    successCallback && successCallback(response);
  }, errorCallback);
};

PrintTest.prototype.httpDeletePrint = function (item,successCallback, errorCallback) {
  this.errorMessage = null;
  let that = this;
  let form = {
    deviceId: item.deviceId,
    id: item.id
  };
  this.httpPost(this.URL_DELETE_PRINT, form, function (response) {
    that.responseData = response.data.responseData;
    successCallback && successCallback(response);
  }, errorCallback);
};


