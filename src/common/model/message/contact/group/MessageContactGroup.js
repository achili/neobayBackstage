import BaseEntity from '../../../base/BaseEntity'

import Vue from 'vue'

export default function MessageContactGroup () {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments)

  this.name = null
  this.num = null
  this.currentName = null

  if (Vue.store.state.debug) {
    this.mockData()
  }
}

MessageContactGroup.prototype = new BaseEntity()
MessageContactGroup.prototype.constructor = MessageContactGroup
MessageContactGroup.prototype.ADD_CONTACTS = '/message/contact/group/add/contacts'
MessageContactGroup.prototype.ADD_USERS = '/message/contact/group/add/users'
MessageContactGroup.prototype.REMOVE_CONTACTS = '/message/contact/group/remove/contacts'
MessageContactGroup.prototype.REMOVE_USERS = '/message/contact/group/remove/users'
MessageContactGroup.prototype.REFRESH_PROJECT_CONTACTS = '/message/contact/group/refresh/project/contacts'

//测试数据。
MessageContactGroup.prototype.mockData = function () {
  this.name = '神秘用户'
  this.num = '99'
}

//We use this method to get the full js Object.
MessageContactGroup.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj)

}

MessageContactGroup.prototype.getForm = function () {

  let form = {
    name: this.currentName
  }
  if (this.id) {
    form.id = this.id
  }
  return form
}

MessageContactGroup.prototype.validate = function () {

  if (!this.currentName) {
    this.errorMessage = '名称必填！'
    return false
  }
  return true
}

MessageContactGroup.prototype.getCheckedIds = function (List) {
  let ids = []
  let that = this
  for (let i = 0; i < List.length; i++) {
    let item = List[i]
    if (item.checked) {
      ids.push(item.id)
    }
  }
  if (!ids.length) {
    return null
  }
  return ids
}

MessageContactGroup.prototype.httpAddContacts = function (ContactPage, successCallback, failureCallback) {
  let that = this
  let ids = this.getCheckedIds(ContactPage.messageContacts)
  if (ids === null) {
    return
  }
  let form = {
    contactIds: ids,
    id: this.id
  }
  this.httpPost(this.ADD_CONTACTS, form, function (response) {
    that.render(response.data[that.getTAG()])
    successCallback && successCallback(response)
  }, failureCallback)
}

MessageContactGroup.prototype.httpAddUsers = function (UserPage, successCallback, failureCallback) {
  let that = this
  let ids = this.getCheckedIds(UserPage.users)
  if (ids === null) {
    return
  }
  let form = {
    userIds: ids,
    id: this.id
  }
  this.httpPost(this.ADD_USERS, form, function (response) {
    that.render(response.data[that.getTAG()])
    successCallback && successCallback(response)
  }, failureCallback)
}

MessageContactGroup.prototype.httpRemoveContacts = function (groupId, ContactPage, successCallback, failureCallback) {
  let that = this
  let ids = this.getCheckedIds(ContactPage.messageContacts)
  if (ids === null) {
    return
  }
  let form = {
    contactIds: ids,
    id: groupId
  }
  this.httpPost(this.REMOVE_CONTACTS, form, function (response) {
    that.render(response.data[that.getTAG()])
    successCallback && successCallback(response)
  }, failureCallback)
}

MessageContactGroup.prototype.refreshProjectContacts = function (successCallback, failureCallback) {
  this.httpPost(this.REFRESH_PROJECT_CONTACTS, null, function (response) {
    successCallback && successCallback(response)
  }, failureCallback)
}
