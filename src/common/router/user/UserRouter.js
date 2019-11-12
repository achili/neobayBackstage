import index from "../../../user/view/index/index.vue";

import UserProfile from "../../../backyard/view/user/Profile.vue";
import UserEdit from "../../../backyard/view/user/Edit.vue";
import UserChangePassword from "../../../backyard/view/user/ChangePassword.vue";
import UserChangePhone from "../../../backyard/view/user/ChangePhone.vue";
import UserValidateEmail from "../../../backyard/view/user/ValidateEmail.vue";



import UserFeedbackListView from "../../../backyard/view/user/feedback/List.vue";
import UserFeedbackDetailView from "../../../backyard/view/user/feedback/Detail.vue";
import UserFeedbackCreateView from "../../../backyard/view/user/feedback/Create.vue";

import UserSurveyUserAnswer from '../../../backyard/view/survey/UserAnswer.vue'
import UserAnswerList from "../../../backyard/view/user/AnswerList.vue";


let userRouter = [
  {
    path: '',
    redirect: { name: 'userIndex' }
  },
  {
    path: 'index',
    name: "userIndex",
    component: index,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "userIndex",
          title: "个人中心"
        }
      ]
    }
  },
	{
		path: 'profile',
		name: "userProfile",
		component: UserProfile,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "userProfile",
					title: "个人资料"
				}
			]
		}
	},
	{
		path: 'edit/:id',
		name: "userEdit",
		component: UserEdit,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "userProfile",
					title: "个人资料"
				},
				{
					name: "userEdit",
					title: "编辑个人信息"
				}
			]
		}
	},
	{
		path: 'change/password',
		name: "userChangePassword",
		component: UserChangePassword,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "userProfile",
					title: "个人资料"
				},
				{
					name: "userChangePassword",
					title: "修改密码"
				}
			]
		}
	},
	{
		path: 'change/phone',
		name: "ChangePhone",
		component: UserChangePhone,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "userProfile",
					title: "个人资料"
				},
				{
					name: "ChangePhone",
					title: "修改手机"
				}
			]
		}
	},
	{
		path: 'validate/email',
		name: "ValidateEmail",
		component: UserValidateEmail,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "userProfile",
					title: "个人资料"
				},
				{
					name: "ValidateEmail",
					title: "修改邮箱"
				}
			]
		}
	},
  ////////反馈///////////////
	{
		path: 'feedback/list',
		name: "UserFeedbackListView",
		component: UserFeedbackListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "UserFeedbackListView",
					title: "反馈历史"
				}
			]
		}
	},
	{
		path: 'feedback/detail/:id',
		name: "UserFeedbackDetailView",
		component: UserFeedbackDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "UserFeedbackListView",
					title: "反馈列表"
				},
				{
					name: "UserFeedbackDetailView",
					title: "反馈详情"
				}
			]
		}
	},
	{
		path: 'feedback/create',
		name: "UserFeedbackCreateView",
		component: UserFeedbackCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "UserFeedbackListView",
					title: "反馈列表"
				},
				{
					name: "UserFeedbackCreateView",
					title: "创建反馈"
				}
			]
		}
	},
  ////////表单///////////////
	{
		path: 'answer/list',
		name: "UserAnswerList",
		component: UserAnswerList,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "UserAnswerList",
					title: "表单历史"
				}
			]
		}
	},
  {
    path: 'answer/detail',
    name: "UserSurveyUserAnswer",
    component: UserSurveyUserAnswer,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "UserAnswerList",
          title: "表单历史"
        },
        {
          name: "UserSurveyUserAnswer",
          title: "回答表单"
        }
      ]
    }
  }
];


export default userRouter


