import NoMessage from "../../../backyard/view/NoMessage";

let byNoMessageRouter = [
  {
    // 门禁管理
    path: 'no/message/door',
    name: 'byNoMessageList',
    component: NoMessage,
    meta: {
      requiresAuth: true,
      breadcrumbs: [

      ]
    }
  },
  {
    // 智能空调
    path: 'no/message/air',
    name: 'byNoMessageAirList',
    component: NoMessage,
    meta: {
      requiresAuth: true,
      breadcrumbs: [

      ]
    }
  },
  {
    // 能耗中心
    path: 'no/message/res',
    name: 'byNoMessageResList',
    component: NoMessage,
    meta: {
      requiresAuth: true,
      breadcrumbs: [

      ]
    }
  },
  {
    // 智能打印
    path: 'no/message/print',
    name: 'byNoMessagePrintList',
    component: NoMessage,
    meta: {
      requiresAuth: true,
      breadcrumbs: [

      ]
    }
  },
  {
    // 智能安防
    path: 'no/message/security',
    name: 'byNoMessageSecurityList',
    component: NoMessage,
    meta: {
      requiresAuth: true,
      breadcrumbs: [

      ]
    }
  },
  {
    // 宣传展示中心
    path: 'no/message/pub',
    name: 'byNoMessagePubList',
    component: NoMessage,
    meta: {
      requiresAuth: true,
      breadcrumbs: [

      ]
    }
  }
];
export {byNoMessageRouter}


