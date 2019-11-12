import ByExportMetaListView from "../../../backyard/view/export/meta/List.vue";
import ByExportMetaCreateView from "../../../backyard/view/export/meta/Create.vue";
import ByExportMetaDetailView from "../../../backyard/view/export/meta/Detail.vue";


let lbExportMetaRouter = [];

let byExportMetaRouter = [
  {
    path: 'export/meta/list',
    name: 'byExportMetaList',
    component: ByExportMetaListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byExportMetaList',
          title: '导出模板列表'
        }
      ]
    }
  },

  {
    path: 'export/meta/create',
    name: 'byExportMetaCreate',
    component: ByExportMetaCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byExportMetaList',
          title: '导出模板列表'
        },
        {
          name: 'byExportMetaCreate',
          title: '创建导出模板'
        }
      ]
    }
  },

  {
    path: 'export/meta/edit/:id',
    name: "byExportMetaEdit",
    component: ByExportMetaCreateView,
    meta: {requiresAuth: true}
  },

  {
    path: 'export/meta/detail/:id',
    name: 'byExportMetaDetail',
    component: ByExportMetaDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: 'byExportMetaList',
          title: '导出模板列表'
        },
        {
          name: 'byExportMetaCreate',
          title: '创建导出模板'
        }
      ]
    }
  }

]

export {lbExportMetaRouter, byExportMetaRouter}
