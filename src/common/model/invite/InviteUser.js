import BaseEntity from "../base/BaseEntity"
import Filter from "../base/Filter";
import InviteVisitor from "./InviteVisitor";
import SpaceBuilding from "../space/SpaceBuilding";
import { Message, Notification } from 'element-ui'


export default function InviteUser() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);
  //基本信息
  this.inviteVisitor = new InviteVisitor();
  this.name = null;
  this.phone = null;

  // 敏锐方给予的id
  this.externalId = null;
  // 门禁通行证
  this.qrCode = null;
  //门禁权限
  this.enclosedList = null;

  this.address = {lng: null, lat: null, address: ""};
}

//extend BaseEntity
InviteUser.prototype = new BaseEntity();
InviteUser.prototype.constructor = InviteUser;


InviteUser.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("INPUT", "公司名称", "name"),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("HTTP_SELECTION", "邀请访客", "inviteVisitorId", null, SpaceBuilding,false)

  ];
};

//We use this method to get the full js Object.
InviteUser.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("inviteVisitor", InviteVisitor);

};

InviteUser.prototype.canEdit = function () {
  return true;
};
/**
 * 任何状态均可尝试去删除，后台返回结果是否可以删除。
 */
InviteUser.prototype.canDel = function () {
  return true;
};

