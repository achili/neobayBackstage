<template>

	<div class="by-article-detail animated fadeIn">

		<div class="row">

			<div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
				<div class="mail-box-header">
					<div class="mail-tools m-t-md">

						<h5>
							{{officialActivityApply.officialActivity.title}}
						</h5>
						<div class="f20">
							<span>报名人：{{officialActivityApply.leader}}</span>
							<span class="ml10">报名于：{{officialActivityApply.createTime | simpleDateTime}}</span>
							<span class="ml10">报名人数：{{officialActivityApply.personNum}}</span>
						</div>

					</div>
				</div>
				<div class="mail-box">

					<div class="mail-body">
						<div class="text-center" v-show="officialActivityApply.loading">
							<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
						</div>


					</div>

				</div>
			</div>


		</div>


	</div>

</template>

<script>
  import OfficialActivityApply from  "../../../../../common/model/official/OfficialActivityApply"


  export default {

    data () {
      return {
        officialActivityApply: new OfficialActivityApply()
      }
    },
    watch: {},
    components: {

    },
    methods: {
      refresh(){
        let that = this;
        this.officialActivityApply.id = this.$store.state.route.params.id;
        if (this.officialActivityApply.id) {
          this.officialActivityApply.httpDetail();
        }
      }
    },
    created(){
    },
    mounted(){
      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

	@import "../../../../../common/assets/css/global/variables";

	.enter-activity-detail {
		clear: both;
		.header-block{
			padding: 60px 0 50px 0;
			//background-color: @neobay-yellow;
			background-size: cover;
			color: white;

			//filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=@neobay-yellow,endcolorstr=blue,gradientType=0);
			//-ms-filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=@neobay-yellow,endcolorstr=blue,gradientType=0);/*IE8*/
			background:@neobay-yellow; /* 一些不支持背景渐变的浏览器 */
			background:-moz-linear-gradient(top, @neobay-light-yellow, @neobay-yellow);
			background:-webkit-gradient(linear, 0 0, 0 bottom, from(@neobay-light-yellow), to(@neobay-yellow));
			background:-o-linear-gradient(top, @neobay-light-yellow, @neobay-yellow);

			.img-line{
				width: 400px;
				height: auto;
			}
			.digest-line{
				margin-top: 20px;
				font-size: 14px;
				line-height: 21px;
				font-weight: normal;
				font-family: "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
			}
			.address-line{
				margin-top: 30px;
				font-size: 12px;
				line-height: 20px;
				color: rgba(255, 255, 255, 0.6);
			}
			.time-line{
				margin-top: 12px;
				font-size: 12px;
				line-height: 20px;
				color: rgba(255, 255, 255, 0.6);
			}
			.mark-line{
				margin-top: 20px;
				.btn-mark{
					width: 180px;
					height: 40px;
					border: 1px solid #FFFFFF;
					border-radius: 5px;
					color: #FFFFFF;
					display: block;
					font-size: 14px;
					line-height: 40px;
					text-align: center;
					margin-top: 30px;
					&:hover{
						background-color: @neobay-blue;
					}
				}
			}
		}

		.content-block{
			padding: 70px 0;
			background-color: white;
			.yellow-frame-title {

				font-size: 32px;
				text-align: center;
				position: relative;

				&:after {
					text-align: center;
					content: '';
					position: absolute;
					background-color: @neobay-yellow;
					height: 2px;
					width: 90px;
					bottom: -5px;
					left: 50%;
					margin-left: -45px;
					display: inline-block;
				}

			}
			.content-line{
				padding-top: 50px;
			}
		}
		.enter-block {
			background-color: white;
			padding: 100px 0 100px 0;

		}
	}

</style>
