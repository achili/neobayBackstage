import BaseEntity from '../../base/BaseEntity'
import Tank from '../../tank/Tank'
import User from '../../user/User'
import { simpleDateTime, str2Date } from '../../../filter/time'
import Filter from '../../base/Filter'

let Status = {
  FINISH: 'FINISH',
  NEW: 'NEW'
}
let StatusMap = {
  FINISH: {
    name: '已经修复',
    value: 'FINISH',
    style: 'success'
  },
  NEW: {
    name: '正在审核中',
    value: 'NEW',
    style: 'warning'
  }
}

export default function Feedback () {

  BaseEntity.call(this, arguments)

  this.creator = new User();
  this.name = null;
  this.description = null;

  this.tanks = [];

  this.archive = null;

  this.status = Status.NEW;


}

//extend BaseEntity
Feedback.prototype = new BaseEntity()
Feedback.prototype.constructor = Feedback


Feedback.prototype.URL_STATUS = "/feedback/status"

Feedback.prototype.Status = Status
Feedback.prototype.StatusMap = StatusMap
Feedback.prototype.StatusList = Feedback.prototype.getStatusList()

Feedback.prototype.getFilters = function () {
  return [
    new Filter(Filter.prototype.Type.SORT, 'ID', 'orderId'),
    new Filter(Filter.prototype.Type.INPUT, '名称', 'name'),
    new Filter(Filter.prototype.Type.SELECTION, '状态', 'status', Feedback.prototype.StatusList)
  ]
}



Feedback.prototype.addCarousel = function () {

  this.tanks.push(new Tank("image", false));
};

//We use this method to get the full js Object.
Feedback.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj)

  this.renderEntity('creator', User)
  this.renderList('tanks', Tank)

}

Feedback.prototype.getForm = function () {

  let tankInfo = []
  if (this.tanks && this.tanks) {
    for (let i = 0; i < this.tanks.length; i++) {
      let tank = this.tanks[i];
      if (tank.exist()){
        tankInfo.push(tank.code);
      }
    }
  }
  let form = {
    name: this.name,
    description: this.description,
    tanks:JSON.stringify(tankInfo)

  }
  if (this.id) {
    form.id = this.id
  }
  return form

}


Feedback.prototype.validate = function () {

  if (!this.name) {
    this.errorMessage = "标题必填！";
    return false;
  }

  if (!this.description) {
    this.errorMessage = "描述必须填写！";
    return false;
  }

  return true;
}

Feedback.prototype.httpStatus = function (status, reason, successCallback, failureCallback) {


  let attachmentsCodes = [];

  let form = {
    "id": this.id,
    "status": status,
    "reason": reason
  };

  let that = this;
  this.httpPost(this.URL_STATUS, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
}

//归档操作。
Feedback.prototype.httpArchive = function (reason, successCallback, failureCallback) {

	let that = this;

	let form = {
		id: this.id,
		archive: !this.archive,
		reason: reason
	};

	if (!this.URL_ARCHIVE) {
		console.error("没有定义URL_ARCHIVE");
		return;
	}
	this.httpPost(this.URL_ARCHIVE, form, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);

}
