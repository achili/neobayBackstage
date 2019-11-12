import BaseEntity from "../../base/BaseEntity";
import Tank from "../../tank/Tank"
import Filter from "../../base/Filter";

export default function AddedPrint() {
  BaseEntity.call(this, arguments);
  this.name = null;
  this.deviceId = null;
}

AddedPrint.prototype = new BaseEntity();
AddedPrint.prototype.constructor = AddedPrint;

AddedPrint.prototype.URL_PAGE = "/print/information/added/print/page";

AddedPrint.prototype.getFilters = function () {
  return [
  ];
};

AddedPrint.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("printPicture", Tank);
}

AddedPrint.prototype.getForm = function () {
  let form = {
    name: this.name,
    deviceId: this.deviceId
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};


AddedPrint.prototype.validate = function () {
  if (!this.name) {
    this.errorMessage = "打印机名称必填";
    return false;
  }
  return true;
};


