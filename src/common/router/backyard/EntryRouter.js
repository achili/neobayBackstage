import byEntryApplyCreateView from "../../../backyard/view/entry/apply/Create.vue";
import ByEntryBatchListView from "../../../backyard/view/entry/batch/List.vue";
import ByEntryBatchDetailView from "../../../backyard/view/entry/batch/Detail.vue";
import ByEntryBatchCreateView from "../../../backyard/view/entry/batch/Create.vue";
import ByEntryFieldListView from "../../../backyard/view/entry/apply/field/List.vue";
import ByEntryFieldDetailView from "../../../backyard/view/entry/apply/field/Detail.vue";
import ByEntryFieldCreateView from "../../../backyard/view/entry/apply/field/Create.vue";
import ByEntrySpaceListView from "../../../backyard/view/entry/apply/space/List.vue";
import ByEntrySpaceDetailView from "../../../backyard/view/entry/apply/space/Detail.vue";
import ByEntrySpaceCreateView from "../../../backyard/view/entry/apply/space/Create.vue";
import ByEntryApplyListView from "../../../backyard/view/entry/apply/List.vue";
import ByEntryApplyDetailView from "../../../backyard/view/entry/apply/Detail.vue";
import ByEntryApplyCreateCUMTView from "../../../backyard/view/entry/apply/CreateCUMT.vue";


let lbEntryRouter = [

];

let byEntryRouter = [
	/***************Entry********************/
	{
		path: 'entry/apply/create',
		name: "byEntryApplyCreate",
		component: byEntryApplyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryApplyList",
					title: "申请列表"
				},
				{
					name: "byEntryApplyCreate",
					title: "创建入驻申请"
				}
			]
		}
	},
	{
		path: 'entry/apply/edit',
		name: "byEntryApplyEdit",
		component: byEntryApplyCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryApplyList",
					title: "申请列表"
				},
				{
					name: "byEntryApplyEdit",
					title: "修改入驻申请"
				}
			]
		}
	},
	{
		path: 'entry/apply/list',
		name: "byEntryApplyList",
		component: ByEntryApplyListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryApplyList",
					title: "申请列表"
				}
			]
		}
	},
  {
    path: 'entry/apply/list/type',
    name: "byEntryApplyCUMTList",
    component: ByEntryApplyListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byEntryApplyCUMTList",
          title: "中国矿业大学申请列表"
        }
      ]
    }
  },
	{
		path: 'entry/apply/detail',
		name: "byEntryApplyDetail",
		component: ByEntryApplyDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryApplyList",
					title: "申请列表"
				},
				{
					name: "byEntryApplyDetail",
					title: "申请详情"
				}
			]

		}
	},
	{
		path: 'entry/batch/list',
		name: "byEntryBatchList",
		component: ByEntryBatchListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryBatchList",
					title: "入驻批次列表"
				}
			]
		}
	},
	{
		path: 'entry/batch/create',
		name: "byEntryBatchCreate",
		component: ByEntryBatchCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryBatchList",
					title: "入驻批次列表"
				},
				{
					name: "byEntryBatchCreate",
					title: "创建入驻批次"
				}
			]
		}
	},
	{
		path: 'entry/batch/detail/:id',
		name: "byEntryBatchDetail",
		component: ByEntryBatchDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryBatchList",
					title: "入驻批次列表"
				},
				{
					name: "byEntryBatchDetail",
					title: "入驻批次详情"
				}
			]
		}
	},
	{
		path: 'entry/batch/edit/:id',
		name: "byEntryBatchEdit",
		component: ByEntryBatchCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryBatchList",
					title: "入驻批次列表"
				},
				{
					name: "byEntryBatchEdit",
					title: "编辑入驻批次"
				}
			]
		}
	},




  {
    path: 'entry/apply/list/detail',
    name: "byEntryApplyCUMTDetail",
    component: ByEntryApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byEntryApplyCUMTList",
          title: "申请列表"
        },
        {
          name: "byEntryApplyCUMTDetail",
          title: "申请详情"
        }
      ]
    }
  },
  {
    path: 'entry/apply/list/edit',
    name: "byEntryApplyCUMTDEdit",
    component: ByEntryApplyCreateCUMTView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byEntryApplyCUMTList",
          title: "申请列表"
        },
        {
          name: "byEntryApplyCUMTDEdit",
          title: "修改入驻申请"
        }
      ]
    }
  },


	/*****************Field**********************/
	{
		path: 'entry/field/list',
		name: "byEntryFieldList",
		component: ByEntryFieldListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryFieldList",
					title: "入驻领域列表"
				}
			]
		}
	},
	{
		path: 'entry/field/create',
		name: "byEntryFieldCreate",
		component: ByEntryFieldCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryFieldList",
					title: "入驻领域列表"
				},
				{
					name: "byEntryFieldCreate",
					title: "创建入驻领域"
				}
			]
		}
	},
	{
		path: 'entry/field/detail/:id',
		name: "byEntryFieldDetail",
		component: ByEntryFieldDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryFieldList",
					title: "入驻领域列表"
				},
				{
					name: "byEntryFieldDetail",
					title: "入驻领域详情"
				}
			]
		}
	},
	{
		path: 'entry/field/edit/:id',
		name: "byEntryFieldEdit",
		component: ByEntryFieldCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntryFieldList",
					title: "入驻领域列表"
				},
				{
					name: "byEntryFieldEdit",
					title: "编辑入驻领域"
				}
			]
		}
	},

	/*****************Space*********************/
	{
		path: 'entry/space/list',
		name: "byEntrySpaceList",
		component: ByEntrySpaceListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntrySpaceList",
					title: "入驻空间列表"
				}
			]
		}
	},
	{
		path: 'entry/space/create',
		name: "byEntrySpaceCreate",
		component: ByEntrySpaceCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntrySpaceList",
					title: "入驻空间列表"
				},
				{
					name: "byEntrySpaceCreate",
					title: "创建入驻空间"
				}
			]
		}
	},
	{
		path: 'entry/space/detail/:id',
		name: "byEntrySpaceDetail",
		component: ByEntrySpaceDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntrySpaceList",
					title: "入驻空间列表"
				},
				{
					name: "byEntrySpaceDetail",
					title: "入驻空间详情"
				}
			]
		}
	},
	{
		path: 'entry/space/edit/:id',
		name: "byEntrySpaceEdit",
		component: ByEntrySpaceCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byEntrySpaceList",
					title: "入驻空间列表"
				},
				{
					name: "byEntrySpaceEdit",
					title: "编辑入驻空间"
				}
			]
		}
	}
];


export {lbEntryRouter, byEntryRouter}


