import ByInvestmentCreateView from "../../../backyard/view/investment/Create.vue";
import ByInvestmentDetailView from "../../../backyard/view/investment/Detail.vue";
import ByInvestmentListView from "../../../backyard/view/investment/List.vue";

let byInvestmentRouter = [
  {
    path: 'investment/list',
    name: 'byInvestmentList',
    component: ByInvestmentListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byInvestmentList",
          title: "投资列表"
        }
      ]
    }
  },
  {
    path: 'investment/create',
    name: 'byInvestmentCreate',
    component: ByInvestmentCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byInvestmentList",
          title: "投资申请列表"
        },
        {
          name: "byInvestmentCreate",
          title: "创建投资申请表"
        }
      ]
    }
  },
  {
    path: 'investment/edit',
    name: "byInvestmentEdit",
    component: ByInvestmentCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byInvestmentList",
          title: "投资申请列表"
        },
        {
          name: "byInvestmentEdit",
          title: "编辑投资申请表"
        }
      ]
    }
  },
  {
    path: 'investment/detail',
    name: "byInvestmentDetail",
    component: ByInvestmentDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byInvestmentList",
          title: "投资申请列表"
        },
        {
          name: "byInvestmentDetail",
          title: "投资申请表详情"
        }
      ]
    }
  }
];

export {byInvestmentRouter}

