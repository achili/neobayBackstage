import ByProjectCreateView from "../../../backyard/view/project/Create.vue";
import ByProjectDetailView from "../../../backyard/view/project/Detail.vue";
import ByProjectListView from "../../../backyard/view/project/List.vue";

let lbProjectRouter = [];

let byProjectRouter = [
	{
		path: 'project/list',
		name: 'byProjectList',
		component: ByProjectListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProjectList",
					title: "项目列表"
				}
			]
		}
	},
	{
		path: 'project/create',
		name: 'byProjectCreate',
		component: ByProjectCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProjectList",
					title: "项目列表"
				},
				{
					name: "byProjectCreate",
					title: "创建项目"
				}
			]
		}
	},
	{
		path: 'project/edit',
		name: "byProjectEdit",
		component: ByProjectCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProjectList",
					title: "项目列表"
				},
				{
					name: "byProjectEdit",
					title: "修改项目"
				}
			]
		}
	},
	{

		path: 'project/detail',
		name: "byProjectDetail",
		component: ByProjectDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProjectList",
					title: "项目列表"
				},
				{
					name: "byProjectDetail",
					title: "项目详情"
				}
			]
		}
	}
];

export {lbProjectRouter, byProjectRouter}


