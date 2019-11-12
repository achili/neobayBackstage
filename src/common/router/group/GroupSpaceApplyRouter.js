import GroupNurseryApplyListView from "../../../backyard/view/space/apply/List.vue";
import GroupNurseryApplyDetailView from "../../../backyard/view/space/apply/Detail.vue";
import GroupNurseryApplyCreateView from "../../../backyard/view/space/apply/Create.vue";

import GroupProtocolSpaceListView from "../../../backyard/view/protocol/space/List.vue";
import GroupProtocolSpaceDetailView from "../../../backyard/view/protocol/space/Detail.vue";

import GroupProtocolIncubatorListView from "../../../backyard/view/protocol/incubator/List.vue";
import GroupProtocolIncubatorDetailView from "../../../backyard/view/protocol/incubator/Detail.vue";

import GroupFinancePayInfoDetailView from "../../../backyard/view/finance/pay/Detail.vue";
import GroupFinancePayInfoListView from "../../../backyard/view/finance/pay/List.vue";

import GroupFinanceElectricPayDetailView from "../../../backyard/view/finance/electric/pay/Detail";
import GroupFinanceElectricPayListView from "../../../backyard/view/finance/electric/pay/List.vue";

import GroupFinanceOtherPayDetailView from "../../../backyard/view/finance/other/pay/Detail.vue";
import GroupFinanceOtherPayListView from "../../../backyard/view/finance/other/pay/List.vue";


let groupNurseryRouter = [
  {
    path: 'space/apply/list',
    name: "groupNurseryApplyList",
    component: GroupNurseryApplyListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupNurseryApplyList",
          title: "创业空间申请列表"
        }
      ]
    }
  },
  {
    path: 'space/apply/create',
    name: "groupNurseryApplyCreate",
    component: GroupNurseryApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupNurseryApplyList",
          title: "创业空间申请列表"
        },
        {
          name: "groupNurseryApplyCreate",
          title: "新建创业空间申请"
        }
      ]
    }
  },

  {
    path: 'space/apply/edit',
    name: "groupNurseryApplyEdit",
    component: GroupNurseryApplyCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupNurseryApplyList",
          title: "创业空间申请列表"
        },
        {
          name: "groupNurseryApplyEdit",
          title: "创业空间申请修改"
        }
      ]
    }
  },
  {
    path: 'space/apply/detail',
    name: "groupNurseryApplyDetail",
    component: GroupNurseryApplyDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupNurseryApplyList",
          title: "创业空间申请列表"
        },
        {
          name: "groupNurseryApplyDetail",
          title: "创业空间申请详情"
        }
      ]
    }
  },
  {
    path: 'protocol/space/list',
    name: "groupProtocolSpaceList",
    component: GroupProtocolSpaceListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProtocolSpaceList",
          title: "租赁协议列表"
        }
      ]
    }
  },
  {
    path: 'protocol/space/detail/:id',
    name: "groupProtocolSpaceDetailView",
    component: GroupProtocolSpaceDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProtocolSpaceList",
          title: "租赁协议列表"
        },
        {
          name: "groupProtocolSpaceDetailView",
          title: "租赁协议详情"
        }
      ]
    }
  },
  {
    path: 'protocol/incubator/list',
    name: "groupProtocolIncubatorList",
    component: GroupProtocolIncubatorListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProtocolIncubatorList",
          title: "孵化协议列表"
        }
      ]
    }
  },
  {
    path: 'protocol/incubator/detail/:id',
    name: "groupProtocolIncubatorDetail",
    component: GroupProtocolIncubatorDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupProtocolIncubatorList",
          title: "孵化协议列表"
        },
        {
          name: "groupProtocolIncubatorDetail",
          title: "孵化协议详情"
        }
      ]
    }
  },
  {
    path: 'finance/pay/info/list',
    name: "groupFinancePayInfoList",
    component: GroupFinancePayInfoListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupFinancePayInfoList",
          title: "付款信息列表"
        }
      ]
    }
  },
  {
    path: 'finance/pay/info/detail/:id',
    name: "groupFinancePayInfoDetail",
    component: GroupFinancePayInfoDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupFinancePayInfoList",
          title: "付款信息列表"
        },
        {
          name: "groupFinancePayInfoDetail",
          title: "付款信息详情"
        }
      ]
    }
  },
  //电费
  {
    path: 'finance/electric/pay/list',
    name: "groupFinanceElectricPayList",
    component: GroupFinanceElectricPayListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupFinanceElectricPayList",
          title: "付款信息列表"
        }
      ]
    }
  },
  {
    path: 'finance/electric/pay/detail/:id',
    name: "groupFinanceElectricPayDetail",
    component: GroupFinanceElectricPayDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupFinanceElectricPayList",
          title: "付款信息列表"
        },
        {
          name: "groupFinanceElectricPayDetail",
          title: "付款信息详情"
        }
      ]
    }
  },
  //其他
  {
    path: 'finance/other/pay/list',
    name: "groupFinanceOtherPayList",
    component: GroupFinanceOtherPayListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupFinanceOtherPayList",
          title: "付款信息列表"
        }
      ]
    }
  },
  {
    path: 'finance/other/pay/detail/:id',
    name: "groupFinanceOtherPayDetail",
    component: GroupFinanceOtherPayDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupFinanceOtherPayList",
          title: "付款信息列表"
        },
        {
          name: "groupFinanceOtherPayDetail",
          title: "付款信息详情"
        }
      ]
    }
  }
];


export default groupNurseryRouter;
