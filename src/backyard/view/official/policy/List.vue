<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>政策发布列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/official/policy/create')">
						<i class="fa fa-send"></i>
						<span>发布政策</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-xs-12">
				<div v-for="policy in pager.officialPolicies" class="bg-white p10 mt10 cursor br4"
				     @click.stop.prevent="$router.push('/by/official/policy/detail/' + policy.id)">

					<div class="media">

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/official/policy/edit/' + policy.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="policy.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>{{policy.title}}</span>
								<span v-for="tag in policy.tags" class="mr5 label label-default">{{tag}}</span>
							</div>
							<div class="cell-content">
								<span class="mr10">#{{policy.id}}</span>
								<span class="mr10">创建于:{{policy.createTime | simpleDateTime}}</span>
								<span class="mr10">作者:{{policy.author}}</span>
                <span class="mr10">地区：{{policy.area.name}}</span>
                <span class="mr10">摘要：{{policy.digest}}</span>
							</div>
              <div class="cell-content">
                <span class="mr10">园区地点：{{policy.spaceRegional.name}}</span>
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
	import OfficialPolicy from  "../../../../common/model/official/OfficialPolicy"

	export default {

		data () {
			return {
				pager: new Pager(OfficialPolicy)
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
			this.refresh();
		}
	}

</script>
