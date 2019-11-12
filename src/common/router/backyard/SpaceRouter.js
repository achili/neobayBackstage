import BySpaceBuildingListView from "../../../backyard/view/space/building/List.vue";
import BySpaceBuildingDetailView from "../../../backyard/view/space/building/Detail.vue";
import BySpaceBuildingCreateView from "../../../backyard/view/space/building/Create.vue";
import BySpaceRoomListView from "../../../backyard/view/space/room/List.vue";
import BySpaceRoomDetailView from "../../../backyard/view/space/room/Detail.vue";
import BySpaceRoomCreateView from "../../../backyard/view/space/room/Create.vue";
import BySpaceSeatGraphView from "../../../backyard/view/space/seat/Graph.vue";
import BySpaceSiteVisualView from "../../../backyard/view/space/site/Visual.vue"

import BySpaceSeatDistributionView from "../../../backyard/view/space/seat/Distribution";
import BySpaceRoomDistributionView from "../../../backyard/view/space/room/Distribution.vue";
import BySpaceSeatDetailView from "../../../backyard/view/space/seat/Detail";





let lbSpaceRouter = [];

let bySpaceRouter = [
	/*****************Building**********************/
	{
		path: 'space/building/list',
		name: "bySpaceBuildingList",
		component: BySpaceBuildingListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceBuildingList",
					title: "楼栋列表"
				}
			]
		}
	},
	{
		path: 'space/building/create',
		name: "bySpaceBuildingCreate",
		component: BySpaceBuildingCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceBuildingList",
					title: "楼栋列表"
				},
				{
					name: "bySpaceBuildingCreate",
					title: "创建楼栋"
				}
			]
		}
	},
	{
		path: 'space/building/edit/:id',
		name: "bySpaceBuildingEdit",
		component: BySpaceBuildingCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceBuildingList",
					title: "楼栋列表"
				},
				{
					name: "bySpaceBuildingEdit",
					title: "编辑楼栋"
				}
			]
		}
	},
	{
		path: 'space/building/detail/:id',
		name: "bySpaceBuildingDetail",
		component: BySpaceBuildingDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceBuildingList",
					title: "楼栋列表"
				},
				{
					name: "bySpaceBuildingDetail",
					title: "楼栋详情"
				}
			]
		}
	},
	/*****************Room**********************/
	{
		path: 'space/room/list',
		name: "bySpaceRoomList",
		component: BySpaceRoomListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceRoomList",
					title: "房间列表"
				}
			]
		}
	},
  {
    path: 'space/room/distribution',
    name: "bySpaceRoomDistribution",
    component: BySpaceRoomDistributionView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceRoomDistribution",
          title: "房间分配"
        }
      ]
    }
  },
	{
		path: 'space/room/create',
		name: "bySpaceRoomCreate",
		component: BySpaceRoomCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceRoomList",
					title: "房间列表"
				},
				{
					name: "bySpaceRoomCreate",
					title: "创建房间"
				}
			]
		}
	},
	{
		path: 'space/room/edit/:id',
		name: "bySpaceRoomEdit",
		component: BySpaceRoomCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceRoomList",
					title: "房间列表"
				},
				{
					name: "bySpaceRoomEdit",
					title: "编辑房间"
				}
			]
		}
	},
	{
		path: 'space/room/detail/:id',
		name: "bySpaceRoomDetail",
		component: BySpaceRoomDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceRoomList",
					title: "房间列表"
				},
				{
					name: "bySpaceRoomDetail",
					title: "房间详情"
				}
			]
		}
	},
	{
		path: 'space/seat/graph',
		name: "bySpaceSeatGraphView",
		component: BySpaceSeatGraphView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "bySpaceSeatGraphView",
					title: "工位视图"
				}
			]
		}
	},
  {
    path: 'space/seat/distribution',
    name: "bySpaceSeatDistribution",
    component: BySpaceSeatDistributionView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceSeatDistribution",
          title: "工位分配"
        }
      ]
    }
  },
  {
    path:'space/site/visual',
    name:'BySpaceSiteVisualView',
    component:BySpaceSiteVisualView,
    meta:{
      requiresAuth:true,
      breadcrumbs:[
        {
          name:"BySpaceSiteVisualView",
          title:"可视化场地维护"
        }
      ]
    }
  },
  {
    path: 'space/Seat/detail',
    name: "bySpaceSeatDetail",
    component: BySpaceSeatDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceSeatDistribution",
          title: "工位分配"
        },
        {
          name: "bySpaceSeatDetail",
          title: "工位详情"
        }
      ]
    }
  }
];


export {lbSpaceRouter, bySpaceRouter}


