import ByMakerSportCreateView from "../../../backyard/view/maker/sport/Create.vue";
import ByMakerSportDetailView from "../../../backyard/view/maker/sport/Detail.vue";
import ByMakerSportListView from "../../../backyard/view/maker/sport/List.vue";

let lbMakerSportRouter = [];

let byMakerSportRouter = [
  {
    path: 'maker/sport/list',
    name: 'byMakerSportList',
    component: ByMakerSportListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerSportList",
          title: "体育申请列表"
        }
      ]
    }
  },
  {
    path: 'maker/sport/create',
    name: 'byMakerSportCreate',
    component: ByMakerSportCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerSportList",
          title: "体育申请列表"
        },
        {
          name: "byMakerSportCreate",
          title: "创建体育申请表"
        }
      ]
    }
  },
  {
    path: 'maker/sport/edit',
    name: "byMakerSportEdit",
    component: ByMakerSportCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerSportList",
          title: "体育申请列表"
        },
        {
          name: "byMakerSportEdit",
          title: "编辑体育申请表"
        }
      ]
    }
  },
  {

    path: 'maker/sport/detail',
    name: "byMakerSportDetail",
    component: ByMakerSportDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerSportList",
          title: "体育申请列表"
        },
        {
          name: "byMakerSportDetail",
          title: "体育申请表详情"
        }
      ]
    }
  }
];

export {lbMakerSportRouter, byMakerSportRouter}


