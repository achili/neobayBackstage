import BySurveyListView from '../../../backyard/view/survey/List.vue'
import BySurveyCreateView from '../../../backyard/view/survey/Create.vue'
import BySurveyDetailView from '../../../backyard/view/survey/Detail.vue'
import BySurveyAnswerView from '../../../backyard/view/survey/Answer.vue'
import BySurveyUserAnswer from '../../../backyard/view/survey/UserAnswer.vue'

let lbSurveyRouter = [];

let bySurveyRouter = [
	{
		path: 'survey/list',
		name: "bySurveyList",
		component: BySurveyListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySurveyList",
          title: '表单管理'
				}
			]
		}
	},
	{
		path: 'survey/create',
		name: "bySurveyCreate",
		component: BySurveyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySurveyList",
          title: '表单管理'
				},
				{
					name: "bySurveyCreate",
          title: '创建表单'
				}
			]
		}
	},
	{
		path: 'survey/edit/:id',
		name: "bySurveyEdit",
		component: BySurveyCreateView,
		meta: {requiresAuth: true}
	},
	{

		path: 'survey/detail/:id',
		name: "bySurveyDetail",
		component: BySurveyDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySurveyList",
          title: '表单管理'
				},
				{
					name: "bySurveyDetail",
          title: '表单详情'
				}
			]
		}
	},
	{
		path: 'survey/answer/:surveyAnswerId',
		name: "bySurveyAnswerDetail",
		component: BySurveyAnswerView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySurveyList",
          title: '表单管理'
				},
				{
					name: "bySurveyAnswerDetail",
					title: "答卷详情"
				}
			]
		}
	},
	{
		path: 'survey/ready/:surveyId',
		name: "bySurveyReady",
		component: BySurveyUserAnswer,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySurveyReady",
					title: "回答表单"
				}
			]
		}
	}
];

export {lbSurveyRouter, bySurveyRouter}


