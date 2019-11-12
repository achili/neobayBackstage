import QixiaodongDebug from "../../../developer/view/Qixiaodong/QixiaodongDebug.vue";

let qixiaodongDebugRouter = [
  {
    path: 'qixiaodong-debug',
    name: "qixiaodongDebug",
    component: QixiaodongDebug,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "qixiaodongDebug",
          title: "齐小东测试"
        }
      ]
    }
  }
];

export default qixiaodongDebugRouter;


