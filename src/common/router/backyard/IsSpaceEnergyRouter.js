import ByIsSpaceEnergyPointFrameView from "../../../backyard/view/ispace/energy/EnergyPointFrame";
import ByEnergyPointListView from "../../../backyard/view/ispace/energy/list/EnergyPointList";
import ByEnergyPointCreateView from "../../../backyard/view/ispace/energy/create/EnergyPointCreate";


let byIsSpaceEnergyRouter = [
  {
    path: 'ispace/energy',
    component: ByIsSpaceEnergyPointFrameView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "isSpaceEnergyList",
          title: "能耗中心"
        }
      ]
    },
    children: [
      {
        path: '',
        redirect: { name: 'isSpaceEnergyCreate' }
      },
      {
        path: 'list',
        name: "isSpaceEnergyList",
        component: ByEnergyPointListView,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              name: "isSpaceEnergyList",
              title: "设备列表"
            }
          ]
        }
      },
      {
        path: 'create',
        name: "isSpaceEnergyCreate",
        component: ByEnergyPointCreateView,
        meta: {
          requiresAuth: true,
          breadcrumbs: [
            {
              name: "isSpaceEnergyList",
              title: "能耗中心"
            },
            {
              name: "isSpaceEnergyCreate",
              title: "创建设备"
            }
          ]
        }
      }
    ]
  }
];
export default byIsSpaceEnergyRouter


