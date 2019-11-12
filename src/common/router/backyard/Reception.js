import ByReceptionListView from "../../../backyard/view/reception/List.vue";
import ByReceptionDetailView from "../../../backyard/view/reception/Detail.vue";
import ByReceptionCreateView from "../../../backyard/view/reception/Create.vue";

let byReceptionRouter = [
  {
    path: 'reception/list',
    name: "byReceptionList",
    component: ByReceptionListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byReceptionList",
          title: "活动-接待列表"
        }
      ]
    }
  },
  {
    path: 'reception/create',
    name: "byReceptionCreate",
    component: ByReceptionCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byReceptionList",
          title: "活动-接待列表"
        },
        {
          name: "byReceptionCreate",
          title: "创建活动-接待"
        }
      ]
    }
  },
  {
    path: 'reception/edit/:id',
    name: "byReceptionEdit",
    component: ByReceptionCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byReceptionList",
          title: "活动-接待列表"
        },
        {
          name: "byReceptionEdit",
          title: "编辑活动-接待"
        }
      ]
    }
  },
  {
    path: 'reception/detail/:id',
    name: "byReceptionDetail",
    component: ByReceptionDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byReceptionList",
          title: "活动-接待列表"
        },
        {
          name: "byReceptionDetail",
          title: "活动-接待详情"
        }
      ]
    }
  }
];


export {byReceptionRouter}


