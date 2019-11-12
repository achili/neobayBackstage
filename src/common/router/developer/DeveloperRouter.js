import index from "../../../developer/view/index/index.vue";

let developerRouter = [
  {
    path: '',
    redirect: { name: 'developerIndex' }
  },
  {
    path: 'index',
    name: "developerIndex",
    component: index,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "developerIndex",
          title: "开发者中心"
        }
      ]
    }
  }
];

export default developerRouter;


