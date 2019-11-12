<template>
	<div>

		<div class="alert alert-info">
			<strong class="text-danger">NbMetaSelection</strong>
			<p>有时候你只是希望从一个列表中选择一项出来，然后充填为普通字符串。不需要保留对象信息等复杂内容。</p>
			<p>比如说在入驻申请的时候选择 “国家重点支持高新技术领域”，选项来自服务器，我们希望获取一个简单字符串。</p>
			<p>这种情形下使用 <b>NbMetaSelection</b> </p>
			<p>必填参数：</p>
			<p>Clazz 指定被选择的Entity</p>
			<p>v-model 双向绑定一个变量（String）</p>
			<p>选填参数：</p>
			<p>initFilter 键值对，指定筛选条件</p>
			<p>callback 里面选择发生变化的回掉函数</p>

		</div>


		<NbMetaSelection :Clazz="EntryApplyField" v-model="content"/>

		<div class="mt20">
			实时选择情况：{{content}}
		</div>
		<div class="mt20">
			<button class="btn btn-primary" @click.stop.prevent=" content = '资源与环境技术'">
				外面改变为：资源与环境技术
			</button>
		</div>
	</div>

</template>
<script>
	import Pager from "../../../common/model/base/Pager";
	import Article from "../../../common/model/article/Article";
	import EntryApplyField from "../../../common/model/entry/apply/EntryApplyField";
	import NbMetaSelection from "../../../common/widget/NbMetaSelection.vue";

	export default{
		data(){
			return {
				EntryApplyField,
				content: "新材料技术"
			}
		},
		watch: {},
		methods: {

		},
		components: {
			NbMetaSelection
		},
		mounted(){

		}
	}


</script>
