<template>

	<div class="index-official-star-swiper">
		<div class="carousel-swiper">
			<div class="official-star-swiper-container swiper-container">
				<div class="swiper-wrapper">
					<div v-for="url in officialStar.carouselUrls" class="swiper-slide">

						<div class="carousel-content">
							<img class="carousel-image" :src="url"/>
						</div>
					</div>

				</div>
				<div class="swiper-pagination"></div>
				<!-- 翻页箭头 -->
				<div class="swiper-button-prev swiper-button"></div>
				<div class="swiper-button-next swiper-button"></div>

			</div>
		</div>

	</div>


</template>


<script>

	import Swiper from "swiper";

	import OfficialStar from "../../../../../common/model/official/OfficialStar";
	import {startWith} from "../../../../../common/filter/str";

	export default {


		data() {
			return {
				swiper: null
			};
		},

		props: {
			officialStar: {
				type: OfficialStar,
				required: true
			}
		},
		computed: {
			host(){
				return window.location.protocol + "//" + window.location.host;
			}
		},
		watch: {},
		methods: {
			fetchDetail(){
				let that = this;


				setTimeout(function () {
					that.swiper = new Swiper('.official-star-swiper-container', {
						autoplay: 6000,
						speed: 1000,
						// Optional parameters
						direction: 'horizontal',
						loop: true,


						//翻页指示器的左右箭头
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						// 小圆点指示器
						pagination: '.swiper-pagination',
						paginationClickable: true
					});
				}, 1000);

			},
			refresh(){
			}
		},
		mounted(){
			this.fetchDetail();
		}
	};
</script>


<style lang="less" rel="stylesheet/less">

	.index-official-star-swiper {
		.swiper-container {

			.carousel-content {
				position: relative;
				padding-bottom: 35px;

				.carousel-image {
					width: 100%;
				}

			}

			.swiper-pagination-bullets {

				.swiper-pagination-bullet {

					&.swiper-pagination-bullet-active {

						background-color: #000;
					}
				}
			}
			.swiper-button-prev {
				background-image: url("../../../../../common/assets/img/lobby/index/left.png");

			}
			.swiper-button-next {
				background-image: url("../../../../../common/assets/img/lobby/index/right.png");

			}

			.swiper-button {
				opacity: 0;
				//控制渐隐渐显
				transition: opacity 0.5s;
				-webkit-transition: opacity 0.5s;
				-moz-transition: opacity 0.5s;
				animation-timing-function: ease-out;
				-webkit-animation-timing-function: ease-out;
				-moz-animation-timing-function: ease-out;

				&.swiper-button-prev {
					background-image: url("../../../../../common/assets/img/lobby/index/left.png");
				}
				&.swiper-button-next {
					background-image: url("../../../../../common/assets/img/lobby/index/right.png");
				}

			}

			&:hover {
				.swiper-button {
					opacity: 1;
				}
			}


		}
	}

</style>
