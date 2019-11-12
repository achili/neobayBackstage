<template>
	<div>

		<div class="alert alert-info">
			如果你希望你的内容能够翻转。那么就使用NbFlip吧。翻转将在slot="front" 和 slot="back"中进行。
			<p>
				<span class="text-danger bold">注意：</span> 如果正反的高度不一致，那么控件将以slot="back"的高度为准。
				当然你可以通过指定 flipped为true或false来决定一开始显示哪一面。
			</p>
		</div>

		<NbFlip v-model="flipped">
			<NbSlidePanel type="primary" slot="front">
					<span slot="heading">
						<i class="fa fa-moon-o"></i>
						静夜思
					</span>
				<span slot="actions">
						<i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					</span>
				<div slot="body">
					<p>床前明月光，</p>
					<p>疑是地上霜。</p>
					<p>举头望明月，</p>
					<p>低头思故乡。</p>
					<div class="col-xs-12">
						<p>孩子哇哇哭。</p>
					</div>

					<div class="form-group clearfix">
						<label class="col-md-2 control-label">当前状态</label>

						<div class="col-md-10">
							<span class="label label-danger">特殊标签</span>
						</div>
					</div>

				</div>
			</NbSlidePanel>
			<NbSlidePanel type="warning" slot="back">
					<span slot="heading">
						<i class="fa fa-google-wallet"></i>
						草 / 赋得古原草送别
					</span>
				<span slot="actions">
						<i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					</span>
				<div slot="body">
					<p>离离原上草，</p>
					<p>一岁一枯荣。</p>
					<p>野火烧不尽，</p>
					<p>春风吹又生。</p>
					<p>远芳侵古道，</p>
					<p>晴翠接荒城。</p>
					<p>又送王孙去，</p>
					<p>萋萋满别情。</p>
				</div>
			</NbSlidePanel>
		</NbFlip>

		<NbSlidePanel type="primary" slot="back">
			<span slot="heading">
				<i class="fa fa-google-wallet"></i>
				占位的Panel
			</span>
			<div slot="body">
				<h1>这个panel放在这里是想说，下面的内容的位置关系。</h1>
				<div class="h400 bg-azure">

				</div>
			</div>
		</NbSlidePanel>

	</div>

</template>
<script>

	import NbFlip from "../../../common/widget/NbFlip.vue";
	import NbSlidePanel from "../../../common/widget/NbSlidePanel.vue";

	export default{
		data(){
			return {
				flipped: true
			}
		},
		watch: {},
		methods: {},
		components: {
			NbFlip,
			NbSlidePanel
		},
		mounted(){

		}
	}
</script>
