import ByMakerCarouselCreateView from "../../../backyard/view/maker/carousel/Create.vue";
import ByMakerCarouselListView from "../../../backyard/view/maker/carousel/List.vue";


let lbMakerCarouselRouter = [];

let byMakerCarouselRouter = [
  {
    path: 'maker/carousel/list',
    name: "byMakerCarouselList",
    component: ByMakerCarouselListView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerCarouselList",
          title: "轮播图列表"
        }
      ]
    }
  },
  {
    path: 'maker/carousel/create',
    name: "byMakerCarouselCreate",
    component: ByMakerCarouselCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerCarouselList",
          title: "轮播图列表"
        },
        {
          name: "byMakerCarouselCreate",
          title: "创建轮播图"
        }
      ]
    }
  },
  {
    path: 'maker/carousel/edit/:id',
    name: "byMakerCarouselEdit",
    component: ByMakerCarouselCreateView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "byMakerCarouselList",
          title: "轮播图列表"
        },
        {
          name: "byMakerCarouselEdit",
          title: "编辑轮播图"
        }
      ]
    }
  }
];


export {lbMakerCarouselRouter, byMakerCarouselRouter}


