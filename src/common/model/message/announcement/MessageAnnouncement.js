import BaseEntity from '../../base/BaseEntity'
import Filter from '../../base/Filter'

import User from '../../user/User'
import UserRole from '../../user/role/UserRole'
import MessageContactGroup from '../../message/contact/group/MessageContactGroup'
import { str2Date } from '../../../filter/time'
import Vue from 'vue'

let Status = {
  SENDING: 'SENDING',
  COMPLETE: 'COMPLETE'
}

let StatusMap = {
  SENDING: {
    name: '正在发送',
    value: 'SENDING',
    style: 'info'
  },
  COMPLETE: {
    name: '发送完毕',
    value: 'COMPLETE',
    style: 'success'
  }
}

export default function MessageAnnouncement() {

  BaseEntity.call(this, arguments);
  this.creator = new User();
  this.receiverRoles = [];
  this.receiverContactGroups = []
  this.subject = null;
  this.content = null;
  this.sms = null;
  this.smsEnable = false
  this.mailEnable = false
  this.letterEnable = false
  this.stats = Status.SENDING
}


MessageAnnouncement.prototype = new BaseEntity();
MessageAnnouncement.prototype.constructor = MessageAnnouncement;
MessageAnnouncement.prototype.Status = Status;
MessageAnnouncement.prototype.StatusMap = StatusMap;
MessageAnnouncement.prototype.StatusList = MessageAnnouncement.prototype.getStatusList();


MessageAnnouncement.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('HTTP_SELECTION', '发送角色', 'userRoleId', null, UserRole),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("HTTP_SELECTION", "创建者", "creatorId", null, User, false)
  ];
};

MessageAnnouncement.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.date = str2Date(this.date);
  this.renderEntity("creator", User);
  this.renderList("receiverRoles", UserRole);
  this.renderList('receiverContactGroups', MessageContactGroup)
}

MessageAnnouncement.prototype.getForm = function () {
  let form = {
    subject: this.subject,
    content: this.content,
    sms: this.sms,
    smsEnable: this.smsEnable,
    mailEnable: this.mailEnable,
    letterEnable: this.letterEnable
  };
  if (this.id) {
    form.id = this.id;
  }
  if (this.receiverRoles.length !== 0) {
    form.receiverRoles = JSON.stringify(this.receiverRoles)
    form.receiverContactGroups = null
  } else {
    form.receiverRoles = null
    form.receiverContactGroups = JSON.stringify(this.receiverContactGroups)
  }
  return form;
}

MessageAnnouncement.prototype.validate = function () {
  if (this.receiverRoles.length === 0) {
    if (this.receiverContactGroups.length === 0) {
      this.errorMessage = '请至少选择一种用户角色！'
      return false
    }
  }
  if (this.subject === null || this.subject === '') {
    this.errorMessage = '请输入主题！'
    return false
  }
  if (!(this.letterEnable || this.mailEnable)) {
    this.errorMessage = ('请至少选择一种消息通知类型！')
    return false
  }
  if (this.letterEnable || this.mailEnable) {
    if (this.content === null || this.content === '') {
      this.errorMessage = '邮件内容不能为空！'
      return false
    }
  }
  this.errorMessage = ''
  return true;
}

MessageAnnouncement.prototype.exportPhone = function () {
  let groupIds = this.receiverContactGroups
  let roleIds = this.receiverRoles
  if (groupIds === null || groupIds.length === 0) {
    if (roleIds === null || roleIds.length === 0) {
      this.errorMessage = ('请至少选择一种用户角色！')
      return
    }
  }
  this.errorMessage = ''
  let url = Vue.http.options.root + '/message/announcement/export?'

  if (groupIds !== null && groupIds.length !== 0) {
    url += 'groupIds[]='
    groupIds.forEach(groupId => {
      url += groupId + ','
    })

  } else {
    url += 'roleIds[]='
    roleIds.forEach(roleId => {
      url += roleId + ','
    })
  }
  url = url.substring(0, url.length - 1)
  window.location = url
}



