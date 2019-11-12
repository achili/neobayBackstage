import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import User from "../../user/User";
import Project from "../Project";
import { Type, TypeList, TypeMap } from './ProjectAdministratorType'


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



export default function ProjectAdministrator() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);

  this.creator = new User();

  this.project = new Project();
  this.linkUser = new User();
  this.type = Type.ORDINARY;
  this.note = null;

  this.status = Status.OK;

}

//extend BaseEntity
ProjectAdministrator.prototype = new BaseEntity();
ProjectAdministrator.prototype.constructor = ProjectAdministrator;

ProjectAdministrator.prototype.Status = Status;
ProjectAdministrator.prototype.StatusMap = StatusMap;
ProjectAdministrator.prototype.StatusList = ProjectAdministrator.prototype.getStatusList();
ProjectAdministrator.prototype.Type = Type;
ProjectAdministrator.prototype.TypeMap = TypeMap;
ProjectAdministrator.prototype.TypeList = ProjectAdministrator.prototype.getTypeList();


ProjectAdministrator.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("INPUT", "工位名", "projectId")
  ];
};


//We use this method to get the full js Object.
ProjectAdministrator.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);

  this.renderEntity("creator", User);
  this.renderEntity("project", Project);
  this.renderEntity("linkUser", User);

};


ProjectAdministrator.prototype.getForm = function () {
  let form = {
    projectId: this.project.id,
    userId: this.linkUser.id,
    type: this.type,
    note: this.note
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;

};

ProjectAdministrator.prototype.validate = function () {
  if (!this.project.id) {
    this.errorMessage = "请关联一个项目！";
    return false;
  }
  if (!this.linkUser.id) {
    this.errorMessage = "请关联一位用户！";
    return false;
  }
  if (!this.type) {
    this.errorMessage = "类型必填！";
    return false;
  }
  return true;
}


ProjectAdministrator.prototype.httpChangePermission = function (type, projectId, successCallback, errorCallback) {
  let that = this;
  this.type = type;
  this.project.id = projectId;
  this.httpSave(successCallback, errorCallback);
}







