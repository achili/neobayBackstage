import ByConferenceRoomReservationDetailView from "../../../backyard/view/conference/reservation/Detail.vue";
import ByConferenceRoomReservationListView from "../../../backyard/view/conference/reservation/List.vue";
import ByConferenceRoomReservationCreateView from "../../../backyard/view/conference/reservation/Create.vue";

let lbConferenceRoomReservationRouter = [];

let byConferenceRoomReservationRouter = [
  {
    path: 'conference/room/reservation/list',
    name: 'byConferenceRoomReservationList',
    component: ByConferenceRoomReservationListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomReservationList",
          title: "会议室预定列表"
        }
      ]
    }
  },
  {
    path: 'conference/room/reservation/detail',
    name: "byConferenceRoomReservationDetail",
    component: ByConferenceRoomReservationDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomReservationList",
          title: "会议室预定列表"
        },
        {
          name: "byConferenceRoomReservationDetail",
          title: "预定详情"
        }
      ]
    }
  },
  {
    path: 'conference/room/reservation/create',
    name: 'byConferenceRoomReservationCreate',
    component: ByConferenceRoomReservationCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomReservationList",
          title: "预定列表"
        },
        {
          name: "byConferenceRoomReservationCreate",
          title: "创建会议室预定"
        }
      ]
    }
  },
  {
    path: 'conference/room/reservation/edit',
    name: "byConferenceRoomReservationEdit",
    component: ByConferenceRoomReservationCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomReservationList",
          title: "预定列表"
        },
        {
          name: "byConferenceRoomReservationEdit",
          title: "编辑会议室预定"
        }
      ]
    }
  }
];

export {lbConferenceRoomReservationRouter, byConferenceRoomReservationRouter}


