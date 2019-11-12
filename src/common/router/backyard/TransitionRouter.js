import TransitionTheme from "../../lobby/view/transition/TransitionTheme.vue";
import Index from "../../lobby/view/transition/index/Index.vue";


let lbTransitionRouter = [
	{
		path: '/transition',
		component: TransitionTheme,
		children: [
			{
				path: 'index',
				name: "transitionIndex",
				component: Index
			}
		]
	}
];

export {lbTransitionRouter}