<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>活动报名列表</span>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-xs-12">
				<div v-for="officialActivityApply in pager.officialActivityApplies" class="bg-white p10 mt10 br4 border">

					<div class="media">

						<div class="pull-right action-buttons">
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="officialActivityApply.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span class="f15">{{officialActivityApply.officialActivity.title}}</span>
							</div>
							<div class="cell-description">
								报名人数：{{officialActivityApply.personNum}}
							</div>
							<div class="cell-content">
								<span class="mr10">报名人:{{officialActivityApply.leader}}</span>
								<span class="mr10">联系方式:{{officialActivityApply.phone}}</span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{officialActivityApply.createTime | humanTime}}</span>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="col-xs-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>

		</div>


	</div>
</template>

<script>

	import NbFilter from '../../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../../../common/model/base/Pager"
	import OfficialActivityApply from  "../../../../../common/model/official/OfficialActivityApply"
	import OfficialActivity from  "../../../../../common/model/official/OfficialActivity"

	export default {

		data () {
			return {
				pager: new Pager(OfficialActivityApply)
			}
		},
		components: {
			NbFilter,
			NbPager
		},
		computed: {},
		props:{
      officialActivity:{
        type: OfficialActivity,
        required: true
      }
		},
		watch: {},
		methods: {

			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.setFilter("officialActivityId",this.$store.state.route.params.id);
			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>