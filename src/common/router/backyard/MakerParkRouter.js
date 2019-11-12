import ByMakerParkCreateView from "../../../backyard/view/maker/simple/Create.vue";
import ByMakerParkDetailView from "../../../backyard/view/maker/simple/Detail.vue";
import ByMakerParkListView from "../../../backyard/view/maker/simple/List.vue";

let lbMakerParkRouter = [];

let byMakerParkRouter = [
  {
    path: 'maker/simple/apply/list',
    name: 'byMakerParkList',
    component: ByMakerParkListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerParkList",
          title: "第三方服务申请列表"
        }
      ]
    }
  },
  {
    path: 'maker/simple/apply/create',
    name: 'byMakerParkCreate',
    component: ByMakerParkCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerParkList",
          title: "第三方服务申请列表"
        },
        {
          name: "byMakerParkCreate",
          title: "第三方服务市集申请表"
        }
      ]
    }
  },
  {
    path: 'maker/simple/apply/edit',
    name: "byMakerParkEdit",
    component: ByMakerParkCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerParkList",
          title: "第三方服务申请列表"
        },
        {
          name: "byMakerParkEdit",
          title: "编辑第三方服务申请表"
        }
      ]
    }
  },
  {

    path: 'maker/simple/apply/detail',
    name: "byMakerParkDetail",
    component: ByMakerParkDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerParkList",
          title: "第三方服务申请列表"
        },
        {
          name: "byMakerParkDetail",
          title: "第三方服务申请表详情"
        }
      ]
    }
  }
];

export {lbMakerParkRouter, byMakerParkRouter}


