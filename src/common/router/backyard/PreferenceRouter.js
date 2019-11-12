import ByPreferenceEdit from "../../../backyard/view/preference/Edit.vue";
import ByPreferenceDetail from "../../../backyard/view/preference/Detail.vue";

let lbPreferenceRouter = [];

let byPreferenceRouter = [
	{
		path: 'preference/edit',
		name: "byPreferenceEdit",
		component: ByPreferenceEdit,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byPreferenceDetail",
					title: "系统设置"
				},
				{
					name: "byPreferenceEdit",
					title: "修改系统设置"
				}
			]
		}
	},
	{
		path: 'preference/detail',
		name: "byPreferenceDetail",
		component: ByPreferenceDetail,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "byPreferenceDetail",
					title: "系统设置"
				}
			]
		}
	}
];


export {lbPreferenceRouter, byPreferenceRouter}


