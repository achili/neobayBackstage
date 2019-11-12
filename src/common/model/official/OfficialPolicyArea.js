import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import User from "../user/User";
import SpaceRegional from "../space/SpaceRegional";

export default function OfficialPolicyArea() {
  BaseEntity.call(this, arguments);
  this.user = new User();
  this.name = null;
}

OfficialPolicyArea.prototype = new BaseEntity();
OfficialPolicyArea.prototype.constructor = OfficialPolicyArea;

OfficialPolicyArea.prototype.getFilters = function() {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "名称", "orderName"),
    new Filter("SORT", "发布时间", "orderReleaseTime"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

OfficialPolicyArea.prototype.render = function(obj) {
  BaseEntity.prototype.render.call(this, obj);
}

OfficialPolicyArea.prototype.getForm = function() {
  let form = {
    spaceRegional:this.spaceRegional.id,
    name: this.name
  };
  if(this.id) {
    form.id = this.id;
  }

  return form;
}

OfficialPolicyArea.prototype.validate = function() {
  if(!this.spaceRegional.id) {
    this.errorMessage = "园区地点必填！";
    return false;
  }
  if(!this.name) {
    this.errorMessage = "地区名必填！";
    return false;
  }

  return true;
}
