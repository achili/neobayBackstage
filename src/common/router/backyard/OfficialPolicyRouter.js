import ByOfficialPolicyListView from "../../../backyard/view/official/policy/List.vue";
import ByOfficialPolicyCreateView from "../../../backyard/view/official/policy/Create.vue";
import ByOfficialPolicyDetailView from "../../../backyard/view/official/policy/Detail.vue";

import ByOfficialPolicyQueryListView from "../../../backyard/view/official/policy/query/List.vue";
import ByOfficialPolicyQueryDetailView from "../../../backyard/view/official/policy/query/Detail.vue";

import ByOfficialPolicyTagCreate from "../../../backyard/view/official/policy/tag/Create.vue";
import ByOfficialPolicyTagDetail from "../../../backyard/view/official/policy/tag/Detail.vue";
import ByOfficialPolicyTagList from "../../../backyard/view/official/policy/tag/List.vue";

import ByOfficialPolicyAreaCreate from "../../../backyard/view/official/policy/area/Create.vue";
import ByOfficialPolicyAreaDetail from "../../../backyard/view/official/policy/area/Detail.vue";
import ByOfficialPolicyAreaList from "../../../backyard/view/official/policy/area/List.vue";


let byOfficialPolicyRouter = [
  {
    path: 'official/policy/list',
    name: "byOfficialPolicyList",
    component: ByOfficialPolicyListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyList",
          title: "政策列表"
        }
      ]
    }
  },
  {
    path: 'official/policy/create',
    name: "byOfficialPolicyCreate",
    component: ByOfficialPolicyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyList",
          title: "政策列表"
        },
        {
          name: "byOfficialPolicyCreate",
          title: "发布政策"
        }
      ]
    }
  },
  {
    path: 'official/policy/edit/:id',
    name: "byOfficialPolicyEdit",
    component: ByOfficialPolicyCreateView,
    meta: {requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyDetail",
          title: "政策详情"
        },
        {
          name: "byOfficialPolicyEdit",
          title: "编辑政策"
        }
      ]
    }
  },
  {

    path: 'official/policy/detail/:id',
    name: "byOfficialPolicyDetail",
    component: ByOfficialPolicyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyList",
          title: "政策列表"
        },
        {
          name: "byOfficialPolicyDetail",
          title: "政策详情"
        }
      ]
    }
  },
  {
    path: 'official/policy/query/list',
    name: "byOfficialPolicyQueryList",
    component: ByOfficialPolicyQueryListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyQueryList",
          title: "政策咨询列表"
        }
      ]
    }
  },
  {

    path: 'official/policy/query/detail/:id',
    name: "byOfficialPolicyQueryDetail",
    component: ByOfficialPolicyQueryDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyQueryList",
          title: "政策咨询列表"
        },
        {
          name: "byOfficialPolicyQueryDetail",
          title: "政策咨询详情"
        }
      ]
    }
  },
  {
    path: 'official/policy/tag/list',
    name: "byOfficialPolicyTagList",
    component: ByOfficialPolicyTagList,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyTagList",
          title: "标签列表"
        }
      ]
    }
  },
  {
    path: 'official/policy/tag/create',
    name: "byOfficialPolicyTagCreate",
    component: ByOfficialPolicyTagCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyTagList",
          title: "标签列表"
        },
        {
          name: "byOfficialPolicyTagCreate",
          title: "发布标签"
        }
      ]
    }
  },
  {
    path: 'official/policy/tag/edit/:id',
    name: "byOfficialPolicyTagEdit",
    component: ByOfficialPolicyTagCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyTagList",
          title: "标签列表"
        },
        {
          name: "byOfficialPolicyTagEdit",
          title: "发布标签"
        }
      ]
    }
  },
  {
    path: 'official/policy/tag/detail/:id',
    name: "byOfficialPolicyTagDetail",
    component: ByOfficialPolicyTagDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyTagList",
          title: "标签列表"
        },
        {
          name: "byOfficialPolicyTagDetail",
          title: "标签详情"
        }
      ]
    }
  },
  {
    path: 'official/policy/area/list',
    name: "byOfficialPolicyAreaList",
    component: ByOfficialPolicyAreaList,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyAreaList",
          title: "地区列表"
        }
      ]
    }
  },
  {
    path: 'official/policy/area/create',
    name: "byOfficialPolicyAreaCreate",
    component: ByOfficialPolicyAreaCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyAreaList",
          title: "地区列表"
        },
        {
          name: "byOfficialPolicyAreaCreate",
          title: "地区编辑"
        }
      ]
    }
  },
  {
    path: 'official/policy/area/edit/:id',
    name: "byOfficialPolicyAreaEdit",
    component: ByOfficialPolicyAreaCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyAreaList",
          title: "地区列表"
        },
        {
          name: "byOfficialPolicyAreaEdit",
          title: "地区编辑"
        }
      ]
    }
  },
  {
    path: 'official/policy/area/detail/:id',
    name: "byOfficialPolicyAreaDetail",
    component: ByOfficialPolicyAreaDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialPolicyAreaList",
          title: "地区列表"
        },
        {
          name: "byOfficialPolicyAreaDetail",
          title: "地区详情"
        }
      ]
    }
  }
];

export {byOfficialPolicyRouter}
