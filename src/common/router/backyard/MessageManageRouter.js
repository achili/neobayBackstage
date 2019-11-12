import Create from '../../../user/view/message/letter/Create.vue'
import List from '../../../user/view/message/letter/List.vue'
import Detail from '../../../user/view/message/letter/Detail.vue'

import MessageRemindList from '../../../user/view/message/remind/List.vue'

import MessageAnnouncementList from '../../../backyard/view/message/announcement/List.vue'
import MessageAnnouncementDetail from '../../../backyard/view/message/announcement/Detail.vue'
import MessageAnnouncementCreate from '../../../backyard/view/message/announcement/Create.vue'

import MessageContactCreate from '../../../backyard/view/message/contact/Create.vue'
import MessageContactList from '../../../backyard/view/message/contact/List.vue'
import MessageContactDetail from '../../../backyard/view/message/contact/Detail.vue'
import MessageContactImportDetail from '../../../backyard/view/message/contact/ImportDetail.vue'

let byMessageRouter = [
  {
    path: 'message/announcement/list',
    name: "byMessageAnnouncementList",
    component: MessageAnnouncementList,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMessageAnnouncementList",
          title: "历史公告"
        }
      ]
    }
  },
  {
    path: 'message/announcement/detail/:id',
    name: "byMessageAnnouncementDetail",
    component: MessageAnnouncementDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMessageAnnouncementList",
          title: "历史公告"
        },
        {
          name: "byMessageAnnouncementDetail",
          title: "公告详情"
        }
      ]
    }
  },
  {
    path: 'message/announcement/create',
    name: "byMessageAnnouncementCreate",
    component: MessageAnnouncementCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMessageAnnouncementList",
          title: "历史公告"
        },
        {
          name: "byMessageAnnouncementCreate",
          title: "发布公告"
        }
      ]
    }
  },
  {
    path: 'message/contact/list',
    name: 'byMessageContactList',
    component: MessageContactList,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byMessageContactList',
          title: '联系人列表'
        }
      ]
    }
  },
  {
    path: 'message/contact/create',
    name: 'byMessageContactCreate',
    component: MessageContactCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byMessageContactList',
          title: '联系人列表'
        },
        {
          name: 'byMessageContactCreate',
          title: '创建联系人'
        }
      ]
    }
  },
  {
    path: 'message/contact/edit/:id',
    name: 'byMessageContactEdit',
    component: MessageContactCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byMessageContactList',
          title: '联系人列表'
        },
        {
          name: 'byMessageContactCreate',
          title: '编辑联系人'
        }
      ]
    }
  },
  {
    path: 'message/contact/detail/:id',
    name: 'byMessageContactDetail',
    component: MessageContactDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byMessageContactList',
          title: '联系人列表'
        },
        {
          name: 'byMessageContactDetail',
          title: '联系人详情'
        }
      ]
    }
  },
  {
    path: 'message/contact/import/detail',
    name: 'byMessageContactImportDetail',
    component: MessageContactImportDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byMessageContactList',
          title: '联系人列表'
        },
        {
          name: 'byMessageContactDetail',
          title: '批量导入联系人'
        }
      ]
    }
  }

];
export {byMessageRouter}


