<template>
	<div>

		<div class="mb20">
			<div class="alert alert-info">
				1. 这里演示一个最简单的Tab，你可以通过initActiveTab来指定哪个处于激活状态，默认会激活第一个标签。
			</div>
			<div>
				<NbTabs :initActiveTab="2">
					<NbTabPanel label="First tab">
						第一标签
					</NbTabPanel>
					<NbTabPanel label="Second tab">
						第二标签
					</NbTabPanel>
					<NbTabPanel label="Third tab">
						第三标签
					</NbTabPanel>
				</NbTabs>
			</div>
		</div>

		<div class="mb20">

			<div class="alert alert-success">
				<p>
					2. 如果需要一个更多的快捷指示器，那么只需要用slot="more"来指定相应内容即可。同时如果你指定tab点击的回掉函数，请打开控制台查看。
				</p>
			</div>
			<div>
				<NbTabs :tabSelectedCallback="tabSelected">
				<span @click.stop.prevent="" slot="more">
					更多 <i class="fa fa-caret-square-o-right"></i>
				</span>
					<NbTabPanel label="First tab">
						First tab content
					</NbTabPanel>
					<NbTabPanel label="Second tab">
						Second tab content
					</NbTabPanel>
					<NbTabPanel label="Third tab">
						Third tab content
					</NbTabPanel>
				</NbTabs>
			</div>

		</div>

		<div class="mb20">

			<div class="alert alert-danger">
				<p>
					3. 有时候你希望鼠标一上去就进行切换，同时可能你需要tab的样式是黄色边框型的,同时你也希望主色调变成蓝色。
				</p>
			</div>
			<div>
				<NbTabs :triggerHover="true" :borderStyle="true" :blueTheme="true">
					<NbTabPanel label="First tab">
						First tab content
					</NbTabPanel>
					<NbTabPanel label="Second tab">
						Second tab content
					</NbTabPanel>
					<NbTabPanel label="Third tab">
						Third tab content
					</NbTabPanel>
				</NbTabs>
			</div>

		</div>

		<div class="mb20">

			<div class="alert alert-warning">
				<p>
					4. 有时候你希望设置显示与隐藏。或者添加与删除。
				</p>
			</div>
			<div>
				<NbTabs :borderStyle="true" :blueTheme="true">
					<NbTabPanel label="First tab">
						First tab content
					</NbTabPanel>
					<NbTabPanel :show="showTab2" label="Second tab">
						Second tab content
					</NbTabPanel>
					<NbTabPanel label="Third tab">
						Third tab content
					</NbTabPanel>
					<NbTabPanel v-for="(item,index) in moreTabs" :key="index" :label="'More Tab' + index">
						This is more tab {{index}}
					</NbTabPanel>

				</NbTabs>
			</div>

			<div>
				<input type="checkbox" v-model="showTab2"/>
				显示tab2的开关
			</div>
			<div>
				<button class="btn btn-primary" @click.stop.prevent="addTab">加一个Tab</button>
				<button class="btn btn-primary" @click.stop.prevent="removeTab">减一个Tab</button>
			</div>

		</div>


	</div>


</template>
<script>

	import NbTabs from "../../../common/widget/NbTabs.vue";
	import NbTabPanel from "../../../common/widget/NbTabPanel.vue";
	export default{
		data(){
			return {
				showTab2: false,
				moreTabs: []
			}
		},
		watch: {},
		methods: {
			tabSelected(name){
			},
			addTab(){
				this.moreTabs.push("1");
			},
			removeTab(){
				this.moreTabs.pop();
			}
		},
		components: {
			NbTabs,
			NbTabPanel
		},
		mounted(){

		}
	}
</script>
