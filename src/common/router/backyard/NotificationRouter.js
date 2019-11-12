import ByNotificationCreateView from "../../../backyard/view/notification/Create.vue";
import ByNotificationListView from "../../../backyard/view/notification/List.vue";
import ByNotificationDetailView from "../../../backyard/view/notification/Detail.vue";


let lbNotificationRouter = [];

let byNotificationRouter = [
	{
		path: 'notification/list',
		name: "byNotificationList",
		component: ByNotificationListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNotificationList",
					title: "通知列表"
				}
			]
		}
	},
	{
		path: 'notification/create',
		name: "byNotificationCreate",
		component: ByNotificationCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNotificationList",
					title: "通知列表"
				},
				{
					name: "byNotificationCreate",
					title: "创建通知"
				}
			]
		}
	},
	{
		path: 'notification/edit/:id',
		name: "byNotificationEdit",
		component: ByNotificationCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNotificationList",
					title: "通知列表"
				},
				{
					name: "byNotificationEdit",
					title: "修改通知"
				}
			]
		}
	},
	{

		path: 'notification/detail/:id',
		name: "byNotificationDetail",
		component: ByNotificationDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byNotificationDetail",
					title: "通知详情"
				}
			]
		}
	}
];


export {lbNotificationRouter, byNotificationRouter}


