import ByParkingApplyListView from "../../../backyard/view/parking/List.vue";
import ByParkingApplyDetailView from "../../../backyard/view/parking/Detail.vue";
import ByParkingApplyCreateView from "../../../backyard/view/parking/Create.vue";

let lbParkingRouter = [
  {
    path: 'parking/apply/detail/:id',
    name: "lbParkingApplyDetail",
    component: ByParkingApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: []
    }
  }
];

let byParkingRouter = [
	{
		path: 'parking/list',
		name: "byParkingApplyList",
		component: ByParkingApplyListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byParkingApplyList",
					title: "停车申请列表"
				}
			]
		}
	},
  {
    path: 'parking/apply/create',
    name: "byParkingApplyCreate",
    component: ByParkingApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byParkingApplyList",
          title: "停车申请列表"
        },
        {
          name: "byParkingApplyCreate",
          title: "新建停车申请"
        }
      ]
    }
  },
  {
    path: 'parking/apply/edit/:id',
    name: "byParkingApplyEdit",
    component: ByParkingApplyCreateView,
    meta: {requiresAuth: true}
  },
  {
    path: 'parking/apply/detail/:id',
    name: "byParkingApplyDetail",
    component: ByParkingApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byParkingApplyList",
          title: "停车申请列表"
        },
        {
          name: "byParkingApplyDetail",
          title: "停车申请详情"
        }
      ]
    }
  }
];


export {lbParkingRouter, byParkingRouter}


