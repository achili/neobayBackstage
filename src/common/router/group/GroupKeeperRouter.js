/***新的企业管家**/
import GroupKeeperBusinessListView from "../../../backyard/view/keeper/business/List.vue";
import GroupKeeperBusinessCreateView from "../../../backyard/view/keeper/business/Create.vue";
import GroupKeeperBusinessDetailView from "../../../backyard/view/keeper/business/Detail.vue";

import GroupKeeperBusinessTypeDetailView from "../../../backyard/view/keeper/business/type/Detail.vue";


let groupKeeperRouter = [
	/*新的企业管家****************************************************************************/
	{
		path: 'keeper/business/list',
		name: "groupKeeperBusinessList",
		component: GroupKeeperBusinessListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupKeeperBusinessList",
					title: "业务申请列表"
				}
			]
		}
	},
	{
		path: 'keeper/business/detail',
		name: "groupKeeperBusinessDetail",
		component: GroupKeeperBusinessDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupKeeperBusinessList",
					title: "业务申请列表"
				},
				{
					name: "groupKeeperBusinessDetail",
					title: "业务申请详情"
				}
			]
		}
	},
	{
		path: 'keeper/business/edit',
		name: "groupKeeperBusinessEdit",
		component: GroupKeeperBusinessCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupKeeperBusinessList",
					title: "业务申请列表"
				},
				{
					name: "groupKeeperBusinessEdit",
					title: "编辑业务申请信息"
				}
			]
		}
	},
	{
		path: 'keeper/business/create',
		name: "groupKeeperBusinessCreate",
		component: GroupKeeperBusinessCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "groupKeeperBusinessList",
					title: "业务申请列表"
				},
				{
					name: "groupKeeperBusinessCreate",
					title: "企业管家业务申请"
				}
			]
		}
	}
]

export default groupKeeperRouter;
