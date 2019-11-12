import ByTorchStatisticsCreateView from "../../../backyard/view/torch/2017/Create.vue";
import GroupTorchCreateView from "../../../backyard/view/torch/2018/Create.vue";

let groupTorchRouter = [
  {
    path: 'torch2017/create',
    name: 'groupTorch2017Create',
    component: ByTorchStatisticsCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupTorch2017Create",
          title: "火炬统计"
        }
      ]
    }
  },
  {
    path: 'torch2018/create',
    name: 'groupTorch2018Create',
    component: GroupTorchCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupTorch2018Create",
          title: "火炬统计"
        }
      ]
    }
  }
];

export default  groupTorchRouter;
