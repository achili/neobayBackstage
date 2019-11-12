import ByCompanyCreateView from "../../../backyard/view/company/Create.vue";
import ByCompanyDetailView from "../../../backyard/view/company/Detail.vue";
import ByCompanyListView from "../../../backyard/view/company/List.vue";

let lbCompanyRouter = [];

let byCompanyRouter = [
	{
		path: 'company/list',
		name: 'byCompanyList',
		component: ByCompanyListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byCompanyList",
					title: "公司列表"
				}
			]
		}
	},
	{
		path: 'company/create',
		name: 'byCompanyCreate',
		component: ByCompanyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byCompanyList",
					title: "公司列表"
				},
				{
					name: "byCompanyCreate",
					title: "创建公司"
				}
			]
		}
	},
	{
		path: 'Company/edit',
		name: "byCompanyEdit",
		component: ByCompanyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byCompanyList",
					title: "公司列表"
				},
				{
					name: "byCompanyEdit",
					title: "编辑公司"
				}
			]
		}
	},
	{

		path: 'company/detail',
		name: "byCompanyDetail",
		component: ByCompanyDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byCompanyList",
					title: "公司列表"
				},
				{
					name: "byCompanyDetail",
					title: "公司详情"
				}
			]
		}
	}
];

export {lbCompanyRouter, byCompanyRouter}


