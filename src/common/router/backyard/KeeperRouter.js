/***新的企业管家**/
import ByKeeperBusinessListView from "../../../backyard/view/keeper/business/List.vue";
import ByKeeperBusinessCreateView from "../../../backyard/view/keeper/business/Create.vue";
import ByKeeperBusinessDetailView from "../../../backyard/view/keeper/business/Detail.vue";


import ByKeeperBusinessTypeListView from "../../../backyard/view/keeper/business/type/List.vue";
import ByKeeperBusinessTypeCreateView from "../../../backyard/view/keeper/business/type/Create.vue";
import ByKeeperBusinessTypeDetailView from "../../../backyard/view/keeper/business/type/Detail.vue";

import ByKeeperBusinessOrganizationListView from "../../../backyard/view/keeper/business/organization/List.vue";
import ByKeeperBusinessOrganizationCreateView from "../../../backyard/view/keeper/business/organization/Create.vue";
import ByKeeperBusinessOrganizationDetailView from "../../../backyard/view/keeper/business/organization/Detail.vue";
/***新的企业管家**/

let lbKeeperRouter = [

];

let byKeeperRouter = [
	/*新的企业管家****************************************************************************/
	{
		path: 'keeper/business/list',
		name: "byKeeperBusinessList",
		component: ByKeeperBusinessListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessList",
					title: "业务申请列表"
				}
			]
		}
	},
  {
    path: 'keeper/business/list/businessTypeId',
    name: "byKeeperBusinessIdList",
    component: ByKeeperBusinessListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byKeeperBusinessIdList",
          title: "业务申请列表"
        }
      ]
    }
  },
	{
		path: 'keeper/business/detail',
		name: "byKeeperBusinessDetail",
		component: ByKeeperBusinessDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessList",
					title: "业务申请列表"
				},
				{
					name: "byKeeperBusinessDetail",
					title: "业务申请详情"
				}
			]
		}
	},
	{
		path: 'keeper/business/edit',
		name: "byKeeperBusinessEdit",
		component: ByKeeperBusinessCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessList",
					title: "业务申请列表"
				},
				{
					name: "byKeeperBusinessEdit",
					title: "编辑业务申请信息"
				}
			]
		}
	},
	{
		path: 'keeper/business/create',
		name: "byKeeperBusinessCreate",
		component: ByKeeperBusinessCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessList",
					title: "业务申请列表"
				},
				{
					name: "byKeeperBusinessCreate",
					title: "企业管家业务申请"
				}
			]
		}
	},
	{
		path: 'keeper/business/type/list',
		name: "byKeeperBusinessTypeList",
		component: ByKeeperBusinessTypeListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessTypeList",
					title: "业务类型列表"
				}
			]
		}
	},
	{
		path: 'keeper/business/type/detail/:id',
		name: "byKeeperBusinessTypeDetail",
		component: ByKeeperBusinessTypeDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessTypeList",
					title: "业务类型列表"
				},
				{
					name: "byKeeperBusinessTypeDetail",
					title: "业务类型详情"
				}
			]
		}
	},
	{
		path: 'keeper/business/type/edit/:id',
		name: "byKeeperBusinessTypeEdit",
		component: ByKeeperBusinessTypeCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessTypeList",
					title: "业务类型列表"
				},
				{
					name: "byKeeperBusinessTypeEdit",
					title: "编辑业务类型"
				}
			]
		}
	},
	{
		path: 'keeper/business/type/create',
		name: "byKeeperBusinessTypeCreate",
		component: ByKeeperBusinessTypeCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessTypeList",
					title: "业务类型列表"
				},
				{
					name: "byKeeperBusinessTypeCreate",
					title: "创建业务类型"
				}
			]
		}
	},
	{
		path: 'keeper/business/organization/list',
		name: "byKeeperBusinessOrganizationList",
		component: ByKeeperBusinessOrganizationListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessOrganizationList",
					title: "合作机构列表"
				}
			]
		}
	},
  {
    path: 'keeper/business/organization/list/keeperBusinessTypeId',
    name: "byKeeperBusinessOrganizationIdList",
    component: ByKeeperBusinessOrganizationListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byKeeperBusinessOrganizationIdList",
          title: "合作机构列表"
        }
      ]
    }
  },
	{
		path: 'keeper/business/organization/detail/:id',
		name: "byKeeperBusinessOrganizationDetail",
		component: ByKeeperBusinessOrganizationDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessOrganizationList",
					title: "合作机构列表"
				},
				{
					name: "byKeeperBusinessOrganizationDetail",
					title: "合作机构详情"
				}
			]
		}
	},
	{
		path: 'keeper/business/organization/edit/:id',
		name: "byKeeperBusinessOrganizationEdit",
		component: ByKeeperBusinessOrganizationCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessOrganizationList",
					title: "合作机构列表"
				},
				{
					name: "byKeeperBusinessOrganizationEdit",
					title: "编辑合作机构"
				}
			]
		}
	},
	{
		path: 'keeper/business/organization/create',
		name: "byKeeperBusinessOrganizationCreate",
		component: ByKeeperBusinessOrganizationCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byKeeperBusinessOrganizationList",
					title: "合作机构列表"
				},
				{
					name: "byKeeperBusinessOrganizationCreate",
					title: "新建合作机构"
				}
			]
		}
	}
	/*新的企业管家****************************************************************************/
]

export {lbKeeperRouter, byKeeperRouter}
