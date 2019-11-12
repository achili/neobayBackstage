import ByMakerCardCreateView from "../../../backyard/view/maker/card/Create.vue";
import ByMakerCardDetailView from "../../../backyard/view/maker/card/Detail.vue";
import ByMakerCardListView from "../../../backyard/view/maker/card/List.vue";

let byMakerCardRouter = [
  {
    path: 'maker/card/list',
    name: 'byMakerCardList',
    component: ByMakerCardListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerCardList",
          title: "一卡通申请列表"
        }
      ]
    }
  },
  {
    path: 'maker/card/create',
    name: 'byMakerCardCreate',
    component: ByMakerCardCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerCardList",
          title: "一卡通申请列表"
        },
        {
          name: "byMakerCardCreate",
          title: "创建一卡通申请表"
        }
      ]
    }
  },
  {
    path: 'maker/card/edit',
    name: "byMakerCardEdit",
    component: ByMakerCardCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerCardList",
          title: "一卡通申请列表"
        },
        {
          name: "byMakerCardEdit",
          title: "编辑一卡通申请表"
        }
      ]
    }
  },
  {
    path: 'maker/card/detail',
    name: "byMakerCardDetail",
    component: ByMakerCardDetailView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerCardList",
          title: "一卡通申请列表"
        },
        {
          name: "byMakerCardDetail",
          title: "一卡通申请表详情"
        }
      ]
    }
  }
];

export {byMakerCardRouter}

