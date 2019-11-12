import ByIndexView from '../../../backyard/view/index/Index.vue'


let groupRouter = [
  {
    path: '',
    redirect: { name: 'groupIndex' }
  },
  {
    path: 'index',
    name: "groupIndex",
    component: ByIndexView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupIndex",
          title: "项目中心"
        }
      ]
    }
  }

];


export default groupRouter


