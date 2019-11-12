/**
 * Created by Matring on 12/31/16.
 */
import ByMeetingRoomListView from "../../../backyard/view/meeting/room/List.vue"
import ByMeetingRoomCreateView from "../../../backyard/view/meeting/room/Create.vue"
import ByMeetingRoomDetailView from "../../../backyard/view/meeting/room/Detail.vue"
import ByMeetingRecordListView from "../../../backyard/view/meeting/record/List.vue"
import ByMeetingRecordCreateView from "../../../backyard/view/meeting/record/Create.vue"
import ByMeetingRecordDetailView from "../../../backyard/view/meeting/record/Detail.vue"
import ByMeetingShowView from "../../../backyard/view/meeting/table/show.vue"

let lbMeetingRouter = [];

let byMeetingRouter = [
	{
		path: 'meeting/room/list',
		name: 'byMeetingRoomList',
		component: ByMeetingRoomListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byMeetingRoomList",
					title: "会议室列表"
				}
			]
		}
	},
	{
		path: "meeting/room/create",
		name: "byMeetingRoomCreate",
		component: ByMeetingRoomCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byMeetingRoomList",
					title: "会议室列表"
				},
				{
					name: "byMeetingRoomCreate",
					title: "添加会议室"
				}
			]
		}
	},
	{
		path: 'meeting/room/edit/:id',
		name: "byMeetingRoomEdit",
		component: ByMeetingRoomCreateView,
		meta: {requiresAuth: true}
	},
	{
		path: "meeting/room/detail/:id",
		name: "byMeetingRoomDetail",
		component: ByMeetingRoomDetailView,
		meta: {requiresAuth: true}
	},

	{
		path: "meeting/record/list",
		name: "byMeetingRecordList",
		component: ByMeetingRecordListView,
		meta: {
			requiredAuth: true,
			breadcrumbs: [
				{
					name: "byMeetingRecordList",
					title: "会议室预订记录列表"
				}
			]
		}
	},
	{
		path: "meeting/record/create",
		name: "byMeetingRecordCreate",
		component: ByMeetingRecordCreateView,
		meta: {
			requiredAuth: true,
			breadcrumbs: [
				{
					name: "byMeetingRecordList",
					title: "会议室预订记录列表"
				},
				{
					name: "byMeetingRecordCreate",
					title: "预订会议室"
				}
			]
		}
	},
	{
		path: "meeting/record/detail/:id",
		name: "byMeetingRecordDetail",
		component: ByMeetingRecordDetailView,
		meta: {requiredAuth: true}
	},
	{
		path: 'meeting/record/edit/:id',
		name: "byMeetingRecordEdit",
		component: ByMeetingRecordCreateView,
		meta: {requiresAuth: true}
	},
	{
		path: "meeting/show",
		name: "byMeetingTableShow",
		component: ByMeetingShowView,
		meta: {
			requiredAuth: true,
			breadcrumbs: [
				{
					name: "byMeetingTableShow",
					title: "会议室预订情况"
				}
			]
		}
	}

]


export {lbMeetingRouter, byMeetingRouter}
