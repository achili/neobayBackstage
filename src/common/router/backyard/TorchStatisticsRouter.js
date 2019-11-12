import ByTorch2017ListView from "../../../backyard/view/torch/2017/List.vue";
import ByTorch2017CreateView from "../../../backyard/view/torch/2017/Create.vue";
import ByTorch2017DetailView from "../../../backyard/view/torch/2017/Detail.vue";

import ByTorch2018ListView from "../../../backyard/view/torch/2018/List.vue";
import ByTorch2018CreateView from "../../../backyard/view/torch/2018/Create.vue";
import ByTorch2018DetailView from "../../../backyard/view/torch/2018/Detail.vue";

let byTorch2017Router = [
  {
    path: 'torch2017/list',
    name: 'byTorch2017List',
    component: ByTorch2017ListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorch2017List",
          title: "火炬统计列表"
        }
      ]
    }
  },
  {
    path: 'torch2017/create',
    name: 'byTorch2017Create',
    component: ByTorch2017CreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorch2017List",
          title: "火炬统计列表"
        },
        {
          name: "byTorch2017Create",
          title: "创建火炬统计表"
        }
      ]
    }
  },
  {
    path: 'torch2017/edit',
    name: 'byTorch2017Edit',
    component: ByTorch2017CreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorchList",
          title: "火炬统计列表"
        }
      ]
    }
  },
  {
    path: 'torch2017/detail/:id',
    name: 'byTorch2017Detail',
    component: ByTorch2017DetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorch2017List",
          title: "火炬统计列表"
        },
        {
          name: "byTorch2017Detail",
          title: "火炬统计表详情"
        }
      ]
    }
  }
];

let byTorch2018Router = [
  {
    path: 'torch2018/list',
    name: 'byTorch2018List',
    component: ByTorch2018ListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorch2018List",
          title: "火炬统计列表"
        }
      ]
    }
  },
  {
    path: 'torch2018/create',
    name: 'byTorch2018Create',
    component: ByTorch2018CreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorch2018List",
          title: "火炬统计列表"
        },
        {
          name: "byTorch2018Create",
          title: "创建火炬统计表"
        }
      ]
    }
  },
  {
    path: 'torch2018/edit',
    name: 'byTorch2018Edit',
    component: ByTorch2018CreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorchList",
          title: "火炬统计列表"
        }
      ]
    }
  },
  {
    path: 'torch2018/detail/:id',
    name: 'byTorch2018Detail',
    component: ByTorch2018DetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTorch2018List",
          title: "火炬统计列表"
        },
        {
          name: "byTorch2018Detail",
          title: "火炬统计表详情"
        }
      ]
    }
  }
];

export {byTorch2017Router, byTorch2018Router}
