<template>
	<div>

		<div class="alert alert-info">
			<strong class="text-danger">原生态</strong>
			<p>经常我们需要从某个Pager中去选择一项出来，</p>
			<p>比如在创建房间的时候，我们需要去从楼栋的Pager中选择一个楼栋出来。</p>
			<p>有这种需求的时候，就使用NbPagerSelection</p>
		</div>

		<NbPagerSelection :pager="pager" :activeItem="activeItem" :initFilter="{'orderId':'ASC'}">

			<span slot="title">
				{{activeItem.title?activeItem.title:"请选择文章..."}}
			</span>

			<div class="mb10 p10 cursor" v-for="article in pager.articles" @click.stop.prevent="clickItem(article)"
			     :class="{'bg-white':article.id !== activeItem.id,'bg-azure':article.id === activeItem.id}"
			     slot="cells">

				<div class="media">
					<div class="pull-left">
						<img class="img-rounded img-md" v-if="article.poster && article.poster.url" :src="article.poster.url">
					</div>

					<div class="media-body">
						<div>
							<span class="f15">{{article.title}}</span>
							<span v-for="tag in article.tags" class="mr5 label label-default">{{tag}}</span>
						</div>
						<span class="mr10">#{{article.id}}</span>
						<span class="mr10">创建于:{{article.createTime | simpleDateTime}}</span>
						<span class="mr10">阅读:{{article.hit}}</span>
						<span class="mr10">作者:{{article.author}}</span>
					</div>
				</div>

			</div>

		</NbPagerSelection>


		<div class="alert alert-info mt20">
			<strong class="text-danger">封装一层</strong>
			<p>对于某个具体的实例，比如文章，我们经常需要去选择某一篇作为另一个实例的一个属性</p>
			<p>因此我们会针对某个实例进行封装</p>
			<p>下面的例子是针对Article进行封装后的控件ArticlePagerSelection</p>
		</div>

		<ArticlePagerSelection :activeArticle="activeArticle"/>

	</div>

</template>
<script>
	import Pager from "../../../common/model/base/Pager";
	import Article from "../../../common/model/article/Article";
	import NbPagerSelection from "../../../common/widget/NbPagerSelection";
	import ArticlePagerSelection from "../article/Selection.vue";

	export default{
		data(){
			return {
				pager: new Pager(Article, 5),
				activeItem: new Article(),
				activeArticle: new Article()

			}
		},
		watch: {},
		methods: {
			clickItem(article){
				this.activeItem.render(article);
			}
		},
		components: {
			NbPagerSelection,
			ArticlePagerSelection
		},
		mounted(){
			this.pager.removeFilter("keyword");
			this.pager.showFilter("orderId", false);
		}
	}


</script>
