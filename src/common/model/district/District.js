import BaseEntity from "../base/BaseEntity";

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


export default function District() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.name = null;
	this.level = null;
	this.father = null;
	this.children = [];
	this.status = Status.OK;

}

District.prototype = new BaseEntity();
District.prototype.constructor = District;

District.prototype.URL_CHILDREN = "/district/children/{id}";

District.prototype.Status = Status;
District.prototype.StatusMap = StatusMap;
District.prototype.StatusList = District.prototype.getStatusList();

District.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
}

District.prototype.httpGetChildren = function (successCallback, failureCallback) {
  let that = this;
  let url = this.URL_CHILDREN.replace("{id}", this.id);
  let childrenArr = [];
  this.httpPost(url, null, function (response) {
    let responseArr = response.data[that.getTAGS()];
    for (let i = 0; i < responseArr.length; i++) {
      let bean = responseArr[i];
      let clazz = new District();
      clazz.render(bean);
      childrenArr.push(clazz);
    }
    successCallback && successCallback(childrenArr);
  }, failureCallback);
}

District.prototype.httpGetLevelFirst = function (successCallback, failureCallback) {
  let that = this;
  let url = this.URL_CHILDREN.replace("{id}", "0");
  let levelFirst = [];
  this.httpPost(url, null, function (response) {
    let responseArr = response.data[that.getTAGS()];
    for (let i = 0; i < responseArr.length; i++) {
      let bean = responseArr[i];
      let clazz = new District();
      clazz.render(bean);
      levelFirst.push(clazz);
    }
    successCallback && successCallback(levelFirst);
  }, failureCallback);
  return levelFirst;
}

