<template>
	<span>
		<button :class="submitClass" @click="callback" :disabled="loading">
			<i :class="submitIcon" v-show="!loading"></i>
			<i class="fa fa-spinner fa-spin" v-show="loading"></i>
			{{title}}
		</button>

	</span>

</template>
<script>

	/**
	 * 该控件是任何提交的场景都能使用。
	 */
	import Base from "../../../common/model/base/Base";

	export default{
		data(){
			return {}
		},
		watch: {},
		props: {
			loading: {
				type: Boolean,
				required: true
			},
			callback: {
				type: Function,
				required: true
			},
			title: {
				type: String,
				required: false,
				"default": "提交"
			},
			submitClass: {
				type: String,
				required: false,
				"default": "btn btn-primary"
			},
			submitIcon: {
				type: String,
				required: false,
				"default": "fa fa-send"
			}
		},
		methods: {},
		components: {},
		mounted(){

		}
	}
</script>
