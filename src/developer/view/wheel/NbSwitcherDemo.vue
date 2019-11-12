<template>
	<div>

		<div>
			<NbSwitcher v-model="untoggle" type="info" size="lg"></NbSwitcher>
		</div>
		<div>
			{{untoggle}}
		</div>


		<div>
			<NbSwitcher v-model="untoggle" type="primary" size="sm"></NbSwitcher>
		</div>
		<div>
			{{untoggle}}
		</div>

		<div>
			<NbSwitcher v-model="toggle" type="success" :callback="changeMethod"></NbSwitcher>
		</div>
		<div>
			{{toggle}}
		</div>

		<div>
			<NbSwitcher v-model="toggle" :disabled="true" type="success" :callback="changeMethod"></NbSwitcher> 禁用状态
		</div>
		<div>
			{{toggle}}
		</div>



	</div>
</template>
<script>
	import NbSwitcher from "../../../common/widget/NbSwitcher.vue";
	export default{
		data(){
			return {
				toggle: true,
				untoggle: false
			}
		},
		watch: {
			"toggle"(newValue, oldValue){
			}
		},
		methods: {
			changeMethod(newVal){
			}
		},
		components: {
			NbSwitcher
		}
	}


</script>
