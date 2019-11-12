<template>
	<div>

		<div class="row">
			<div class="col-xs-12">

				<p>
					NbExpanding主要用来实现Slide动画的，底层是依赖<a target="_blank" href="http://velocityjs.org/">Velocity.js</a> 实现的。
				</p>
				<p>
					NbExpanding标签中是一个slot，在这个slot上使用v-if或者v-show来控制Slide的展开或者收起。
				</p>
				<p>
					你可以使用多个NbExpanding来嵌套使用
				</p>

			</div>

			<div class="col-xs-12">

				<div class="mv10">
					<button class="btn btn-success" @click="show = !show">
						控制开关
					</button>
				</div>
				<NbExpanding>
					<div v-show="show">

						<div class="panel panel-info">
							<div class="panel-heading">
								春江花月夜 【作者】张若虚 【朝代】唐代
							</div>
							<div class="panel-body">

								<div>
									<div>春江潮水连海平，海上明月共潮生。</div>
									<div>滟滟随波千万里，何处春江无月明！</div>
									<div>江流宛转绕芳甸，月照花林皆似霰；</div>
									<div>空里流霜不觉飞，汀上白沙看不见。</div>
									<div>江天一色无纤尘，皎皎空中孤月轮。</div>
									<div>江畔何人初见月？江月何年初照人？</div>
									<div>人生代代无穷已，江月年年只相似。</div>
									<div>不知江月待何人，但见长江送流水。</div>
									<div>白云一片去悠悠，青枫浦上不胜愁。</div>
									<div>谁家今夜扁舟子？何处相思明月楼？</div>
									<div>可怜楼上月徘徊，应照离人妆镜台。</div>
									<div>玉户帘中卷不去，捣衣砧上拂还来。</div>
									<div>此时相望不相闻，愿逐月华流照君。</div>
									<div>鸿雁长飞光不度，鱼龙潜跃水成文。</div>
									<div>昨夜闲潭梦落花，可怜春半不还家。</div>
									<div>江水流春去欲尽，江潭落月复西斜。</div>
									<div>斜月沉沉藏海雾，碣石潇湘无限路。</div>
									<div>不知乘月几人归，落月摇情满江树。</div>
								</div>


								<div class="mv10">
									<button class="btn btn-success" @click="innerShow = !innerShow">
										控制开关
									</button>
								</div>
								<NbExpanding>
									<div v-show="innerShow">

										<div class="panel panel-warning">
											<div class="panel-heading">
												水调歌头·丙辰中秋 【作者】苏轼 【朝代】宋代
											</div>
											<div class="panel-body">

												<div>
													明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间？
												</div>
												<div>
													转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。
												</div>
											</div>

										</div>


									</div>
								</NbExpanding>


							</div>

						</div>


					</div>
				</NbExpanding>

			</div>

			<div class="col-xs-12">
				当NbExpanding展开后，后面的内容会自动往后排布。
			</div>

		</div>


	</div>

</template>
<script>

	import NbExpanding from "../../../common/widget/NbExpanding.vue";

	export default{
		data(){
			return {
				show: false,
				innerShow: false
			}
		},
		watch: {},
		methods: {},
		components: {
			NbExpanding
		},
		mounted(){

		}
	}
</script>
