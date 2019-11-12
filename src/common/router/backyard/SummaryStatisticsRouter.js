import BySummaryStatisticsList from "../../../backyard/view/summary/List.vue"
import BySummaryStatisticsResult from "../../../backyard/view/summary/Result.vue"
import BySummaryStatisticsAnalysis from "../../../backyard/view/summary/Analysis"
import BySummaryStatisticsChart from "../../../backyard/view/summary/Chart.vue"

let lbSummaryStatisticsRouter = [];
let bySummaryStatisticsRouter = [
  {
    path: '/by/summary/analysis',
    name: "bySummaryStatisticsAnalysis",
    component: BySummaryStatisticsAnalysis,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySummaryStatisticsAnalysis",
          title: "保存的图表分析"
        }
      ]
    }
  },
  {
    path: '/by/summary/list',
    name: "bySummaryStatisticsList",
    component: BySummaryStatisticsList,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySummaryStatisticsList",
          title: "保存的汇总统计"
        }
      ]
    }
  },
  {
    path: '/by/summary/result',
    name: "byBySummaryStatisticsResult",
    component: BySummaryStatisticsResult,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byBySummaryStatisticsResult",
          title: "汇总统计"
        }
      ]
    }
  },
  {
    path: '/by/summary/analysis/list',
    name: "bySummaryStatisticsChart",
    component: BySummaryStatisticsChart,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySummaryStatisticsChart",
          title: "图表模板"
        }
      ]
    }
  }
];

export {lbSummaryStatisticsRouter,bySummaryStatisticsRouter}
