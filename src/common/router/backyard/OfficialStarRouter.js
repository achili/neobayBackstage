/**
 * Created by hot_sauceee on 3/23/17.
 */
import ByOfficialStarCreate from "../../../backyard/view/official/star/Create.vue";
import ByOfficialStarDetail from "../../../backyard/view/official/star/Detail.vue";
import ByOfficialStarList from "../../../backyard/view/official/star/List.vue";

let byOfficialStarRouter = [
	{
		path: 'official/star/list',
		name: "byOfficialStarList",
		component: ByOfficialStarList,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byOfficialStarList",
					title: "明星项目列表"
				}
			]
		}
	},
	{
		path: 'official/star/create',
		name: "byOfficialStarCreate",
		component: ByOfficialStarCreate,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byOfficialStarList",
					title: "明星项目列表"
				},
				{
					name: "byOfficialStarCreate",
					title: "发布明星项目"
				}
			]
		}
	},
	{
		path: 'official/star/edit/:id',
		name: "byOfficialStarEdit",
		component: ByOfficialStarCreate,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byOfficialStarList",
					title: "明星项目列表"
				},
				{
					name: "byOfficialStarEdit",
					title: "编辑明星项目"
				}
			]
		}
	},
	{

		path: 'official/star/detail/:id',
		name: "byOfficialStarDetail",
		component: ByOfficialStarDetail,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byOfficialStarList",
					title: "明星项目列表"
				},
				{
					name: "byOfficialStarDetail",
					title: "明星项目详情"
				}
			]
		}
	}
];

export {byOfficialStarRouter}
