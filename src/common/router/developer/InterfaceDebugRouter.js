import List from "../../../developer/view/guardTest/List.vue";

let interfaceDebugRouter =  [

  {
    path: 'guard/test/list',
    name: "developerGuardTest",
    component: List,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "developerGuardTest",
          title: "门禁接口测试"
        }
      ]
    }
  }
];

export default interfaceDebugRouter;


