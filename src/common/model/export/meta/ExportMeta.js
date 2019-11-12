import BaseEntity from "../../base/BaseEntity";
import Attribute from "../../template/Attribute";
import Filter from "../../base/Filter";
import User from "../../user/User";
export default function ExportMeta() {

  BaseEntity.call(this, arguments);

  this.user = new User();
  this.name = null;
  this.description = null;
  this.attributes = [];

}


ExportMeta.prototype = new BaseEntity();
ExportMeta.prototype.constructor = ExportMeta;


ExportMeta.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "发布时间", "orderReleaseTime"),
    new Filter("INPUT", "模板名称", "name")
  ];
};

//为每个Attribute准备层级关系。
ExportMeta.prototype.fillHierarchy = function () {

  if (this.attributes && this.attributes.length > 0) {
    for (let i = 0; i < this.attributes.length; i++) {
      let attr = this.attributes[i];
      attr.fillHierarchy(null);
    }
  }

}

ExportMeta.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("user", User);
  this.renderList("attributes", Attribute);
  this.fillHierarchy();
}


ExportMeta.prototype.getForm = function () {
  let info = [];
  for (let i = 0; i < this.attributes.length; i++) {
    let attr = this.attributes[i];
    info.push(attr.getForm());
  }

  let form = {
    name: this.name,
    description: this.description,
    attributes: JSON.stringify(info)
  };


  if (this.id){
    form.id = this.id;
  }

  return form;
}

//重置所有errorMessage
ExportMeta.prototype.resetErrorMessage = function (attribute) {
  attribute.errorMessage = null;
  if (attribute.attributes && attribute.attributes.length !== 0) {

    for (let i = 0; i < attribute.attributes.length; i++) {
      let attr = attribute.attributes[i];
      this.resetErrorMessage(attr);
    }
  }
}

//递归验证每个attribute的合理性
ExportMeta.prototype.validateAttribute = function (attribute) {

  if (attribute.editMode) {
    this.errorMessage = "请确保所有属性处于非编辑状态。";
    attribute.errorMessage = "提交前请先关闭编辑状态！";
    return false;
  }

  if (!attribute.primitive) {
    if (!attribute.attributes || attribute.attributes.length === 0) {
      this.errorMessage = "对于非简单类型的属性请指定其子属性";
      attribute.errorMessage = "该属性为复合属性，提交前必须指定其子属性";
      return false;
    } else {
      for (let i = 0; i < attribute.attributes.length; i++) {
        let attr = attribute.attributes[i];

        let b = this.validateAttribute(attr);
        if (!b) {
          return b;
        }
      }
    }
  }

  attribute.errorMessage = null;
  return true;
}

ExportMeta.prototype.validate = function () {
  this.errorMessage = null;
  if (!this.name){
    this.errorMessage = "名称必填！";
    return false;
  }

  if (!this.description){
    this.errorMessage = "描述必填！";
    return false;
  }

  for (let i = 0; i < this.attributes.length; i++) {
    let attr = this.attributes[i];
    this.resetErrorMessage(attr);
  }

  for (let i = 0; i < this.attributes.length; i++) {
    let attr = this.attributes[i];
    let b = this.validateAttribute(attr);
    if (!b) {
      return b;
    }
  }

  return true;
}




ExportMeta.prototype.exportEntryApply = function(metaId, entryApplyIds){
  window.location = Vue.http.options.root + "/export/meta/entry/apply/" + metaId + "?&entryApplyIds=" + entryApplyIds;
}

