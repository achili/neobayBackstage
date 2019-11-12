import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import User from "../user/User";
import {str2Date} from "../../filter/time";
import SpaceRegional from "../space/SpaceRegional";

export default function OfficialPolicyTag() {
  BaseEntity.call(this, arguments);
  this.user = new User();
  this.name = null;
  this.description = null;
}

OfficialPolicyTag.prototype = new BaseEntity();
OfficialPolicyTag.prototype.constructor = OfficialPolicyTag;

OfficialPolicyTag.prototype.getFilters = function() {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "Sort", "orderSort"),
    new Filter("SORT", "名称", "orderName"),
    new Filter("SORT", "发布时间", "orderReleaseTime"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

OfficialPolicyTag.prototype.render = function(obj) {
  BaseEntity.prototype.render.call(this, obj);
}

OfficialPolicyTag.prototype.getForm = function() {
  let form = {
    spaceRegional: this.spaceRegional.id,
    name: this.name,
    description: this.description
  };
  if(this.id) {
    form.id = this.id;
  }

  return form;
}

OfficialPolicyTag.prototype.validate = function() {
  if(!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }
  if(!this.name) {
    this.errorMessage = "标签名必填！";
    return false;
  }

  return true;
}
