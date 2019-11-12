/**
 * Created by lxd on 05/05/2017.
 */
import ByOfficialActivityListView from "../../../backyard/view/official/activity/List.vue";
import ByOfficialActivityCreateView from "../../../backyard/view/official/activity/Create.vue";
import ByOfficialActivityDetailView from "../../../backyard/view/official/activity/Detail.vue";

import ByOfficialActivityTypeCreate from "../../../backyard/view/official/activity/type/Create.vue";
import ByOfficialActivityTypeDetail from "../../../backyard/view/official/activity/type/Detail.vue";
import ByOfficialActivityTypeList from "../../../backyard/view/official/activity/type/List.vue";

import ByOfficialActivityApplyList from "../../../backyard/view/official/activity/apply/List.vue";
import ByOfficialActivityApplyDetail from "../../../backyard/view/official/activity/apply/Detail.vue";

let byOfficialActivityRouter = [
  {
    path: 'official/activity/list',
    name: "byOfficialActivityList",
    component: ByOfficialActivityListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityList",
          title: "活动列表"
        }
      ]
    }
  },
  {
    path: 'official/activity/create',
    name: "byOfficialActivityCreate",
    component: ByOfficialActivityCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityList",
          title: "活动列表"
        },
        {
          name: "byOfficialActivityCreate",
          title: "发布活动"
        }
      ]
    }
  },
  {
    path: 'official/activity/edit/:id',
    name: "byOfficialActivityEdit",
    component: ByOfficialActivityCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityList",
          title: "活动列表"
        },
        {
          name: "byOfficialActivityEdit",
          title: "活动编辑"
        }
      ]
    }
  },
  {

    path: 'official/activity/detail/:id',
    name: "byOfficialActivityDetail",
    component: ByOfficialActivityDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityList",
          title: "活动列表"
        },
        {
          name: "byOfficialActivityDetail",
          title: "活动详情"
        }
      ]
    }
  },
  {
    path: 'official/activity/type/list',
    name: "byOfficialActivityTypeList",
    component: ByOfficialActivityTypeList,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityTypeList",
          title: "标签列表"
        }
      ]
    }
  },
  {
    path: 'official/activity/type/create',
    name: "byOfficialActivityTypeCreate",
    component: ByOfficialActivityTypeCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityTypeList",
          title: "标签列表"
        },
        {
          name: "byOfficialActivityTypeCreate",
          title: "发布标签"
        }
      ]
    }
  },
  {
    path: 'official/activity/type/edit/:id',
    name: "byOfficialActivityTypeEdit",
    component: ByOfficialActivityTypeCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityTypeList",
          title: "活动类型列表"
        },
        {
          name: "byOfficialActivityTypeEdit",
          title: "编辑活动类型"
        }
      ]
    }
  },
  {

    path: 'official/activity/type/detail/:id',
    name: "byOfficialActivityTypeDetail",
    component: ByOfficialActivityTypeDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityTypeList",
          title: "活动类型列表"
        },
        {
          name: "byOfficialActivityTypeDetail",
          title: "活动类型详情"
        }
      ]
    }
  },
  {

    path: 'official/activity/apply/detail/:id',
    name: "byOfficialActivityApplyDetail",
    component: ByOfficialActivityApplyDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialActivityDetail",
          title: "活动详情"
        },
        {
          name: "byOfficialActivityApplyDetail",
          title: "活动报名详情"
        }
      ]
    }
  }
];

export {byOfficialActivityRouter}
