import ByProtocolIncubatorListView from "../../../backyard/view/protocol/incubator/List.vue";
import ByProtocolIncubatorDetailView from "../../../backyard/view/protocol/incubator/Detail.vue";
import ByProtocolIncubatorCreateView from "../../../backyard/view/protocol/incubator/Create.vue";
import ByProtocolSpaceListView from "../../../backyard/view/protocol/space/List.vue";
import ByProtocolSpaceDetailView from "../../../backyard/view/protocol/space/Detail.vue";
import ByProtocolSpaceCreateView from "../../../backyard/view/protocol/space/Create.vue";

let lbProtocolRouter = [];

let byProtocolRouter = [

	{
		path: 'protocol/incubator/list',
		name: "byProtocolIncubatorList",
		component: ByProtocolIncubatorListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolIncubatorList",
					title: "孵化协议列表"
				}
			]
		}
	},
	{
		path: 'protocol/incubator/create',
		name: "byProtocolIncubatorCreate",
		component: ByProtocolIncubatorCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolIncubatorList",
					title: "孵化协议列表"
				},
				{
					name: "byProtocolIncubatorCreate",
					title: "创建孵化协议"
				}
			]
		}
	},
	{
		path: 'protocol/incubator/edit/:id',
		name: "byProtocolIncubatorEdit",
		component: ByProtocolIncubatorCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolIncubatorList",
					title: "孵化协议列表"
				},
				{
					name: "byProtocolIncubatorEdit",
					title: "编辑孵化协议"
				}
			]
		}
	},
	{
		path: 'protocol/incubator/detail/:id',
		name: "byProtocolIncubatorDetail",
		component: ByProtocolIncubatorDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolIncubatorList",
					title: "孵化协议列表"
				},
				{
					name: "byProtocolIncubatorDetail",
					title: "孵化协议详情"
				}
			]
		}
	},

	//租赁协议相关
	{
		path: 'protocol/space/list',
		name: "byProtocolSpaceList",
		component: ByProtocolSpaceListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolSpaceList",
					title: "租赁协议列表"
				}
			]
		}
	},
	{
		path: 'protocol/space/create',
		name: "byProtocolSpaceCreate",
		component: ByProtocolSpaceCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolSpaceList",
					title: "租赁协议列表"
				},
				{
					name: "byProtocolSpaceCreate",
					title: "创建租赁协议"
				}
			]
		}
	},
	{
		path: 'protocol/space/edit/:id',
		name: "byProtocolSpaceEdit",
		component: ByProtocolSpaceCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolSpaceList",
					title: "租赁协议列表"
				},
				{
					name: "byProtocolSpaceEdit",
					title: "编辑租赁协议"
				}
			]
		}
	},
	{
		path: 'protocol/space/detail/:id',
		name: "byProtocolSpaceDetail",
		component: ByProtocolSpaceDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byProtocolSpaceList",
					title: "租赁协议列表"
				},
				{
					name: "byProtocolSpaceDetail",
					title: "租赁协议详情"
				}
			]
		}
	}
];


export {lbProtocolRouter, byProtocolRouter}


