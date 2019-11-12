import GroupEntryApplyCreateView from "../../../backyard/view/entry/apply/Create.vue";
import GroupEntryApplyListView from "../../../backyard/view/entry/apply/List.vue";
import GroupEntryApplyDetailView from "../../../backyard/view/entry/apply/Detail.vue";

let entryApplyRouter = [
  {
    path: 'entry/apply/create',
    name: "GroupEntryApplyCreate",
    component: GroupEntryApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "GroupEntryApplyList",
          title: "申请列表"
        },
        {
          name: "GroupEntryApplyCreate",
          title: "创建入驻申请"
        }
      ]
    }
  },
  {
    path: 'entry/apply/edit',
    name: "GroupEntryApplyEdit",
    component: GroupEntryApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "GroupEntryApplyList",
          title: "申请列表"
        },
        {
          name: "GroupEntryApplyEdit",
          title: "修改入驻申请"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list',
    name: "GroupEntryApplyList",
    component: GroupEntryApplyListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "GroupEntryApplyList",
          title: "申请列表"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list/type',
    name: "GroupEntryApplyCUMTList",
    component: GroupEntryApplyListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "GroupEntryApplyCUMTList",
          title: "中国矿业大学项目录入列表"
        }
      ]
    }
  },
  {
    path: 'entry/apply/detail',
    name: "GroupEntryApplyDetail",
    component: GroupEntryApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "GroupEntryApplyList",
          title: "中国矿业大学申请列表"
        },
        {
          name: "GroupEntryApplyDetail",
          title: "中国矿业大学申请详情"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list/detail',
    name: "GroupEntryApplyCUMTDetail",
    component: GroupEntryApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "GroupEntryApplyCUMTList",
          title: "中国矿业大学项目录入列表"
        },
        {
          name: "GroupEntryApplyCUMTDetail",
          title: "中国矿业大学项目录入详情"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list/edit',
    name: "GroupEntryApplyCUMTDEdit",
    component: GroupEntryApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "GroupEntryApplyCUMTList",
          title: "中国矿业大学项目录入列表"
        },
        {
          name: "GroupEntryApplyCUMTDEdit",
          title: "中国矿业大学项目录入编辑"
        }
      ]
    }
  }

];


export default entryApplyRouter


