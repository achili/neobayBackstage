import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Filter from "../base/Filter";
import SpaceRegional from "../space/SpaceRegional";



export default function ArticleTag() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);
  this.user = new User();
  this.name = null;
  this.description = null;
}


//extend BaseEntity
ArticleTag.prototype = new BaseEntity();
ArticleTag.prototype.constructor = ArticleTag;

ArticleTag.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT","名称","orderName"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};



//We use this method to get the full js Object.
ArticleTag.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
}

ArticleTag.prototype.getForm = function () {

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


ArticleTag.prototype.validate = function () {

  if (!this.name) {
    this.errorMessage = "标签名必填！";
    return false;
  }



  return true;
}

