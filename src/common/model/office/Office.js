import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Filter from "../base/Filter";


export default function Office() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);

  this.user = new User();
  this.name = null;

}

//extend BaseEntity
Office.prototype = new BaseEntity();
Office.prototype.constructor = Office;

Office.prototype.getFilters = function () {
  return [
    new Filter("INPUT", "关键字", "keyword")
  ];
};


//We use this method to get the full js Object.
Office.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);

  this.renderEntity("user", User);

}



Office.prototype.getForm = function () {

  let form = {
    name: this.name

  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

}


Office.prototype.validate = function () {
  if (!this.name) {
    this.errorMessage = "标题必填！";
    return false;
  }
  return true;
};
