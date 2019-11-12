<template>
	<div class="home-star-widget-detail">
		<div class="company-detail">
			<div class="row">

				<div class="col-md-6">
					<StarCarouselView :officialStar="officialStar"/>
				</div>

				<div class="col-md-6">
					<div class="row">
						<div class="col-md-6">
							<div class="tag-block">
								<span class="tag">时间</span>
								<span class="content">{{officialStar.releaseTime | simpleDate}}</span>
							</div>

						</div>
						<div class="col-md-6">
							<div class="tag-block">
								<span class="tag">领域</span>
								<span class="content">{{officialStar.category}}</span>
							</div>
						</div>
					</div>

          <div class="row">
            <div class="col-md-6">
              <div class="tag-block">
                <span class="tag">园区地点</span>
                <span class="content">{{officialStar.spaceRegional.name}}</span>
              </div>
            </div>
          </div>

					<div class="company-intro">
						<span>项目简介</span>
					</div>

					<div v-html="officialStar.content"></div>

				</div>


			</div>
		</div>
	</div>
</template>
<script>

	import Pager from "../../../../../common/model/base/Pager";
	import StarCarouselView from "./CarouselView.vue";
	import OfficialStar from  "../../../../../common/model/official/OfficialStar"

	export default {

		data () {
			return {
			}
		},
		watch: {},
		components: {
			StarCarouselView
		},
		props: {
			officialStar: {
				type: OfficialStar,
				required: true
			}
		},
		methods: {
		},
		created(){
		},
		mounted(){

		}
	}


</script>

<style lang="less" rel="stylesheet/less">

	@import "../../../../../common/assets/css/global/variables";

	.home-star-widget-detail {

		.company-detail {
			margin-top: 50px;
			margin-bottom: 100px;

			.tag-block {
				margin-bottom: 20px;
				.tag {
					display: inline-block;
					color: white;
					text-align: center;
					font-weight: normal;
					background-color: #ffb74d;
					line-height: 23px;
					height: 25px;
					width: 24%;
					margin: 0;
					padding: 0;
				}
				.content {
					display: inline-block;
					text-align: center;
					font-weight: normal;
					border: #ffb74d 1px solid;
					line-height: 21px;
					height: 25px;
					width: 74%;
					margin: 0 0 0 -4px;
					padding: 0;
				}
			}

			.company-intro {

				margin-right: 5px;
				border-bottom: 2px solid @neobay-yellow;
				margin-bottom: 10px;

				span {
					display: inline-block;
					background-color: #ffb74d;
					color: white;
					text-align: center;
					font-weight: normal;
					line-height: 25px;
					height: 25px;
					width: 150px;
				}

			}

		}

	}
</style>

