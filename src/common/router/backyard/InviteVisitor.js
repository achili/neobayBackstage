import ByInviteVisitorListView from "../../../backyard/view/invite/List.vue";
import ByInviteVisitorDetailView from "../../../backyard/view/invite/Detail.vue";


let byInviteVisitorRouter = [
  {
    path: 'invite/list',
    name: 'byInviteVisitorList',
    component: ByInviteVisitorListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byInviteVisitorList",
          title: "邀请访客列表"
        }
      ]
    }
  },
  {
    path: 'invite/detail',
    name: 'byInviteVisitorDetail',
    component: ByInviteVisitorDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byInviteVisitorList",
          title: "邀请访客列表"
        },
        {
          name: "byInviteVisitorDetail",
          title: "邀请访客详情"
        }
      ]
    }
  }
];

export {byInviteVisitorRouter}
