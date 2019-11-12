import BaseEntity from '../../base/BaseEntity'
import User from '../../user/User'
import Filter from '../../base/Filter'
import MessageContactGroup from '../../message/contact/group/MessageContactGroup'

import Vue from 'vue'

export default function MessageContact () {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments)

  this.user = new User()
  this.nickname = null
  this.phone = null
  this.email = null

  if (Vue.store.state.debug) {
    this.mockData()
  }
}

MessageContact.prototype = new BaseEntity()
MessageContact.prototype.constructor = MessageContact
MessageContact.prototype.IMPORT_CONTACTS = '/message/contact/import/contacts'

//测试数据。
MessageContact.prototype.mockData = function () {
  this.nickname = '海蓝'
  this.phone = '18634324953'
  this.email = '534153953@qq.com'
}

MessageContact.prototype.getFilters = function () {
  return [
    new Filter('INPUT', '名称', 'keyword'),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter('HTTP_SELECTION', '分组', 'MessageContactGroupId', null, MessageContactGroup)
  ]
}

//We use this method to get the full js Object.
MessageContact.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj)
  this.renderEntity('user', User)

}

MessageContact.prototype.getForm = function () {

  let form = {
    nickname: this.nickname,
    phone: this.phone,
    email: this.email
  }
  if (this.id) {
    form.id = this.id
  }
  return form
}

MessageContact.prototype.validate = function () {

  if (!this.nickname) {
    this.errorMessage = '昵称必填！'
    return false
  }

  if (!this.phone) {
    this.errorMessage = '联系方式必填！'
    return false
  }
  if (!this.email) {
    this.errorMessage = '邮箱必填！'
    return false
  }
  return true
}

MessageContact.prototype.httpImportContacts = function (file, successCallback, failureCallback) {
  let formData = new FormData()
  formData.append('file', file)
  this.httpPost(this.IMPORT_CONTACTS, formData, function (response) {
    successCallback && successCallback(response)
  }, failureCallback)
}





