import ByCarouselCreateView from "../../../backyard/view/official/carousel/Create.vue";
import ByCarouselListView from "../../../backyard/view/official/carousel/List.vue";


let lbCarouselRouter = [];

let byCarouselRouter = [
	{
		path: 'official/carousel/list',
		name: "byCarouselList",
		component: ByCarouselListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byCarouselList",
					title: "轮播图列表"
				}
			]
		}
	},
	{
		path: 'official/carousel/create',
		name: "byCarouselCreate",
		component: ByCarouselCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byCarouselList",
					title: "轮播图列表"
				},
				{
					name: "byCarouselCreate",
					title: "创建轮播图"
				}
			]
		}
	},
	{
		path: 'official/carousel/edit/:id',
		name: "byCarouselEdit",
		component: ByCarouselCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byCarouselList",
					title: "轮播图列表"
				},
				{
					name: "byCarouselEdit",
					title: "编辑轮播图"
				}
			]
		}
	}
];


export {lbCarouselRouter, byCarouselRouter}


