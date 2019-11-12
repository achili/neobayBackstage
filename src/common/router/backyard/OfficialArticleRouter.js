/**
 * Created by lxd on 05/05/2017.
 */
import ByOfficialArticleListView from "../../../backyard/view/official/article/List.vue";
import ByOfficialArticleCreateView from "../../../backyard/view/official/article/Create.vue";
import ByOfficialArticleDetailView from "../../../backyard/view/official/article/Detail.vue";

import ByOfficialArticleTagCreate from "../../../backyard/view/official/article/tag/Create.vue";
import ByOfficialArticleTagDetail from "../../../backyard/view/official/article/tag/Detail.vue";
import ByOfficialArticleTagList from "../../../backyard/view/official/article/tag/List.vue";

let byOfficialArticleRouter = [
  {
    path: 'official/article/list',
    name: "byOfficialArticleList",
    component: ByOfficialArticleListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialArticleList",
          title: "资讯列表"
        }
      ]
    }
  },
  {
    path: 'official/article/create',
    name: "byOfficialArticleCreate",
    component: ByOfficialArticleCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialArticleList",
          title: "资讯列表"
        },
        {
          name: "byOfficialArticleCreate",
          title: "发布资讯"
        }
      ]
    }
  },
  {
    path: 'official/article/edit/:id',
    name: "byOfficialArticleEdit",
    component: ByOfficialArticleCreateView,
    meta: {requiresAuth: true}
  },
  {

    path: 'official/article/detail/:id',
    name: "byOfficialArticleDetail",
    component: ByOfficialArticleDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialArticleList",
          title: "资讯列表"
        },
        {
          name: "byOfficialArticleDetail",
          title: "资讯详情"
        }
      ]
    }
  },
  {
    path: 'official/article/tag/list',
    name: "byOfficialArticleTagList",
    component: ByOfficialArticleTagList,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialArticleTagList",
          title: "标签列表"
        }
      ]
    }
  },
  {
    path: 'official/article/tag/create',
    name: "byOfficialArticleTagCreate",
    component: ByOfficialArticleTagCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialArticleTagList",
          title: "标签列表"
        },
        {
          name: "byOfficialArticleTagCreate",
          title: "发布标签"
        }
      ]
    }
  },
  {
    path: 'official/article/tag/edit/:id',
    name: "byOfficialArticleTagEdit",
    component: ByOfficialArticleTagCreate,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialArticleList",
          title: "资讯列表"
        },
        {
          name: "byOfficialArticleEdit",
          title: "编辑资讯"
        }
      ]
    }
  },
  {

    path: 'official/article/tag/detail/:id',
    name: "byOfficialArticleTagDetail",
    component: ByOfficialArticleTagDetail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialArticleTagList",
          title: "标签列表"
        },
        {
          name: "byOfficialArticleTagDetail",
          title: "标签详情"
        }
      ]
    }
  }
];

export {byOfficialArticleRouter}
