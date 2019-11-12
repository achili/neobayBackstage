import BySpaceInvestmentListView from '../../../backyard/view/demand/List.vue'

let lbSpaceInvestmentRouter = [];

let bySpaceInvestmentRouter = [
  {
    path: 'space/investment/list',
    name: "bySpaceInvestmentList",
    component: BySpaceInvestmentListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceInvestmentList",
          title: '空间需求管理'
        }
      ]
    }
  }

];

export {lbSpaceInvestmentRouter, bySpaceInvestmentRouter}


