<template>
	<div>

		<div class="alert alert-info">
			<p>
				只需要在NbBtnDropdown中放入一个ul即可。
			</p>
			<p>
				size(选填)：默认中等大小，可填 sm或者lg
			</p>
			<p>
				color(选填): 默认default，可填 info,success,primary,warning,danger,white,default
			</p>
			<p>
				绑定事件，只需在 li下的a上绑定 @click.prevent="hello" 即可
			</p>
			<p>
				如果你希望点击了a之后，下拉单不自动收缩，那么@click.prevent.stop="hello" 即可
			</p>
			<p>
				如果你希望添加一点儿菜单出现的动画，那么只需要在ul中指定"animated fadeIn"即可。
			</p>
		</div>
		<div>
			{{content}}
		</div>

		<NbBtnDropdown name="自定义dropdown" size="sm" color="primary">
			<ul class="animated fadeIn">
				<li>
					<a @click.prevent="hello">你好</a>
				</li>
				<li>
					<a @click.prevent="world">世界</a>
				</li>
			</ul>
		</NbBtnDropdown>


	</div>

</template>
<script>

	import NbBtnDropdown from "../../../common/widget/NbBtnDropdown.vue";

	export default{
		data(){
			return {
				content: ""
			}
		},
		watch: {},
		methods: {
			hello(){
				this.content = this.content + "hello ";
			},
			world(){
				this.content = this.content + "world ";
			}
		},
		components: {
			NbBtnDropdown
		},
		mounted(){

		}
	}
</script>
