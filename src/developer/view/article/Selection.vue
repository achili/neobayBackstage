<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeArticle">

			<span slot="title">
				{{activeArticle.title?"#"+activeArticle.id+" "+activeArticle.title:"请选择文章..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="article in pager.articles"
			     @click.stop.prevent="clickItem(article)"
			     :class="{'bg-white':article.id !== activeArticle.id,'bg-azure':article.id === activeArticle.id}"
			     slot="cells">

				<div class="media">
					<div class="pull-left">
						<img class="img-rounded img-md" v-if="article.poster && article.poster.url" :src="article.poster.url">
					</div>

					<div class="media-body">
						<div>
							<span class="f15 nb-a">{{article.title}}</span>
						</div>
						<div class="mt5">
							<span class="mr10">#{{article.id}}</span>
							<span class="mr10">创建于:{{article.createTime | simpleDateTime}}</span>
							<span class="mr10">阅读:{{article.hit}}</span>
							<span class="mr10">作者:{{article.author}}</span>
						</div>
					</div>
				</div>


			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../common/model/base/Pager";
	import Article from "../../../common/model/article/Article";
	import NbPagerSelection from "../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(Article, 5)

			}
		},
		props: {
			activeArticle: {
				type: Article,
				required: true
			}
		},
		watch: {
			"activeArticle.id"(newVal, oldVal){
				this.httpUpdateActiveArticle();
			}
		},
		methods: {
			clickItem(article){
				this.activeArticle.render(article);
			},
			httpUpdateActiveArticle(){
				//如果传过来的activeArticle只有id没有其他内容，我们将要负责去获取其详细内容。
				if (this.activeArticle.id && !this.activeArticle.title) {
					this.activeArticle.httpDetail();
				}
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){
			this.httpUpdateActiveArticle();

		}
	}
</script>
