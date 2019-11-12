<template>
	<div class="row home-activity-list-cell">

		<div class="col-xs-12">
			<div class="media">
				<div class="pull-left">
					<div class="poster-block" :style="'background-image:url('+officialActivity.posterUrl+')'"
					     @click.stop.prevent="open('/home/park/activity/' + officialActivity.id)"
					></div>
				</div>
				<div class="media-body">
					<div class="cell-title" @click.stop.prevent="open('/home/park/activity/' + officialActivity.id)">
						{{officialActivity.title}}
					</div>
					<div class="mv5">
						<span :class="'label label-'+officialActivity.getStatusStyle()">
							{{officialActivity.getStatusName()}}
						</span>
					</div>
					<div class="cell-description">
						{{officialActivity.digest}}
					</div>
					<div class="cell-content">

						<span class="mr10">
						 <i class="fa fa-clock-o"></i> {{officialActivity.startTime | simpleDate}}
						</span>

						<span>
							<i class="fa fa-map-marker"></i>
							<span>
								{{officialActivity.address}}
							</span>

						</span>
					</div>
				</div>

			</div>

		</div>

	</div>
</template>

<script>
	import OfficialActivity from  "../../../../common/model/official/OfficialActivity";
	import NbTank from "../../../../common/widget/NbTank.vue";
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";

	export default {
		data () {
			return {}
		},
		components: {
			NbTank,
			NbSlidePanel
		},
		props: {
			officialActivity: {
				type: OfficialActivity,
				required: true
			}
		},
		methods: {
			open(href){
				window.open(href);
			}
		},
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "../../../../common/assets/css/global/variables";

	.home-activity-list-cell {

		.media {
			padding: 10px 0;
			border-bottom: 1px solid #eeeeee;
			.poster-block {

				background-position: center;
				background-size: cover;
				width: 150px;
				height: 100px;
				cursor: pointer;
				&:hover {
					color: @neobay-yellow;
				}
			}

			.cell-title, .tag-span {

				font-size: 16px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: bold;

				cursor: pointer;
				&:hover {
					color: @neobay-yellow;
				}
			}
			.cell-description {

				margin-top: 5px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				position: relative;
				line-height: 18px;
				max-height: 72px;
				-webkit-line-clamp: 2;
				text-overflow: ellipsis;

			}
		}

	}

</style>


