import ByMakerMarketCreateView from "../../../backyard/view/maker/market/Create.vue";
import ByMakerMarketDetailView from "../../../backyard/view/maker/market/Detail.vue";
import ByMakerMarketListView from "../../../backyard/view/maker/market/List.vue";

let lbMakerMarketRouter = [];

let byMakerMarketRouter = [
  {
    path: 'maker/market/list',
    name: 'byMakerMarketList',
    component: ByMakerMarketListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerMarketList",
          title: "园区市集申请列表"
        }
      ]
    }
  },
  {
    path: 'maker/market/create',
    name: 'byMakerMarketCreate',
    component: ByMakerMarketCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerMarketList",
          title: "园区市集申请列表"
        },
        {
          name: "byMakerMarketCreate",
          title: "创建园区市集申请表"
        }
      ]
    }
  },
  {
    path: 'maker/market/edit',
    name: "byMakerMarketEdit",
    component: ByMakerMarketCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerMarketList",
          title: "园区市集申请列表"
        },
        {
          name: "byMakerMarketEdit",
          title: "编辑园区市集申请表"
        }
      ]
    }
  },
  {
    path: 'maker/market/detail',
    name: "byMakerMarketDetail",
    component: ByMakerMarketDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerMarketList",
          title: "园区市集申请列表"
        },
        {
          name: "byMakerMarketDetail",
          title: "园区市集申请表详情"
        }
      ]
    }
  }
];

export {lbMakerMarketRouter,byMakerMarketRouter}

