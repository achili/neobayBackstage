import ByNurseryApplyListView from "../../../backyard/view/space/apply/List.vue";
import ByNurseryApplyDetailView from "../../../backyard/view/space/apply/Detail.vue";
import ByNurseryApplyCreateView from "../../../backyard/view/space/apply/Create.vue";



/*******************nursery*******************/
let lbNurseryRouter = [
	{
		path: 'space/apply/detail',
		name: "lbNurseryApplyDetail",
		component: ByNurseryApplyDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: []
		}
	}
];

let byNurseryRouter = [
	{
		path: 'space/apply/list',
		name: "byNurseryApplyList",
		component: ByNurseryApplyListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNurseryApplyList",
					title: "创业空间申请列表"
				}
			]
		}
	},
	{
		path: 'space/apply/create',
		name: "byNurseryApplyCreate",
		component: ByNurseryApplyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNurseryApplyList",
					title: "创业空间申请列表"
				},
				{
					name: "byNurseryApplyCreate",
					title: "新建创业空间申请"
				}
			]
		}
	},

	{
		path: 'space/apply/edit',
		name: "byNurseryApplyEdit",
		component: ByNurseryApplyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNurseryApplyList",
					title: "创业空间申请列表"
				},
				{
					name: "byNurseryApplyEdit",
					title: "创业空间申请修改"
				}
			]
		}
	},

	{
		path: 'space/apply/detail',
		name: "byNurseryApplyDetail",
		component: ByNurseryApplyDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNurseryApplyList",
					title: "创业空间申请列表"
				},
				{
					name: "byNurseryApplyDetail",
					title: "创业空间申请详情"
				}
			]
		}
	}
];


export {lbNurseryRouter, byNurseryRouter}
