<template>
	<div>

		<div class="row">
			<div class="col-xs-12">

				<NbTimePicker v-model="time"/>
			</div>
			<div class="col-xs-12">
				<h1>
					{{time | simpleDateTime}}
				</h1>

			</div>

		</div>


	</div>

</template>
<script>

	import NbTimePicker from "../../../common/widget/NbTimePicker";

	export default{
		data(){
			return {
				time: new Date()
			}
		},
		watch: {},
		methods: {},
		components: {
			NbTimePicker
		},
		mounted(){

		}
	}
</script>
