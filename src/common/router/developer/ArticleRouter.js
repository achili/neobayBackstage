import ArticleListView from "../../../developer/view/article/List.vue";
import ArticleCreateView from "../../../developer/view/article/Create.vue";
import ArticleDetailView from "../../../developer/view/article/Detail.vue";

import ArticleTagCreate from "../../../developer/view/article/tag/Create.vue";
import ArticleTagDetail from "../../../developer/view/article/tag/Detail.vue";
import ArticleTagList from "../../../developer/view/article/tag/List.vue";


let articleRouter = [
	{
		path: 'article/list',
		name: "articleList",
		component: ArticleListView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "articleList",
					title: "文章列表"
				}
			]
		}
	},
	{
		path: 'article/create',
		name: "articleCreate",
		component: ArticleCreateView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "articleList",
					title: "文章列表"
				},
				{
					name: "articleCreate",
					title: "发布文章"
				}
			]
		}
	},
	{
		path: 'article/edit/:id',
		name: "articleEdit",
		component: ArticleCreateView,
		meta: {requiresAuth: true}
	},
	{

		path: 'article/detail/:id',
		name: "articleDetail",
		component: ArticleDetailView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "articleList",
					title: "文章列表"
				},
				{
					name: "articleDetail",
					title: "文章详情"
				}
			]
		}
	},
	{
		path: 'article/tag/list',
		name: "articleTagList",
		component: ArticleTagList,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "articleTagList",
					title: "标签列表"
				}
			]
		}
	},
	{
		path: 'article/tag/create',
		name: "articleTagCreate",
		component: ArticleTagCreate,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "articleTagList",
					title: "标签列表"
				},
				{
					name: "articleTagCreate",
					title: "发布标签"
				}
			]
		}
	},
	{
		path: 'article/tag/edit/:id',
		name: "articleTagEdit",
		component: ArticleTagCreate,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "articleList",
					title: "文章列表"
				},
				{
					name: "articleEdit",
					title: "编辑文章"
				}
			]
		}
	},
	{

		path: 'article/tag/detail/:id',
		name: "articleTagDetail",
		component: ArticleTagDetail,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "articleTagList",
					title: "标签列表"
				},
				{
					name: "articleTagDetail",
					title: "标签详情"
				}
			]
		}
	}
];


export default articleRouter;


