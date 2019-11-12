<template>
	<div>


		<div class="row">
			<div class="col-xs-12">
				<div class="alert alert-info">
					<h2>点击标题栏可收缩的Panel.</h2>
					<p>可以指定 type为 default,primary,info,success,warning,danger。默认采用default样式。</p>
					<p>可以指定heading信息，用span 和slot="heading"来实现</p>
					<p>也可以指定初始状态是否是展开，默认是展开。:initShow="false"表示初始位置为关闭。</p>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6">

				<NbSlidePanel title="这里是一个最快捷的演示">
					最简单的使用方法就是这样。
				</NbSlidePanel>

				<NbSlidePanel type="warning">
					<span slot="heading">warning</span>
					<div slot="body">
						这里是default的内容样式，这里是一个非常常规的演示。
					</div>
				</NbSlidePanel>


				<NbSlidePanel type="primary">
					<span slot="heading">

						<i class="fa fa-bath"></i>
						<span>在标题栏中你一指定任意内容,包括图标</span>
					</span>
					<div slot="body">

						<div class="alert alert-danger">
							在slot=body中你同样可以指定任何的东西
						</div>

					</div>
				</NbSlidePanel>


				<NbSlidePanel type="info" title="用指定title的方式来实现">
					<div>
						<div class="alert alert-warning">
							slot默认是分配给body的，从NbSlidePanel源码中可以很清楚的看到这一点。
						</div>
					</div>
				</NbSlidePanel>


				<NbSlidePanel type="default" :initShow="false">
					<span slot="heading">
						<i class="fa fa-lock"></i>
						假如你需要一开始是闭合状态的
					</span>
					<div slot="body">
						:initShow="false"即可
					</div>
				</NbSlidePanel>

				<NbSlidePanel>
					<span slot="heading">
						<i class="fa fa-check-square-o"></i>
						有时候你需要在放置一些操作按钮
					</span>
					<span slot="actions">
						<i class="fa fa-pencil f16 olive btn-action"></i>
						<i class="fa fa-trash f16 text-danger btn-action"></i>
					</span>
					<div slot="body">
						在slot=actions 中指定操作按钮即可。
					</div>
				</NbSlidePanel>

				<NbSlidePanel type="danger">
					<span slot="heading" class="f16">
						<i class="fa fa-snowflake-o"></i>
						有时候我们需要让标题更大些
					</span>
					<div slot="body">
						这个实现起来也很简单，直接在slot为heading的上面指定字体大小即可。
					</div>
				</NbSlidePanel>

			</div>


		</div>


	</div>

</template>
<script>

	import NbSlidePanel from "../../../common/widget/NbSlidePanel.vue";


	export default{
		data(){
			return {
				content1: "",
				content2: ""
			}
		},
		watch: {},
		methods: {},
		components: {
			NbSlidePanel
		},
		mounted(){

		}
	}
</script>
