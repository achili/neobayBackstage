<template>
	<div>


		<div class="row">
			<div class="col-xs-12">
				<div class="alert alert-info">
					<p>Powered by <a target="_blank" href="http://codemirror.net">CodeMirror</a>.</p>
				</div>
			</div>
		</div>


		<div class="row">
			<div class="col-xs-12">
				<label>代码编辑框：</label>
			</div>
			<div class="col-xs-12 mt10">

				<NbCodeMirror v-model="content1"/>

			</div>

			<div class="col-xs-12 mt20">
				<label>预览框（不可编辑）：</label>
			</div>

			<div class="col-xs-12 mt10">
				<NbCodeMirror v-model="content1" :readOnly="true"/>
			</div>

			<div class="col-xs-12 mt20">
				<label>Html渲染效果：</label>
			</div>
			<div class="col-xs-12 mt10" style="word-wrap: break-word">
				<div v-html="content1"></div>
			</div>

		</div>

	</div>

</template>
<script>

	import NbCodeMirror from "../../../common/widget/NbCodeMirror.vue";


	export default{
		data(){
			return {
				content1: "<h1>Good! Very good.</h1>",
				content2: ""
			}
		},
		watch: {},
		methods: {},
		components: {
			NbCodeMirror
		},
		mounted(){

		}
	}
</script>
