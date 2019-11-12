import ByMakerHotelCreateView from "../../../backyard/view/maker/hotel/Create.vue";
import ByMakerHotelDetailView from "../../../backyard/view/maker/hotel/Detail.vue";
import ByMakerHotelListView from "../../../backyard/view/maker/hotel/List.vue";

let lbMakerHotelRouter = [];

let byMakerHotelRouter = [
  {
    path: 'maker/hotel/list',
    name: 'byMakerHotelList',
    component: ByMakerHotelListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerHotelList",
          title: "协议酒店申请列表"
        }
      ]
    }
  },
  {
    path: 'maker/hotel/create',
    name: 'byMakerHotelCreate',
    component: ByMakerHotelCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerHotelList",
          title: "协议酒店申请列表"
        },
        {
          name: "byMakerHotelCreate",
          title: "协议酒店申请表"
        }
      ]
    }
  },
  {
    path: 'maker/hotel/edit',
    name: "byMakerHotelEdit",
    component: ByMakerHotelCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerHotelList",
          title: "协议酒店申请列表"
        },
        {
          name: "byMakerHotelEdit",
          title: "编辑协议酒店申请表"
        }
      ]
    }
  },
  {

    path: 'maker/hotel/detail',
    name: "byMakerHotelDetail",
    component: ByMakerHotelDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerHotelList",
          title: "协议酒店申请列表"
        },
        {
          name: "byMakerHotelDetail",
          title: "协议酒店申请表详情"
        }
      ]
    }
  }
];

export {lbMakerHotelRouter, byMakerHotelRouter}


