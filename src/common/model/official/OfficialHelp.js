import BaseEntity from "../base/BaseEntity";
import Tank from "../tank/Tank";
import User from "../user/User";
import {simpleDateTime, str2Date} from "../../filter/time";
import Filter from "../base/Filter";
let Status = {
    OK: "OK"
}
let StatusMap = {
    OK: {
        name: "正常",
        value: "OK",
        style: "success"
    }
}

let Type = {
  MENU: "MENU"
}
let TypeMap = {
  MENU: {
    name: "菜单",
    value: "MENU",
    style: "success"
  },
  CONTENT: {
    name: " 内容",
    value: "CONTENT",
    style: "info"
  }
}

export default function OfficialHelp() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);

  this.name = null;
  this.level = 1;
  this.type = Type.MENU;
  this.content = null;

  //非固有字段
  this.creatorOfficialHelpId = null;
  this.open = false;
}


//extend BaseEntity
OfficialHelp.prototype = new BaseEntity();
OfficialHelp.prototype.constructor = OfficialHelp;


OfficialHelp.prototype.Status = Status;
OfficialHelp.prototype.StatusMap = StatusMap;
OfficialHelp.prototype.StatusList = OfficialHelp.prototype.getStatusList();
OfficialHelp.prototype.Type = Type;
OfficialHelp.prototype.TypeMap = TypeMap;
OfficialHelp.prototype.TypeList = OfficialHelp.prototype.getTypeList();

OfficialHelp.prototype.URL_UP = "/official/help/up";

OfficialHelp.prototype.getFilters = function () {
    return [];
};


//We use this method to get the full js Object.
OfficialHelp.prototype.render = function (obj) {
    BaseEntity.prototype.render.call(this, obj);
}



OfficialHelp.prototype.getForm = function () {
    let form = {
        name:this.name,
        type:this.type,
        content:this.content,
        creatorOfficialHelpId:this.creatorOfficialHelpId
    };
    if (this.id) {
      form.id = this.id;
    }
    return form;
}


OfficialHelp.prototype.validate = function () {

    if (!this.name) {
        this.errorMessage = "标题必填！";
        return false;
    }
    if (!this.type) {
        this.errorMessage = "类别必填！";
        return false;
    }
    return true;
}

OfficialHelp.prototype.httpUp = function (successCallback, failureCallback) {
  let that = this;
  let params = {
    id: this.id
  }
  this.httpPost(this.URL_UP, params, function (response) {
    successCallback && successCallback(response);
  }, failureCallback);
}


