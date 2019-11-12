import GroupInvestmentCreateView from "../../../backyard/view/investment/Create.vue";
import GroupInvestmentDetailView from "../../../backyard/view/investment/Detail.vue";
import GroupInvestmentListView from "../../../backyard/view/investment/List.vue";

let groupInvestmentRouter = [
  {
    path: 'investment/list',
    name: 'groupInvestmentList',
    component: GroupInvestmentListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupInvestmentList",
          title: "投资融资列表"
        }
      ]
    }
  },
  {
    path: 'investment/create',
    name: 'groupInvestmentCreate',
    component: GroupInvestmentCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupInvestmentList",
          title: "投资融资列表"
        },
        {
          name: "groupInvestmentCreate",
          title: "创建投资融资"
        }
      ]
    }
  },
  {
    path: 'investment/edit',
    name: "groupInvestmentEdit",
    component: GroupInvestmentCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupInvestmentList",
          title: "投资融资列表"
        },
        {
          name: "groupInvestmentEdit",
          title: "编辑投资融资"
        }
      ]
    }
  },
  {

    path: 'investment/detail',
    name: "groupInvestmentDetail",
    component: GroupInvestmentDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupInvestmentList",
          title: "投资融资列表"
        },
        {
          name: "groupInvestmentDetail",
          title: "投资融资详情"
        }
      ]
    }
  }
];

export default  groupInvestmentRouter;


