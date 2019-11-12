import ByUserListView from "../../../backyard/view/user/List.vue";
import ByUserProfile from "../../../backyard/view/user/Profile.vue";
import ByUserEdit from "../../../backyard/view/user/Edit.vue";
import ByChangePassword from "../../../backyard/view/user/ChangePassword.vue";
import ByChangePhone from "../../../backyard/view/user/ChangePhone.vue";
import ByValidateEmail from "../../../backyard/view/user/ValidateEmail.vue";

import AnswerList from "../../../backyard/view/user/AnswerList.vue";



import byRoleListView from "../../../backyard/view/user/role/List.vue";
import byRoleCreateView from "../../../backyard/view/user/role/Create.vue";
import byRoleDetailView from "../../../backyard/view/user/role/Detail.vue";

import byFeedbackListView from "../../../backyard/view/user/feedback/List.vue";
import byFeedbackDetailView from "../../../backyard/view/user/feedback/Detail.vue";
import byFeedbackCreateView from "../../../backyard/view/user/feedback/Create.vue";

let byUserRouter = [
	{
		path: 'user/list',
		name: "userList",
		component: ByUserListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "userList",
					title: "用户列表"
				}
			]
		}
	},
	{
		path: 'user/profile/:id',
		name: "ByUserProfile",
		component: ByUserProfile,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
        {
          name: "userList",
          title: "用户列表"
        },
				{
					name: "ByUserProfile",
					title: "用户"
				}
			]
		}
	},
  {
    path: 'user/edit/:id',
    name: "ByUserEdit",
    component: ByUserEdit,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "userList",
          title: "用户列表"
        },
        {
          name: "ByUserProfile",
          title: "编辑用户"
        }
      ]
    }
  },
	{
		path: 'user/role/list',
		name: 'byRoleList',
		component: byRoleListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byRoleList",
					title: "角色列表"
				}
			]
		}
	},
	{
		path: 'user/role/create',
		name: 'byRoleCreate',
		component: byRoleCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byRoleList",
					title: "角色列表"
				},
				{
					name: "byRoleCreate",
					title: "创建角色"
				}
			]
		}
	},
	{
		path: 'user/role/edit/:id',
		name: "byRoleEdit",
		component: byRoleCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byRoleList",
					title: "角色列表"
				},
				{
					name: "byRoleEdit",
					title: "编辑角色"
				}
			]
		}
	},
	{

		path: 'user/role/detail/:id',
		name: "byRoleDetail",
		component: byRoleDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byRoleList",
					title: "角色列表"
				},
				{
					name: "byRoleDetail",
					title: "角色详情"
				}
			]
		}
	}
];


export {byUserRouter}


