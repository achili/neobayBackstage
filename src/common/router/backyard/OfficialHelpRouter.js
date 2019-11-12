import ByOfficialHelpListView from "../../../backyard/view/official/help/List.vue";
import ByOfficialHelpCreateView from "../../../backyard/view/official/help/Create.vue";
import ByOfficialHelpDetailView from "../../../backyard/view/official/help/Detail.vue";

let lbOfficialHelpRouter = [

];

let byOfficialHelpRouter = [
    {
        path: 'official/help/list',
        name: "byOfficialHelpList",
        component: ByOfficialHelpListView,
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    name: "byOfficialHelpList",
                    title: "帮助列表"
                }
            ]
        }
    },
    {
    path: 'official/help/create',
    name: "byOfficialHelpCreate",
    component: ByOfficialHelpCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialHelpList",
          title: "帮助列表"
        },
        {
          name: "byOfficialHelpCreate",
          title: "发布帮助"
        }
      ]
    }
  },
  {
    path: 'official/help/edit/:id',
    name: "byOfficialHelpEdit",
    component: ByOfficialHelpCreateView,
    meta: {requiresAuth: true}
  },
  {

    path: 'official/help/detail/:id',
    name: "byOfficialHelpDetail",
    component: ByOfficialHelpDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byOfficialHelpList",
          title: "帮助列表"
        },
        {
          name: "byOfficialHelpDetail",
          title: "帮助详情"
        }
      ]
    }
  }
];


export {lbOfficialHelpRouter, byOfficialHelpRouter}


