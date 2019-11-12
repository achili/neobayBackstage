import BySpaceRegionalListView from '../../../backyard/view/space/regional/List.vue'
import BySpaceRegionalCreateView from '../../../backyard/view/space/regional/Create.vue'
import BySpaceRegionalEditView from '../../../backyard/view/space/regional/Detail.vue'


let lbSpaceRegionalRouter = [];

let bySpaceRegionalRouter = [
  {
    path: 'space/regional/list',
    name: "bySpaceRegionalList",
    component: BySpaceRegionalListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceRegionalList",
          title: '园区地点管理'
        }
      ]
    }
  },
  {
    path: 'space/regional/create',
    name: "bySpaceRegionalCreate",
    component: BySpaceRegionalCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceRegionalList",
          title: '创建园区地点'
        }
      ]
    }
  },
  {
    path: 'space/regional/edit',
    name: "bySpaceRegionalEdit",
    component: BySpaceRegionalCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceRegionalList",
          title: '编辑园区地点'
        }
      ]
    }
  },
  {
    path: 'space/regional/detail',
    name: "bySpaceRegionalDetail",
    component: BySpaceRegionalEditView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "bySpaceRegionalList",
          title: '园区地点详情'
        }
      ]
    }
  }

];

export {lbSpaceRegionalRouter, bySpaceRegionalRouter}


