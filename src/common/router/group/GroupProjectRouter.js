import groupProjectCreateView from "../../../backyard/view/project/Create.vue";
import groupProjectDetailView from "../../../backyard/view/project/Detail.vue";
import groupProjectListView from "../../../backyard/view/project/List.vue";

import GroupCompanyListView from "../../../backyard/view/company/List.vue";

import GroupMentorDetailView from "../../../backyard/view/project/mentor/Detail.vue";

let groupProjectRouter = [
  {
    path: 'project/list',
    name: 'groupProjectList',
    component: groupProjectListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProjectList",
          title: "项目列表"
        }
      ]
    }
  },
  {
    path: 'project/create',
    name: 'groupProjectCreate',
    component: groupProjectCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProjectList",
          title: "项目列表"
        },
        {
          name: "groupProjectCreate",
          title: "创建项目"
        }
      ]
    }
  },
  {
    path: 'project/edit',
    name: "groupProjectEdit",
    component: groupProjectCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProjectList",
          title: "项目列表"
        },
        {
          name: "groupProjectEdit",
          title: "修改项目"
        }
      ]
    }
  },
  {
    path: 'project/detail',
    name: "groupProjectDetail",
    component: groupProjectDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProjectList",
          title: "项目列表"
        },
        {
          name: "groupProjectDetail",
          title: "项目详情"
        }
      ]
    }
  },
  {
    path: 'mentor/detail',
    name: "groupMentorDetail",
    component: GroupMentorDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupMentorDetail",
          title: "社区经理详情"
        }
      ]
    }
  }
];

export default  groupProjectRouter;


