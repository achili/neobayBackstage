<template>

	<div class="enter-backyard-activity-detail">

		<div class="text-right">
			<div class="mt10 mb10">
				<button title="编辑" class="btn btn-success"
				        @click.stop.prevent="$router.push('/by/official/activity/edit/'+officialActivity.id)">
					<i class="fa fa-pencil"></i>
					编辑
				</button>
			</div>
		</div>


		<div>

			<div class="header-block">

				<ActivityDetailCell :officialActivity="officialActivity"/>

			</div>

			<div class="content-block">
				<div class="yellow-frame-title">
					活动内容
				</div>
				<div class="content-line" v-html="officialActivity.content">

				</div>
			</div>

			<div class="mt10">

				<OfficialActivityOperationPanel :officialActivity="officialActivity" :changeStatusSuccessCallback="refresh"/>

			</div>

			<div class="apply-block">
				<OfficialActivityApplyList :officialActivity="officialActivity"/>
			</div>
		</div>
	</div>


</template>

<script>
	import OfficialActivity from  "../../../../common/model/official/OfficialActivity"
	import OfficialActivityApplyList from "./apply/List.vue"
	import ActivityDetailCell from "./widget/ActivityDetailCell";

	import OfficialActivityOperationPanel from "./widget/OfficialActivityOperationPanel";

	export default {

		data () {
			return {
				officialActivity: new OfficialActivity()
			}
		},
		watch: {},
		components: {
			OfficialActivityApplyList,
			ActivityDetailCell,
			OfficialActivityOperationPanel
		},
		methods: {
			refresh(){
				let that = this;
				this.officialActivity.id = this.$store.state.route.params.id;
				if (this.officialActivity.id) {
					this.officialActivity.httpDetail();
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

	@import "../../../../common/assets/css/global/variables";

	.enter-backyard-activity-detail {
		.header-block {
			padding: 50px 20px;
			//background-color: @neobay-yellow;
			background-size: cover;
			color: white;
			background: @neobay-yellow; /* 一些不支持背景渐变的浏览器 */
			background: -moz-linear-gradient(top, @neobay-light-yellow, @neobay-yellow);
			background: -webkit-gradient(linear, 0 0, 0 bottom, from(@neobay-light-yellow), to(@neobay-yellow));
			background: -o-linear-gradient(top, @neobay-light-yellow, @neobay-yellow);
		}

		.content-block {
			padding: 70px 20px;
			background-color: white;
			.yellow-frame-title {

				font-size: 24px;
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
			.content-line {
				padding-top: 50px;
			}
		}
		.enter-block {
			background-color: white;
			padding: 100px 0 100px 0;

		}

		.apply-block {
			margin-top: 20px;
		}
	}

</style>
