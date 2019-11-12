import ByTankList from "../../../developer/view/tank/List.vue";

let developerTankRouter = [
	{
		path: 'tank/list',
		name: "byTankList",
		component: ByTankList,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byTankList",
					title: "文件列表"
				}
			]
		}
	}
];


export default developerTankRouter;
