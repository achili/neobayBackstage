<template>
	<div class="space-seat-west-view animated fadeIn">

		<h1>{{title}}</h1>
		<div class="text-right mb10">
			<button class="btn btn-primary" @click.stop.prevent="exchange" :disabled="pager.loading">
				<i class="fa fa-exchange" v-show="!pager.loading"></i>
				<i class="fa fa-spinner fa-spin" v-show="pager.loading"></i>
				<span>{{btnTitle}}</span>
			</button>
		</div>
		<div class="text-center" v-show="pager.loading">
			<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
		</div>
		<div ref="graph" class="graph-block" v-show="!pager.loading"></div>

	</div>
</template>

<script>
	import {Notification} from 'element-ui';
	import SpaceSeat from  "../../../../common/model/space/SpaceSeat"
	import Pager from  "../../../../common/model/base/Pager"
	import * as d3 from "d3";
	import WestGraph from "./widget/WestGraph";
	import EastGraph from "./widget/EastGraph";

	export default{
		data(){
			return {
				pager: new Pager(SpaceSeat, 120),
				//以west为主导
				westMode: true,
				westSpaceSeats: null,
				eastSpaceSeats: null,
				westGraph: new WestGraph(),
				eastGraph: new EastGraph()
			}
		},
		computed: {
			title(){
				if (this.westMode) {
					return "2号楼1楼西侧平面布局图";
				} else {
					return "2号楼1楼东侧平面布局图";
				}
			},
			btnTitle(){
				if (this.westMode) {
					return "东侧工位";
				} else {
					return "西侧工位";
				}
			}

		},
		components: {},
		props: {
			spaceSeats: {
				type: Array,
				required: false,
				"default": function () {
					return [];
				},
				validator: function (value) {
					if (!value) {
						console.error("不能为空");
						return false;
					}

					value.forEach(spaceSeat => {
						spaceSeat.selected = true;
					});
					return true;
				}
			}
		},
		watch: {
			"spaceSeats"(newVal, oldVal){

			}
		},
		methods: {
			exchange(){
				this.westMode = !this.westMode;
				this.refresh();
			},
			refreshWestGraph(){
				let that = this;

				if (!that.westSpaceSeats) {
					this.pager.setFilter("type", SpaceSeat.prototype.Type.WEST);
					this.pager.httpFastPage(function (response) {
						that.westSpaceSeats = that.pager.spaceSeats;
						that.westGraph.draw(d3.select(that.$refs.graph), that.westSpaceSeats);
						that.westGraph.updateSelectedSpaceSeats(that.spaceSeats);
					});
				} else {
					that.westGraph.draw(d3.select(that.$refs.graph), that.westSpaceSeats);
				}

			},
			refreshEastGraph(){
				let that = this;
				this.pager.setFilter("type", SpaceSeat.prototype.Type.EAST);

				if (!that.eastSpaceSeats) {
					this.pager.httpFastPage(function (response) {
						that.eastSpaceSeats = that.pager.spaceSeats;
						that.eastGraph.draw(d3.select(that.$refs.graph), that.eastSpaceSeats);
						that.eastGraph.updateSelectedSpaceSeats(that.spaceSeats);
					});
				} else {
					that.eastGraph.draw(d3.select(that.$refs.graph), that.eastSpaceSeats);
				}

			},
			refresh(force = false){

				if (force) {
					this.westSpaceSeats = null;
					this.eastSpaceSeats = null;
				}

				if (this.westMode) {
					this.refreshWestGraph();
				} else {
					this.refreshEastGraph();
				}
			},
			selectCallback(){
				let that = this;

				//清空现有的。
				that.spaceSeats.splice(0, that.spaceSeats.length);

				let westArray = that.westGraph.getSelectedSpaceSeats();
				let eastArray = that.eastGraph.getSelectedSpaceSeats();

				that.spaceSeats.push.apply(that.spaceSeats, westArray);
				that.spaceSeats.push.apply(that.spaceSeats, eastArray);

			}
		},
		mounted(){

			this.westGraph.selectCallback = this.selectCallback;
			this.eastGraph.selectCallback = this.selectCallback;

			this.refresh();

		}
	}

</script>

<style lang="less" rel="stylesheet/less">
	.space-seat-west-view {

		h1 {
			text-align: center;
		}
		.graph-block {
			overflow-x: auto;
			text-align: center;

		}
	}
</style>
