/**
 * Created by lxd on 05/05/2017.
 */
import BaseEntity from "../base/BaseEntity";
import {str2Date} from "../../filter/time";
import Filter from "../base/Filter";
import User from "../user/User";
import SpaceRegional from "../space/SpaceRegional";

export default function OfficialArticleTag() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);
  this.user = new User();
  this.name = null;
  this.description = null;

}

//extend BaseEntity
OfficialArticleTag.prototype = new BaseEntity();
OfficialArticleTag.prototype.constructor = OfficialArticleTag;


OfficialArticleTag.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT","名称","orderName"),
    new Filter("SORT", "发布时间", "orderReleaseTime"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object.
OfficialArticleTag.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
}

OfficialArticleTag.prototype.getForm = function () {

  let form = {
    name: this.name,
    description: this.description,
    spaceRegional:this.spaceRegional.id
  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

}


OfficialArticleTag.prototype.validate = function () {


  if (!this.spaceRegional.id) {
    this.errorMessage = "园区地点必选！";
    return false;
  }
  if (!this.name) {
    this.errorMessage = "标签名必填！";
    return false;
  }

  return true;
}
