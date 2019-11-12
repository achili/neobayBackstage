import ByConferenceRoomReservationDetailView from "../../../backyard/view/conference/reservation/Detail.vue";
import ByConferenceRoomReservationListView from "../../../backyard/view/conference/reservation/List.vue";
import ByConferenceRoomReservationCreateView from "../../../backyard/view/conference/reservation/Create.vue";

import ByConferenceRoomCreateView from "../../../backyard/view/conference/Create.vue";
import ByConferenceRoomDetailView from "../../../backyard/view/conference/Detail.vue";
import ByConferenceRoomListView from "../../../backyard/view/conference/List.vue";
import groupKeeperRouter from "./GroupKeeperRouter";

let lbConferenceRoomReservationRouter = [];

let groupConferenceRoomReservationRouter = [
  {
    path: 'conference/room/list',
    name: 'groupConferenceRoomList',
    component: ByConferenceRoomListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomList",
          title: "会议室列表"
        }
      ]
    }
  },
  {
    path: 'conference/room/create',
    name: 'groupConferenceRoomCreate',
    component: ByConferenceRoomCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomList",
          title: "会议室列表"
        },
        {
          name: "groupConferenceRoomCreate",
          title: "创建会议室"
        }
      ]
    }
  },
  {
    path: 'conference/room/edit',
    name: "groupConferenceRoomEdit",
    component: ByConferenceRoomCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomList",
          title: "会议室列表"
        },
        {
          name: "groupConferenceRoomEdit",
          title: "编辑会议室"
        }
      ]
    }
  },
  {

    path: 'conference/room/detail',
    name: "groupConferenceRoomDetail",
    component: ByConferenceRoomDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomList",
          title: "会议室列表"
        },
        {
          name: "groupConferenceRoomDetail",
          title: "会议室详情"
        }
      ]
    }
  },
  {
    path: 'conference/room/reservation/list',
    name: 'groupConferenceRoomReservationList',
    component: ByConferenceRoomReservationListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomReservationList",
          title: "会议室预定列表"
        }
      ]
    }
  },
  {
    path: 'conference/room/reservation/detail',
    name: "groupConferenceRoomReservationDetail",
    component: ByConferenceRoomReservationDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomReservationList",
          title: "会议室预定列表"
        },
        {
          name: "groupConferenceRoomReservationDetail",
          title: "预定详情"
        }
      ]
    }
  },
  {
    path: 'conference/room/reservation/create',
    name: 'groupConferenceRoomReservationCreate',
    component: ByConferenceRoomReservationCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomReservationList",
          title: "预定列表"
        },
        {
          name: "groupConferenceRoomReservationCreate",
          title: "创建会议室预定"
        }
      ]
    }
  },
  {
    path: 'conference/room/reservation/edit',
    name: "groupConferenceRoomReservationEdit",
    component: ByConferenceRoomReservationCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupConferenceRoomReservationList",
          title: "预定列表"
        },
        {
          name: "groupConferenceRoomReservationEdit",
          title: "编辑会议室预定"
        }
      ]
    }
  }
];

export default groupConferenceRoomReservationRouter;


