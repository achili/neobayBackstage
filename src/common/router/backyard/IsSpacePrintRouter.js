import ByIsSpacePrintFrameView from "../../../backyard/view/ispace/print/PrintFrame";
import ByIsSpacePrintListView from "../../../backyard/view/ispace/print/PrintList";
import ByIsPrintDetailView from "../../../backyard/view/ispace/print/PrintDetail.vue";
import ByIsPrintCreateView from "../../../backyard/view/ispace/print/PrintCreate.vue";
import ByIsPrintHistoryCreateView from "../../../backyard/view/ispace/print/PrintHistoryCreate.vue";

let byIsSpacePrintRouter = [
  {
    path: 'ispace/print',
    component: ByIsSpacePrintFrameView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "isSpacePrintList",
          title: "智能打印"
        }
      ]
    },
    children: [
      {
        path: '',
        redirect: { name: 'isSpacePrintList' }
      },
      {
        path: 'list',
        name: "isSpacePrintList",
        component: ByIsSpacePrintListView,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              name: "isSpacePrintList",
              title: "打印机列表"
            }
          ]
        }
      },

      {
        path: 'detail/:id',
        name: "byPrintDetail",
        component: ByIsPrintDetailView,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              name: "isSpacePrintList",
              title: "打印机列表"
            },
            {
              name: "byPrintDetail",
              title: "打印历史"
            }
          ]
        }
      },
      {
        path: 'printcreate',
        name: "byPrintCreate",
        component: ByIsPrintCreateView,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              name: "isSpacePrintList",
              title: "打印机列表"
            },
            {
              name: "byPrintCreate",
              title: "创建打印机"
            }
          ]
        }
      },
      {
        path: 'edit',
        name: "byPrintEdit",
        component: ByIsPrintCreateView,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              name: "isSpacePrintList",
              title: "打印机列表"
            },
            {
              name: "byPrintCreate",
              title: "修改打印机信息"
            }
          ]
        }
      },
      {
        path: 'printhistorycreate',
        name: "byPrintHistoryCreate",
        component: ByIsPrintHistoryCreateView,
        meta: {
          requiresAuth: true,
          breadcrumbs: [

            {
              name: "byPrintHistoryCreate",
              title: "添加打印文件"
            }
          ]
        }
      }
    ]
  }
];
export default byIsSpacePrintRouter
