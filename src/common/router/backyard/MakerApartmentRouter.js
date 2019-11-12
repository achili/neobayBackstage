import ByMakerApartmentCreateView from "../../../backyard/view/maker/apartment/Create.vue";
import ByMakerApartmentDetailView from "../../../backyard/view/maker/apartment/Detail.vue";
import ByMakerApartmentListView from "../../../backyard/view/maker/apartment/List.vue";

let lyMakerApartmentRouter = [];

let byMakerApartmentRouter = [
  {
    path: 'maker/apartment/list',
    name: 'byMakerApartmentList',
    component: ByMakerApartmentListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerApartmentList",
          title: "人才公寓申请列表"
        }
      ]
    }
  },
  {
    path: 'maker/apartment/create',
    name: 'byMakerApartmentCreate',
    component: ByMakerApartmentCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerApartmentList",
          title: "人才公寓申请列表"
        },
        {
          name: "byMakerApartmentCreate",
          title: "创建人才公寓申请表"
        }
      ]
    }
  },
  {
    path: 'maker/apartment/edit',
    name: "byMakerApartmentEdit",
    component: ByMakerApartmentCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerApartmentList",
          title: "人才公寓申请列表"
        },
        {
          name: "byMakerApartmentEdit",
          title: "编辑人才公寓申请表"
        }
      ]
    }
  },
  {
    path: 'maker/apartment/detail',
    name: "byMakerApartmentDetail",
    component: ByMakerApartmentDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerApartmentList",
          title: "人才公寓申请列表"
        },
        {
          name: "byMakerApartmentDetail",
          title: "人才公寓申请表详情"
        }
      ]
    }
  }
];

export {lyMakerApartmentRouter,byMakerApartmentRouter}

