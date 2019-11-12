import ByTeamworkListView from "../../../backyard/view/teamwork/List.vue";
import ByTeamworkDetailView from "../../../backyard/view/teamwork/Detail.vue";
import ByTeamworkCreateView from "../../../backyard/view/teamwork/Create.vue";
import ByTeamworkTagListView from "../../../backyard/view/teamwork/tag/List.vue";
import ByTeamworkTagCreateView from "../../../backyard/view/teamwork/tag/Create.vue";
import ByTeamworkTagDetailView from "../../../backyard/view/teamwork/tag/Detail.vue";


let byTeamworkRouter = [
  {
    path: 'teamwork/list',
    name: "byTeamworkList",
    component: ByTeamworkListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkList",
          title: "协同工作列表"
        }
      ]
    }
  },
  {
    path: 'teamwork/create',
    name: "byTeamworkCreate",
    component: ByTeamworkCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkList",
          title: "协同工作列表"
        },
        {
          name: "byTeamworkCreate",
          title: "创建协同工作任务"
        }
      ]
    }
  },
  {
    path: 'teamwork/edit/:id',
    name: "byTeamworkEdit",
    component: ByTeamworkCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkList",
          title: "协同工作列表"
        },
        {
          name: "byTeamworkEdit",
          title: "编辑协同工作任务"
        }
      ]
    }
  },
  {
    path: 'teamwork/detail/:id',
    name: "byTeamworkDetail",
    component: ByTeamworkDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkList",
          title: "协同工作列表"
        },
        {
          name: "byTeamworkDetail",
          title: "协同工作任务详情"
        }
      ]
    }
  },{
    path: 'teamwork/tag/list',
    name: "byTeamworkTagList",
    component: ByTeamworkTagListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkTagList",
          title: "工作类型列表"
        }
      ]
    }
  },
  {
    path: 'teamwork/tag/create',
    name: "byTeamworkTagCreate",
    component: ByTeamworkTagCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkTagList",
          title: "工作类型列表"
        },
        {
          name: "byTeamworkTagCreate",
          title: "创建工作类型"
        }
      ]
    }
  },
  {
    path: 'teamwork/tag/edit/:id',
    name: "byTeamworkTagEdit",
    component: ByTeamworkTagCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkTagList",
          title: "工作类型列表"
        },
        {
          name: "byTeamworkTagEdit",
          title: "编辑工作类型"
        }
      ]
    }
  },
  {
    path: 'teamwork/tag/detail/:id',
    name: "byTeamworkTagDetail",
    component: ByTeamworkTagDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byTeamworkTagList",
          title: "工作类型列表"
        },
        {
          name: "byTeamworkDetail",
          title: "工作类型详情"
        }
      ]
    }
  }

];


export {byTeamworkRouter}


