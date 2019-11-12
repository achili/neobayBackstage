import GroupCompanyCreateView from "../../../backyard/view/company/Create.vue";
import GroupCompanyDetailView from "../../../backyard/view/company/Detail.vue";
import GroupCompanyListView from "../../../backyard/view/company/List.vue";

let groupCompanyRouter = [
	{
		path: 'company/list',
		name: 'groupCompanyList',
		component: GroupCompanyListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupCompanyList",
					title: "公司列表"
				}
			]
		}
	},
	{
		path: 'company/create',
		name: 'groupCompanyCreate',
		component: GroupCompanyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupCompanyList",
					title: "公司列表"
				},
				{
					name: "groupCompanyCreate",
					title: "创建公司"
				}
			]
		}
	},
	{
		path: 'Company/edit',
		name: "groupCompanyEdit",
		component: GroupCompanyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupCompanyList",
					title: "公司列表"
				},
				{
					name: "groupCompanyEdit",
					title: "编辑公司"
				}
			]
		}
	},
	{

		path: 'company/detail',
		name: "groupCompanyDetail",
		component: GroupCompanyDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupCompanyList",
					title: "公司列表"
				},
				{
					name: "groupCompanyDetail",
					title: "公司详情"
				}
			]
		}
	}
];

export default  groupCompanyRouter;


