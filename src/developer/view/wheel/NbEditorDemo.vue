<template>
	<div>


		<div class="row">
			<div class="col-xs-12">
				<div class="alert alert-info">
					<h1>Powered by WangEditor.</h1>
				</div>
			</div>


		</div>


		<div class="row">
			<div class="col-xs-12">

				<div class="bg-white">
					<NbEditor v-model="content1" height="250px"/>
				</div>

			</div>
			<div class="col-xs-12" style="word-wrap: break-word">
				{{content1}}
			</div>

			<div class="col-xs-12 mt10">
				双向绑定文本框
			</div>
			<div class="col-xs-12">
				<textarea v-model="content1" rows="6" class="form-control"></textarea>
			</div>



		</div>


		<div class="row mt20">
			<div class="col-xs-12">

				<div class="bg-white">
					<NbEditor v-model="content2" height="250px"/>
				</div>

			</div>
			<div class="col-xs-12" style="word-wrap: break-word">
				{{content2}}
			</div>
		</div>


	</div>

</template>
<script>

	import NbEditor from "../../../common/widget/NbEditor.vue";


	export default{
		data(){
			return {
				content1: "",
				content2: ""
			}
		},
		watch: {},
		methods: {},
		components: {
			NbEditor
		},
		mounted(){

		}
	}
</script>
