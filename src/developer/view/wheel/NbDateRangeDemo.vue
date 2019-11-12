<template>
	<div>

		<div class="row">
			<div class="col-xs-12">

				<NbDateRange :startTime="startTime" v-on:startTimeChange="startTime = arguments[0]" :endTime="endTime"
				             v-on:endTimeChange="endTime = arguments[0]"/>
			</div>

			<div class="col-xs-12 mt10">
				手动选择startTime:
				<el-date-picker
					v-model="startTime"
					type="datetime"
					placeholder="startTime">
				</el-date-picker>
			</div>
			<div class="col-xs-12 mt10">
				startTime: {{startTime | simpleDate}}
			</div>
			<div class="col-xs-12 mt10">
				endTime: {{endTime | simpleDate}}
			</div>
			<div class="col-xs-12 mt10">
				<button class="btn btn-primary" @click.stop.prevent="plusTenDays()">
					endTime + 10天
				</button>
			</div>

		</div>
	</div>

</template>
<script>

	import NbDateRange from "../../../common/widget/NbDateRange.vue";

	export default{
		data(){
			return {
				startTime: new Date(),
				endTime: new Date()
			}
		},
		watch: {
			"startTime"(newVal, oldVal){
			},
			"endTime"(newVal, oldVal){
			}
		},
		methods: {
			plusTenDays(){
				let oldTime = this.endTime;
				this.endTime = new Date();
				this.endTime.setTime(oldTime.getTime() + 3600 * 1000 * 24 * 10);
			}
		},
		components: {
			NbDateRange
		},
		mounted(){
			this.startTime.setTime(this.startTime.getTime() - 3600 * 1000 * 24 * 30);
		}
	}
</script>
