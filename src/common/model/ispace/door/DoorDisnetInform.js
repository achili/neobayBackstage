import BaseEntity from "../../base/BaseEntity";
import User from "../../user/User";
import Tank from "../../tank/Tank";

export default function DoorDisnetInform() {

	BaseEntity.call(this, arguments);

  this.notifyUser = new User();
  this.ignoreDoors = [];


}

DoorDisnetInform.prototype = new BaseEntity();
DoorDisnetInform.prototype.constructor = DoorDisnetInform;

DoorDisnetInform.prototype.URL_SAVE_USER = "/door/disnet/inform/save/user";
DoorDisnetInform.prototype.URL_SAVE_IGNOER_DOOR = "/door/disnet/inform/save/ignore/door";

DoorDisnetInform.prototype.getFilters = function () {
  return [];
};

//We use this method to get the full js Object
DoorDisnetInform.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("notifyUser", User);
  // if(this.notifyUser === null) {
  //   this.notifyUser = new User();
  // }

};

DoorDisnetInform.prototype.getForm = function () {
	return {};
};

DoorDisnetInform.prototype.getIgnoreDoorsForm = function () {
  let arr = [];
  if(!this.ignoreDoors) {
    return []
  }
  this.ignoreDoors.forEach(ignoreDoor => {
    arr.push({doorId: ignoreDoor.doorId})
  });
  return arr;
};


//保存管理员
DoorDisnetInform.prototype.saveUser = function (params,successCallback,failureCallback) {
  let that = this;
  this.httpPost(this.URL_SAVE_USER, {user: this.notifyUser.id}, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};

//保存忽略列表
DoorDisnetInform.prototype.saveIgnoreDoor = function(successCallback,failureCallback) {
  let that = this;
  this.httpPost(this.URL_SAVE_IGNOER_DOOR, {IgnoreDoorsInfo: JSON.stringify(this.getIgnoreDoorsForm())}, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};



