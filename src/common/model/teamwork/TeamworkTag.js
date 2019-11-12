import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Filter from "../base/Filter";
import SpaceRegional from "../space/SpaceRegional";

export default function TeamworkTag() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);
  this.user = new User();
  this.name = null;
  this.description = null;
}

//extend BaseEntity
TeamworkTag.prototype = new BaseEntity();
TeamworkTag.prototype.constructor = TeamworkTag;

TeamworkTag.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT","名称","orderName"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object.
TeamworkTag.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
};

TeamworkTag.prototype.getForm = function () {

  let form = {
    spaceRegional:this.spaceRegional.id,
    name: this.name,
    description: this.description
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

TeamworkTag.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }
  if (!this.name) {
    this.errorMessage = "标签名必填！";
    return false;
  }

  return true;
};

