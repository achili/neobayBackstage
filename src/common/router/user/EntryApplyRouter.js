import UserEntryApplyCreateView from "../../../backyard/view/entry/apply/Create.vue";
import UserEntryApplyListView from "../../../backyard/view/entry/apply/List.vue";
import UserEntryApplyDetailView from "../../../backyard/view/entry/apply/Detail.vue";

let entryApplyRouter = [
  {
    path: 'entry/apply/create',
    name: "UserEntryApplyCreate",
    component: UserEntryApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserEntryApplyList",
          title: "申请列表"
        },
        {
          name: "UserEntryApplyCreate",
          title: "创建入驻申请"
        }
      ]
    }
  },
  {
    path: 'entry/apply/edit',
    name: "UserEntryApplyEdit",
    component: UserEntryApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserEntryApplyList",
          title: "申请列表"
        },
        {
          name: "UserEntryApplyEdit",
          title: "修改入驻申请"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list',
    name: "UserEntryApplyList",
    component: UserEntryApplyListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserEntryApplyList",
          title: "申请列表"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list/type',
    name: "UserEntryApplyCUMTList",
    component: UserEntryApplyListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserEntryApplyCUMTList",
          title: "中国矿业大学申请列表"
        }
      ]
    }
  },
  {
    path: 'entry/apply/detail',
    name: "UserEntryApplyDetail",
    component: UserEntryApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserEntryApplyList",
          title: "申请列表"
        },
        {
          name: "UserEntryApplyDetail",
          title: "申请详情"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list/detail',
    name: "UserEntryApplyCUMTDetail",
    component: UserEntryApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserEntryApplyCUMTList",
          title: "申请列表"
        },
        {
          name: "UserEntryApplyCUMTDetail",
          title: "申请详情"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list/edit',
    name: "UserEntryApplyCUMTDEdit",
    component: UserEntryApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserEntryApplyCUMTList",
          title: "申请列表"
        },
        {
          name: "UserEntryApplyCUMTDEdit",
          title: "申请详情"
        }
      ]
    }
  }

];


export default entryApplyRouter


