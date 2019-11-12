import List from "../../../developer/view/printTest/List.vue";

let printDebugRouter =  [

  {
    path: 'print/test/list',
    name: "developerPrintTest",
    component: List,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "developerPrintTest",
          title: "打印机接口测试"
        }
      ]
    }
  }
];

export default printDebugRouter;


