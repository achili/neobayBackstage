import ByISpaceDoorView from "../../../backyard/view/ispace/door/ISpaceDoor.vue";
import ByDoorDetailView from "../../../backyard/view/ispace/door/DoorDetail.vue";
import ByRoomDetailView from "../../../backyard/view/ispace/door/RoomDetail.vue";
import ByGrantAuthorityCreateView from "../../../backyard/view/ispace/door/GrantAuthorityCreate.vue";
import ByGrantAuthorityDetailView from "../../../backyard/view/ispace/door/GrantAuthorityDetail.vue";
import ByTaskInfoCreateView from "../../../backyard/view/ispace/door/TaskInfoCreate.vue";
import ByTaskInfoDetailView from "../../../backyard/view/ispace/door/TaskInfoDetail.vue";

import ByISpaceSecurityView from "../../../backyard/view/ispace/security/ISpaceSecurity.vue";

/*智慧空间*/
let byISpaceDoorRouter = [
  /*门禁管理*/
    {
      path: 'ispace/door',
      name: "byISpaceDoor",
      component: ByISpaceDoorView,
      meta: {
        requiresAuth: true,
        breadcrumbs: [
          {
            name: "byISpaceDoor",
            title: "门禁管理"
          }
        ]
      }
    },
  {
   /* path: 'door/detail/:doorId',*/
    path: 'door/detail',
    name: "byDoorDetail",
    component: ByDoorDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceDoor",
          title: "门禁管理"
        },
        {
          name: "byDoorDetail",
          title: "门详情"
        }
      ]
    }
  },
  {
    /*path: 'room/detail/:doorId',*/
    path: 'room/detail',
    name: "byRoomDetail",
    component: ByRoomDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceDoor",
          title: "门禁管理"
        },
        {
          name: "byRoomDetail",
          title: "房间详情"
        }
      ]
    }
  },
  {
    path: 'grant/authority/create',
    name: "byGrantAuthorityCreate",
    component: ByGrantAuthorityCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceDoor",
          title: "门禁管理"
        },
        {
          name: "byGrantAuthorityCreate",
          title: "权限赋予"
        }
      ]
    }
  },
  {
   /* path: 'grant/authority/edit/:id',*/
    path: 'grant/authority/edit',
    name: "byGrantAuthorityEdit",
    component: ByGrantAuthorityCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceDoor",
          title: "门禁管理"
        },
        {
          name: "byGrantAuthorityCreate",
          title: "权限赋予"
        }
      ]
    }
  },
  {
   /* path: 'grant/authority/detail/:id',*/
    path: 'grant/authority/detail',
    name: "byGrantAuthorityDetail",
    component: ByGrantAuthorityDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceDoor",
          title: "门禁管理"
        },
        {
          name: "byGrantAuthorityDetail",
          title: "权限赋予详情"
        }
      ]
    }
  },
  {
    path: 'task/info/create',
    name: "byTaskInfoCreate",
    component: ByTaskInfoCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceDoor",
          title: "门禁管理"
        },
        {
          name: "byTaskInfoCreate",
          title: "新建任务通知"
        }
      ]
    }
  },
  {
    /*path: 'task/info/edit/:templateId',*/
    path: 'task/info/edit',
    name: "byTaskInfoEdit",
    component: ByTaskInfoCreateView,
    meta: {
      requiresAuth: true
    }
  },
  {
   /* path: 'task/info/detail/:templateId',*/
    path: 'task/info/detail',
    name: "byTaskInfoDetail",
    component: ByTaskInfoDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceDoor",
          title: "门禁管理"
        },
        {
          name: "byTaskInfoDetail",
          title: "任务通知详情"
        }
      ]
    }
  },

  /*智能安防*/
  {
    path: 'ispace/security',
    name: "byISpaceSecurity",
    component: ByISpaceSecurityView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byISpaceSecurity",
          title: "智能安防"
        }
      ]
    }
  }
  ];
export default byISpaceDoorRouter


