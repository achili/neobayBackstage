import ByIsSpaceNetworkView from "../../../backyard/view/ispace/network/NetWork.vue";


let byIsSpaceNetworkRouter = [
  {
    path: 'isspace/network',
    name: "byIsSpaceNetwork",
    component: ByIsSpaceNetworkView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byIsSpaceNetwork",
          title: "智能网络"
        }
      ]
    }
  }
];
export default byIsSpaceNetworkRouter


