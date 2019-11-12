<template>
	<div class="row home-article-list-cell">

		<div class="col-xs-12">
			<div class="media">
				<div class="pull-right">
					<div class="poster-block" :style="'background-image:url('+officialArticle.posterUrl+')'"
					     @click.stop.prevent="open('/home/article/' + officialArticle.id)"
					></div>
				</div>
				<div class="media-body">
					<div class="cell-title" @click.stop.prevent="open('/home/article/' + officialArticle.id)">
						{{officialArticle.title}}
					</div>
					<div class="cell-description">
						{{officialArticle.digest}}
					</div>
					<div class="cell-content">

						<span class="type-span" @click.stop.prevent="clickType(officialArticle.type)">
						 <i class="fa fa-th-list"></i> {{officialArticle.getTypeName()}}
						</span>

						<span class="ml10">
							<span class="tag-span" v-for="tag in officialArticle.tags">
								<i class="fa fa-tags"></i>
								<span @click.stop.prevent="clickTag(tag)">
									{{tag}}
								</span>
							</span>
						</span>


						<span class="ml10">
						 <i class="fa fa-clock-o"></i> {{officialArticle.releaseTime | humanTime}}
						</span>


					</div>
				</div>

			</div>

		</div>

	</div>
</template>

<script>
	import OfficialArticle from  "../../../../common/model/official/OfficialArticle";
	import NbTank from "../../../../common/widget/NbTank.vue";
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";

	export default {
		data () {
			return {}
		},
		components: {
			NbTank,
			NbSlidePanel
		},
		props: {
			officialArticle: {
				type: OfficialArticle,
				required: true
			},
			tagClickCallback: {
				type: Function,
				required: false
			},
			typeClickCallback: {
				type: Function,
				required: false
			}
		},
		methods: {
			clickTag(tag){
				if (typeof this.tagClickCallback === "function") {
					this.tagClickCallback(tag);
				}
			},
			clickType(type){
				if (typeof this.typeClickCallback === "function") {
					this.typeClickCallback(type);
				}
			},
			open(href){
				window.open(href);
			}
		},
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "../../../../common/assets/css/global/variables";

	.home-article-list-cell {

		.media {

			padding: 20px 0;
			border-bottom: 1px solid #eeeeee;

			.poster-block {

				background-position: center;
				background-size: cover;
				width: 150px;
				height: 100px;
				cursor: pointer;
				&:hover {
					color: @neobay-yellow;
				}
			}

			.cell-title, .tag-span, .type-span {
				cursor: pointer;
				&:hover {
					color: @neobay-yellow;
				}
			}
			.cell-description {
				margin: 15px 0;
			}

		}

	}

</style>


