<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>活动类型列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/official/activity/type/create')">
						<i class="fa fa-send"></i>
						<span>发布活动类型</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-xs-12">
				<div v-for="(officialActivityType,index) in pager.officialActivityTypes" class="bg-white p10 mt10 br4">

					<div class="media">
						<div class="pull-right action-buttons">

							<a title="上移" v-show="index > 0" @click.stop.prevent="officialActivityType.httpSort(officialActivityType.id , pager.officialActivityTypes[index - 1].sort , pager.officialActivityTypes[index - 1].id , officialActivityType.sort , refresh)">
								<i class="fa fa-arrow-up text-primary f20"></i>
							</a>
							<a title="下移" v-show="index < pager.officialActivityTypes.length - 1" @click.stop.prevent="officialActivityType.httpSort(officialActivityType.id , pager.officialActivityTypes[index + 1].sort , pager.officialActivityTypes[index + 1].id , officialActivityType.sort , refresh)">
								<i class="fa fa-arrow-down text-success f20"></i>
							</a>

							<a title="编辑" @click.stop.prevent="$router.push('/by/official/activity/type/edit/'+officialActivityType.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="officialActivityType.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>{{officialActivityType.name}}</span>
							</div>
							<div class="cell-content">
								<span class="mr10">#{{officialActivityType.id}}</span>
                <span>园区地点：{{officialActivityType.spaceRegional.name}}</span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{officialActivityType.createTime | humanTime}}</span>
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
	import Article from  "../../../../../common/model/article/Article"
	import OfficialArticle from  "../../../../../common/model/official/OfficialArticle"
  import OfficialActivityType from  "../../../../../common/model/official/OfficialActivityType"

	export default {

		data () {
			return {
				pager: new Pager(OfficialActivityType)
			}
		},
		components: {
			NbFilter,
			NbPager
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

			//默认按照序号倒序排列。
			if (this.pager.getFilter("orderSort").isEmpty()) {
				this.pager.setFilter("orderSort", "DESC");
			}


			this.refresh();
		}
	}

</script>
