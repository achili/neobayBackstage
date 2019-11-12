import Create from '../../../user/view/message/letter/Create.vue'
import List from '../../../user/view/message/letter/List.vue'
import Detail from '../../../user/view/message/letter/Detail.vue'

import MessageRemindList from '../../../user/view/message/remind/List.vue'

let userMessageRouter = [
  {
    path: 'message/letter/list',
    name: "DefaultUserMessageList",
    component: List,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "DefaultUserMessageList",
          title: "站内信"
        }
      ]
    }
  },
	{
		path: 'message/letter/list/create',
		name: "UserMessageCreate",
		component: Create,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
        {
          name: "DefaultUserMessageList",
          title: "站内信"
        },
				{
					name: "UserMessageCreate",
					title: "发私信"
				}
			]
		}
	},
  {
    path: 'message/letter/list/detail',
    name: "UserMessageDetail",
    component: Detail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "DefaultUserMessageList",
          title: "站内信"
        },
        {
          name: "UserMessageDetail",
          title: "消息详情"
        }
      ]
    }
  },
  //这里写的很粗糙，注意message/letter/**后面会被动态路由
	{
    path: 'message/letter/list/:box',
    name: "UserMessageList",
    component: List,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "DefaultUserMessageList",
          title: "站内信"
        }
      ]
    }
  },
	{
		path: 'message/remind/list',
		name: "UserMessageRemindList",
		component: MessageRemindList,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "UserMessageRemindList",
					title: "提醒列表"
				}
			]
		}
	}

];
export default userMessageRouter


