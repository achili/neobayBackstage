<template>
	<div class="row home-activity-detail-cell">

		<div class="col-md-3 mb15">
			<img :src="officialActivity.posterUrl"/>
		</div>
		<div class="col-md-9">
			<div class="title">
				{{officialActivity.title}}
				<span :class="'label label-'+officialActivity.getStatusStyle()">
					{{officialActivity.getStatusName()}}
				</span>
			</div>
			<div class="description">
				{{officialActivity.digest}}
			</div>
      <div class="content">
        园区地点：{{officialActivity.spaceRegional.name}}
      </div>
			<div class="content">
				时间：{{officialActivity.startTime | simpleDateMinute}} 至 {{officialActivity.endTime | simpleDateMinute}}
			</div>
			<div class="content">
				报名：{{officialActivity.applyStartTime | simpleDateMinute}} 至 {{officialActivity.applyEndTime | simpleDateMinute}}
			</div>

			<div class="content">
				地点：{{officialActivity.address}}
			</div>

			<div class="content">
				发起：{{officialActivity.sponsor}}
			</div>
			<div class="content">
				人数：{{officialActivity.num}}/{{officialActivity.maxNum}}
			</div>

			<div class="content">
				<a href="javascript:void(0)" class="btn-apply" @click.stop.prevent="apply">
					{{applyBtnText}}
				</a>
			</div>

		</div>

	</div>
</template>

<script>
	import OfficialActivity from  "../../../../../common/model/official/OfficialActivity";
	import NbTank from "../../../../../common/widget/NbTank.vue";
	import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
	import {Message} from 'element-ui';
	export default {
		data () {
			return {}
		},
		computed: {
			applyStep(){
				let now = (new Date()).getTime();
				//报名尚未开始
				if (now < this.officialActivity.applyStartTime.getTime()) {
					return 0;
				} else if (now > this.officialActivity.applyEndTime.getTime()) {
					//报名已经结束
					return 2;
				} else {
					//正在报名中
					return 1;
				}
			},
			applyBtnText(){
				if (this.applyStep === 0) {
					return "报名尚未开始";
				} else if (this.applyStep === 1) {
					return "我要报名";
				} else {
					return "报名已结束";
				}
			}
		},
		components: {
			NbTank,
			NbSlidePanel
		},
		props: {
			officialActivity: {
				type: OfficialActivity,
				required: true
			},
			applyCallback: {
				type: Function,
				required: false
			}
		},
		methods: {
			apply(){

				if (this.officialActivity.category === this.officialActivity.Category.OTHER) {
					Message.info({
						message: "请参照活动内容中的方式进行报名!"
					});
					return;
				}


				if (this.applyStep === 0) {
					Message.info({
						message: "报名活动尚未开始，请持续关注我们的最新情况!"
					});
				} else if (this.applyStep === 1) {
					if (typeof this.applyCallback === "function") {
						this.applyCallback();
					}
				} else if (this.applyStep === 2) {
					Message.info({
						message: "报名已结束，您可以关注其他活动!"
					});
				}
			}
		},
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "../../../../../common/assets/css/global/variables";

	.home-activity-detail-cell {

		color: white;

		.poster-block {

			background-position: center;
			background-size: cover;
			width: 280px;
			height: 200px;

		}

		.title {
			font-size: 18px;
			font-weight: bold;
		}

		.description {
			margin-top: 10px;
		}

		.content {
			margin-top: 5px;

			.btn-apply {

				margin-top: 20px;

				width: 180px;
				height: 40px;
				border: 1px solid #fff;
				border-radius: 5px;
				color: #fff;
				display: block;
				font-size: 14px;
				line-height: 40px;
				text-align: center;
				&:hover {
					background-color: @neobay-blue;
				}
			}

		}

	}

</style>


