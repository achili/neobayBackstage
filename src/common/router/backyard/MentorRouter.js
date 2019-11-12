import ByMentorCreateView from "../../../backyard/view/project/mentor/Create.vue";
import ByMentorDetailView from "../../../backyard/view/project/mentor/Detail.vue";
import ByMentorListView from "../../../backyard/view/project/mentor/List.vue";

let lbMentorRouter = [];

let byMentorRouter = [
	{
		path: 'mentor/list',
		name: 'byMentorList',
		component: ByMentorListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byMentorList",
					title: "社区经理列表"
				}
			]
		}
	},
	{
		path: 'mentor/create',
		name: 'byMentorCreate',
		component: ByMentorCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byMentorList",
					title: "社区经理列表"
				},
				{
					name: "byMentorCreate",
					title: "创建社区经理"
				}
			]
		}
	},
	{
		path: 'mentor/edit/:id',
		name: "byMentorEdit",
		component: ByMentorCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byMentorList",
					title: "社区经理列表"
				},
				{
					name: "byMentorEdit",
					title: "修改社区经理"
				}
			]
		}
	},
	{

		path: 'mentor/detail',
		name: "byMentorDetail",
		component: ByMentorDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byMentorList",
					title: "社区经理列表"
				},
				{
					name: "byMentorDetail",
					title: "社区经理详情"
				}
			]
		}
	}
];

export {lbMentorRouter, byMentorRouter}


