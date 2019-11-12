import ByTemplateListView from "../../../developer/view/template/List.vue";
import ByTemplateCreateView from "../../../developer/view/template/Create.vue";
import ByTemplateDetailView from "../../../developer/view/template/Detail.vue";

let developerTemplateRouter = [

	{
		path: 'template/list',
		name: "byTemplateList",
		component: ByTemplateListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byTemplateList",
					title: "模板列表"
				}
			]
		}
	},
	{
		path: 'template/create',
		name: "byTemplateCreate",
		component: ByTemplateCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byTemplateList",
					title: "模板列表"
				},
				{
					name: "byTemplateCreate",
					title: "创建"
				}
			]
		}
	},
	{
		path: 'template/edit/:id',
		name: "byTemplateEdit",
		component: ByTemplateCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byTemplateList",
					title: "模板列表"
				},
				{
					name: "byTemplateEdit",
					title: "编辑"
				}
			]
		}
	},
	{
		path: 'template/detail/:id',
		name: "byTemplateDetail",
		component: ByTemplateDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byTemplateList",
					title: "模板列表"
				},
				{
					name: "byTemplateDetail",
					title: "详情"
				}
			]
		}
	}
];


export default developerTemplateRouter


