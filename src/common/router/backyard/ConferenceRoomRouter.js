import ByConferenceRoomCreateView from "../../../backyard/view/conference/Create.vue";
import ByConferenceRoomDetailView from "../../../backyard/view/conference/Detail.vue";
import ByConferenceRoomListView from "../../../backyard/view/conference/List.vue";

let byConferenceRoomRouter = [
  {
    path: 'conference/room/list',
    name: 'byConferenceRoomList',
    component: ByConferenceRoomListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomList",
          title: "会议室列表"
        }
      ]
    }
  },
  {
    path: 'conference/room/create',
    name: 'byConferenceRoomCreate',
    component: ByConferenceRoomCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomList",
          title: "会议室列表"
        },
        {
          name: "byConferenceRoomCreate",
          title: "创建会议室"
        }
      ]
    }
  },
  {
    path: 'conference/room/edit',
    name: "byConferenceRoomEdit",
    component: ByConferenceRoomCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomList",
          title: "会议室列表"
        },
        {
          name: "byConferenceRoomEdit",
          title: "编辑会议室"
        }
      ]
    }
  },
  {

    path: 'conference/room/detail',
    name: "byConferenceRoomDetail",
    component: ByConferenceRoomDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byConferenceRoomList",
          title: "会议室列表"
        },
        {
          name: "byConferenceRoomDetail",
          title: "会议室详情"
        }
      ]
    }
  }
];

export {byConferenceRoomRouter}


