import ByFinancePayInfoListView from "../../../backyard/view/finance/pay/List.vue";
import ByFinancePayInfoReminderView from "../../../backyard/view/finance/pay/Reminder.vue";
import ByFinancePayInfoDetailView from "../../../backyard/view/finance/pay/Detail.vue";
import ByFinancePayInfoCreateView from "../../../backyard/view/finance/pay/Create.vue";

import ByFinanceOtherPayListView from "../../../backyard/view/finance/other/pay/List.vue";
import ByFinanceOtherPayDetailView from "../../../backyard/view/finance/other/pay/Detail.vue";
import ByFinanceOtherPayCreateView from "../../../backyard/view/finance/other/pay/Create.vue";


import ByFinanceBillReceiptListView from "../../../backyard/view/finance/bill/receipt/List.vue";
import ByFinanceBillReceiptDetailView from "../../../backyard/view/finance/bill/receipt/Detail.vue";
import ByFinanceBillReceiptCreateView from "../../../backyard/view/finance/bill/receipt/Create.vue";

import ByFinanceElectricPayListView from "../../../backyard/view/finance/electric/pay/List.vue";
import ByFinanceElectricPayCreateView from "../../../backyard/view/finance/electric/pay/Create.vue";
import ByFinanceElectricPayDetailView from "../../../backyard/view/finance/electric/pay/Detail.vue";

import ByFinanceStatementView from "../../../backyard/view/finance/Receivable.vue";


let lbFinanceRouter = [];

let byFinanceRouter = [
	//付款信息相关
	{
		path: 'finance/pay/info/list',
		name: "byFinancePayInfoList",
		component: ByFinancePayInfoListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinancePayInfoList",
					title: "付款信息列表"
				}
			]
		}
	},
	{
		path: 'finance/pay/info/reminder',
		name: "byByFinancePayInfoReminder",
		component: ByFinancePayInfoReminderView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byByFinancePayInfoReminder",
					title: "待收款列表"
				}
			]
		}
	},
	{
		path: 'finance/pay/info/create',
		name: "byFinancePayInfoCreate",
		component: ByFinancePayInfoCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinancePayInfoList",
					title: "付款信息列表"
				},
				{
					name: "byFinancePayInfoCreate",
					title: "创建付款信息"
				}
			]
		}
	},
	{
		path: 'finance/pay/info/edit/:id',
		name: "byFinancePayInfoEdit",
		component: ByFinancePayInfoCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinancePayInfoList",
					title: "付款信息列表"
				},
				{
					name: "byFinancePayInfoEdit",
					title: "编辑付款信息"
				}
			]
		}
	},
	{
		path: 'finance/pay/info/detail/:id',
		name: "byFinancePayInfoDetail",
		component: ByFinancePayInfoDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinancePayInfoList",
					title: "付款信息列表"
				},
				{
					name: "byFinancePayInfoDetail",
					title: "付款信息详情"
				}
			]
		}
	},

  //其他付款信息
  {
    path: 'finance/other/pay/list',
    name: "byFinanceOtherPayList",
    component: ByFinanceOtherPayListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceOtherPayList",
          title: "付款信息列表"
        }
      ]
    }
  },
  {
    path: 'finance/other/pay/create',
    name: "byFinanceOtherPayCreate",
    component: ByFinanceOtherPayCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceOtherPayList",
          title: "付款信息列表"
        },
        {
          name: "byFinanceOtherPayCreate",
          title: "创建付款信息"
        }
      ]
    }
  },
  {
    path: 'finance/other/pay/edit/:id',
    name: "byFinanceOtherPayEdit",
    component: ByFinanceOtherPayCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceOtherPayList",
          title: "付款信息列表"
        },
        {
          name: "byFinanceOtherPayEdit",
          title: "编辑付款信息"
        }
      ]
    }
  },
  {
    path: 'finance/other/pay/detail/:id',
    name: "byFinanceOtherPayDetail",
    component: ByFinanceOtherPayDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceOtherPayList",
          title: "付款信息列表"
        },
        {
          name: "byFinanceOtherPayDetail",
          title: "付款信息详情"
        }
      ]
    }
  },

	//已收账款信息相关
	{
		path: 'finance/bill/receipt/list',
		name: "byFinanceBillReceiptList",
		component: ByFinanceBillReceiptListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinanceBillReceiptList",
					title: "已收账款信息列表"
				}
			]
		}
	},
	{
		path: 'finance/bill/receipt/create',
		name: "byFinanceBillReceiptCreate",
		component: ByFinanceBillReceiptCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinanceBillReceiptList",
					title: "已收账款信息列表"
				},
				{
					name: "byFinanceBillReceiptCreate",
					title: "创建已收账款信息"
				}
			]
		}
	},
	{
		path: 'finance/bill/receipt/edit/:id',
		name: "byFinanceBillReceiptEdit",
		component: ByFinanceBillReceiptCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinanceBillReceiptList",
					title: "已收账款信息列表"
				},
				{
					name: "byFinanceBillReceiptEdit",
					title: "编辑已收账款信息"
				}
			]
		}
	},
	{
		path: 'finance/bill/receipt/detail/:id',
		name: "byFinanceBillReceiptDetail",
		component: ByFinanceBillReceiptDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinanceBillReceiptList",
					title: "已收账款信息列表"
				},
				{
					name: "byFinanceBillReceiptDetail",
					title: "已收账款信息详情"
				}
			]
		}
	},
  //电费付款信息单
  {
    path: 'finance/electric/pay/list',
    name: "byFinanceElectricPayList",
    component: ByFinanceElectricPayListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceElectricPayList",
          title: "电费付款信息列表"
        }
      ]
    }
  },
  {
    path: 'finance/electric/pay/create',
    name: "byFinanceElectricPayCreate",
    component: ByFinanceElectricPayCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceElectricPayList",
          title: "电费付款信息列表"
        },
        {
          name: "byFinanceElectricPayCreate",
          title: "创建电费付款信息"
        }
      ]
    }
  },
  {
    path: 'finance/electric/pay/detail/:id',
    name: "byFinanceElectricPayDetail",
    component: ByFinanceElectricPayDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceElectricPayList",
          title: "电费付款信息列表"
        },
        {
          name: "byFinanceElectricPayDetail",
          title: "电费付款信息详情"
        }
      ]
    }
  },
  {
    path: 'finance/electric/pay/edit/:id',
    name: "byFinanceElectricPayEdit",
    component: ByFinanceElectricPayCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byFinanceElectricPayList",
          title: "电费付款信息列表"
        },
        {
          name: "byFinanceElectricPayEdit",
          title: "编辑电费付款信息"
        }
      ]
    }
  },

	{
		path: 'finance/statement',
		name: "byFinanceStatement",
		component: ByFinanceStatementView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byFinanceStatement",
					title: "应收账款"
				}
			]
		}
	}
];


export {lbFinanceRouter, byFinanceRouter}


