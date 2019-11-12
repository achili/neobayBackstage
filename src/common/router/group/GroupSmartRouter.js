import groupSmartPrintListView from "../../../backyard/view/smart/print/List.vue";
import groupSmartPrintCreateView from "../../../backyard/view/smart/print/Create.vue";


let groupSmartRouter = [
  {
    path: 'smart/print/list',
    name: 'groupSmartPrintList',
    component: groupSmartPrintListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupSmartPrintList",
          title: "打印机列表"
        }
      ]
    }
  },
  {
    path: 'smart/print/create/:id',
    name: "groupSmartPrintCreate",
    component: groupSmartPrintCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "groupSmartPrintList",
          title: "打印机列表"
        },
        {
          name: "groupSmartPrintCreate",
          title: "创建打印文件"
        }
      ]
    }
  }
];

export default  groupSmartRouter;


