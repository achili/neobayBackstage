<template>
	<div>


		<div class="row mt20">
			<div class="col-xs-12">
				<div class="alert alert-info">
					当你需要从备选的列表中选择一个标签，而且也可以自己手动输入的时候，使用NbTags控件。
				</div>
			</div>
			<div class="col-xs-12">

				<NbTags :Clazz="OfficialArticleTag" :tags="myTags" :max="3"/>


			</div>

			<div class="col-xs-12">
				选择结果：{{myTags}}
			</div>
		</div>

		<div class="row mt20">
			<div class="col-xs-12">
				<div class="alert alert-info">
					当你需要从备选的列表中选择一个条目，同时允许自定义，使用NbTag.
				</div>
			</div>
			<div class="col-xs-12">
				<NbTag :Clazz="OfficialArticleTag" :tag="singleTag"/>
			</div>

			<div class="col-xs-12">
				选择结果：{{singleTag}}
			</div>


		</div>

	</div>

</template>
<script>

	import NbTags from "../../../common/widget/NbTags.vue";
	import NbTag from "../../../common/widget/NbTag.vue";
	import OfficialArticleTag from "../../../common/model/official/OfficialArticleTag";


	export default{
		data(){
			return {

				OfficialArticleTag,
				tags: ["人生", "这里"],
				myTags: ["零号湾"],
				singleTag: null
			}
		},
		watch: {},
		methods: {
			handleChange(){
			}
		},
		components: {
			NbTag,
			NbTags
		},
		mounted(){

		}
	}
</script>
