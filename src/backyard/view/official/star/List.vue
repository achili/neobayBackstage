<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>明星项目列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/official/star/create')">
						<i class="fa fa-plus"></i>
						<span>创建明星项目</span>
					</button>
				</div>
			</div>
		</div>


		<div class="row">
			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="officialStar in pager.officialStars" class="bg-white p10 br4 mt10 cursor"
				     @click.stop.prevent="$router.push('/by/official/star/detail/'+officialStar.id)">
					<div class="media">


						<div class="pull-left">
							<img class="img-rounded w120" :src="officialStar.posterUrl"/>
						</div>

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/official/star/edit/'+officialStar.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="officialStar.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body">
							<div class="cell-title">
								<span class="f15">{{officialStar.name}}</span>&nbsp;&nbsp;
							</div>
							<div class="cell-description">
								<span>{{officialStar.type}}</span>
							</div>
							<div class="cell-content">
                <span class="mr10">
									评分:
									<span>{{officialStar.score}}</span>
								</span>
								<span class="mr10">
									<i class="fa fa-thumbs-up cursor"></i>
									<span>{{officialStar.likeNum}}</span>
								</span>
								<span class="mr10">
									<i class="fa fa-clock-o"></i>
									{{officialStar.createTime | humanTime}}
								</span>
                <span class="mr10">
									<i class="fa fa-clock-o">园区地点：</i>
									{{officialStar.spaceRegional.name}}
								</span>
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
	import {MessageBox, Notification} from 'element-ui'
	import Pager from  "../../../../common/model/base/Pager"
	import OfficialStar from  "../../../../common/model/official/OfficialStar"
	export default {

		data () {
			return {
				pager: new Pager(OfficialStar)
			}
		},
		components: {
			NbFilter,
			NbPager
		},
		computed: {},
		watch: {},
		methods: {
			search() {
				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
				this.pager.httpFastPage();
			}
		},
		mounted() {
      this.pager.enableHistory()
      this.pager.setFilter('orderScore', 'DESC')
			this.refresh();
		}
	}

</script>
