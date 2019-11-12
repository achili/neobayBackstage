import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";

export default function CreatePrintTest() {

  BaseEntity.call(this, arguments);
  this.keyValue = [{key: "deviceId", value: ""}];
  this.responseData = null;
}

/*设定访问路径*/
CreatePrintTest.prototype = new BaseEntity();
CreatePrintTest.prototype.constructor = CreatePrintTest;
CreatePrintTest.prototype.URL_CREATE_PRINT = "/ispace/print/history/create/print";

/*给page里面传参数*/
CreatePrintTest.prototype.getFilters = function () {
  return [
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "关键字", "keyword")
  ];
};
/*类中类*/
CreatePrintTest.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  if(!(this.keyValue instanceof Array)) {
    this.keyValue = JSON.parse(this.keyValue);
  }
};

/*把数据放到这个函数传递*/
CreatePrintTest.prototype.getForm = function () {
  let form = {
    keyValue: JSON.stringify(this.keyValue)
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

/*自动增加一行*/
CreatePrintTest.prototype.addParam = function (index) {
  if (index !== this.keyValue.length - 1) {
    return;
  }
  this.keyValue.push({key: "", value: ""});
};

/*点击减少一行*/
CreatePrintTest.prototype.subParam = function (param) {
  if(this.keyValue.length < 2) {
    return;
  }
  let index = this.keyValue.indexOf(param);
  if (index !== -1) {
    this.keyValue.splice(index, 1);
  }
};

CreatePrintTest.prototype.httpCreatePrint = function (successCallback, errorCallback) {
  this.errorMessage = null;
  let that = this;
  let form = {
    keyValue: JSON.stringify(this.keyValue)
  };
  this.httpPost(this.URL_CREATE_PRINT, form, function (response) {
    that.responseData = response.data.responseData;
    successCallback && successCallback(response);
  }, errorCallback);
};
