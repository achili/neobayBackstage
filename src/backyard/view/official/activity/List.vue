<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>活动列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/official/activity/create')">
						<i class="fa fa-send"></i>
						<span>发布活动</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-xs-12">
				<div v-for="officialActivity in pager.officialActivities" class="bg-white p10 mt10 cursor br4"
				     @click.stop.prevent="$router.push('/by/official/activity/detail/' + officialActivity.id)">

					<div class="media">
            <div class="pull-left">
              <NbPhotoFrame :picture="officialActivity.posterUrl" :proportion="100" :width="80"></NbPhotoFrame>
            </div>
						<!--<div class="pull-left">-->
							<!--<img class="img-rounded img-md" v-if="officialActivity.posterUrl" :src="officialActivity.posterUrl">-->
						<!--</div>-->

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/official/activity/edit/'+officialActivity.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="officialActivity.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span class="f15">{{officialActivity.title}}</span>
								<span :class="'label label-danger'" v-if="officialActivity.endTime < new Date">活动已结束</span>
								<span :class="'label label-'+officialActivity.getStatusStyle()" v-else>{{officialActivity.getStatusName()}}</span>
							</div>
							<div class="cell-description">
								{{officialActivity.digest}}
                园区地点：{{officialActivity.spaceRegional.name}}
							</div>
							<div class="cell-content">
								<span class="mr10">分类：{{officialActivity.type.name}}</span>
								<span class="mr10">作者:{{officialActivity.author}}</span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{officialActivity.startTime | simpleDateTime}} 至 {{officialActivity.endTime | simpleDateTime}}</span>
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

	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
  import NbPhotoFrame from '../../../../common/widget/NbPhotoFrame'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../../common/model/base/Pager"
	import Article from  "../../../../common/model/article/Article"
	import OfficialActivity from  "../../../../common/model/official/OfficialActivity"

	export default {

		data () {
			return {
				pager: new Pager(OfficialActivity)
			}
		},
		components: {
			NbFilter,
			NbPager,
      NbPhotoFrame
		},
		computed: {},
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
			this.pager.enableHistory();

			//默认按照时间倒序排列。
			if (this.pager.getFilter("orderId").isEmpty()) {
				this.pager.setFilter("orderId", "DESC");
			}

			this.refresh();
		}
	}

</script>
