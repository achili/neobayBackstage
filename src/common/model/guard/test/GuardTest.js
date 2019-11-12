import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";

export default function GuardTest() {

  BaseEntity.call(this, arguments);
  this.url = null;
  this.name = null;
  this.tips = "";
  this.keyValue = [{key: "", value: ""}];
  this.responseData = null;
}

/*设定访问路径*/
GuardTest.prototype = new BaseEntity();
GuardTest.prototype.constructor = GuardTest;
GuardTest.prototype.URL_GUARD_TEST = "/guard/test/test";

/*给page里面传参数*/
GuardTest.prototype.getFilters = function () {
  return [
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("INPUT", "关键字", "keyword")
  ];
};
/*类中类*/
GuardTest.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  if(!(this.keyValue instanceof Array)) {
    this.keyValue = JSON.parse(this.keyValue);
  }
};

/*把数据放到这个函数传递*/
GuardTest.prototype.getForm = function () {
  let form = {
    name: this.name,
    tips: this.tips,
    url: this.url,
    keyValue: JSON.stringify(this.keyValue)
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

GuardTest.prototype.validate = function () {
  if (!this.name) {
    this.errorMessage = "名称必填！";
    return false;
  }
  if (!this.url) {
    this.errorMessage = "url必填！";
    return false;
  }
  return true;
};

/*自动增加一行*/
GuardTest.prototype.addParam = function (index) {
  if (index !== this.keyValue.length - 1) {
    return;
  }
  this.keyValue.push({key: "", value: ""});
};

/*点击减少一行*/
GuardTest.prototype.subParam = function (param) {
  if(this.keyValue.length < 2) {
    return;
  }
  let index = this.keyValue.indexOf(param);
  if (index !== -1) {
    this.keyValue.splice(index, 1);
  }
};

/*门禁测试*/
GuardTest.prototype.httpSendTest = function (successCallback, errorCallback) {
  this.errorMessage = null;
  if (!this.url || this.url === "") {
    this.errorMessage = "url为空！";
    return;
  }
  let that = this;
  let form = {
    url: this.url,
    keyValue: JSON.stringify(this.keyValue)
  };
  this.httpPost(this.URL_GUARD_TEST, form, function (response) {
    that.responseData = response.data.responseData;
    successCallback && successCallback(response);
  }, errorCallback);
};
