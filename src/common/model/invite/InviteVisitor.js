import BaseEntity from "../base/BaseEntity"
import Filter from "../base/Filter";
import User from "../user/User";
import { Message, Notification } from 'element-ui'
import InviteUser from "./InviteUser";
import SpaceRegional from "../space/SpaceRegional";

export default function InviteVisitor() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);
  //基本信息
  this.user = new User();
  this.inviteName = null;
  this.name = null;
  this.invitingTime = new Date();
  this.accessTime = new Date();
  this.visitorsNum = 0;
  this.remark = null;
  this.address = {lng: null, lat: null, address: ""};

}

//extend BaseEntity
InviteVisitor.prototype = new BaseEntity();
InviteVisitor.prototype.constructor = InviteVisitor;

InviteVisitor.prototype.URL_CREATE_USER = "/invite/visitor/create/user";

InviteVisitor.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("INPUT", "公司名称", "name"),
    new Filter('SORT', '创建时间', 'orderCreateTime'),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object.
InviteVisitor.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("user", User);
  this.renderEntity("invitingTime", Date);
  this.renderEntity("accessTime", Date);

};

InviteVisitor.prototype.httpCreateUser = function (id, name, phone, phoneCode, successCallback, errorCallback) {
  let that = this;
  if (!name) {
    Message.error({
      message: '名字必填~'
    });
    return;
  }
  if (!phone) {
    Message.error({
      message: '手机必填~'
    });
    return;
  }
  if (!phoneCode) {
    Message.error({
      message: '手机验证码必填~'
    });
    return;
  }
  console.log(id)
  let form = {
    id: id,
    name: name,
    phone: phone,
    phoneCode: phoneCode
  };
  this.httpPost(this.URL_CREATE_USER, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback)
}
