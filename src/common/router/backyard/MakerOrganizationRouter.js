import ByMakerOrderCreateView from "../../../backyard/view/maker/organization/Create.vue";
import ByMakerOrderListView from "../../../backyard/view/maker/organization/List.vue";
import ByMakerOrderDetailView from "../../../backyard/view/maker/organization/Detail";

let byMakerOrderRouter = [
  {
    path: 'maker/organization/list',
    name: 'byMakerOrderList',
    component: ByMakerOrderListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerOrderList",
          title: "服务机构列表"
        }
      ]
    }
  },
  {
    path: 'maker/organization/create',
    name: 'byMakerOrderCreate',
    component: ByMakerOrderCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerOrderList",
          title: "服务机构列表"
        },
        {
          name: "byMakerOrderCreate",
          title: "创建服务机构"
        }
      ]
    }
  },
  {
    path: 'maker/organization/edit',
    name: "byMakerOrderEdit",
    component: ByMakerOrderCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerOrderList",
          title: "服务机构列表"
        },
        {
          name: "byMakerOrderEdit",
          title: "编辑服务机构"
        }
      ]
    }
  },
  {
    path: 'maker/organization/detail',
    name: "byMakerOrderDetail",
    component: ByMakerOrderDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerOrderList",
          title: "服务机构列表"
        },
        {
          name: "byMakerOrderDetail",
          title: "服务机构详情"
        }
      ]
    }
  }
];


export {byMakerOrderRouter}


