<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-md-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>企业管家-服务类型列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/keeper/business/type/create')">
						<i class="fa fa-plus"></i>
						<span>添加新的服务类型</span>
					</button>
				</div>

			</div>
		</div>

		<div class="row">

			<div class="col-md-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-md-12">
				<div v-for="keeperBusinessType in pager.keeperBusinessTypes" class="bg-white p10 mt10 br4 cursor"
				     @click.stop.prevent="$router.push('/by/keeper/business/type/detail/'+keeperBusinessType.id)">
					<div class="media">
						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/keeper/business/type/edit/'+keeperBusinessType.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="keeperBusinessType.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body"
						     @click.stop.prevent="$router.push('/by/keeper/business/type/detail/'+keeperBusinessType.id)">

							<div class="cell-title">
								<span>{{keeperBusinessType.name}}</span>
							</div>
							<div class="cell-description list-text-restriction">{{ keeperBusinessType.description }}</div>
							<div class="cell-description list-text-restriction">属于十大服务中的: {{keeperBusinessType.getTypeName()}}</div>
							<div class="cell-content">
                <span>园区地点：{{keeperBusinessType.spaceRegional.name}}</span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{keeperBusinessType.createTime | humanTime}}</span>
							</div>

						</div>
					</div>
				</div>
			</div>

			<div class="col-md-12 mt20">
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
	import KeeperBusinessType from  "../../../../../common/model/keeper/business/KeeperBusinessType"

	export default{
		data () {
			return {
				pager: new Pager(KeeperBusinessType)
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
        this.pager.setFilter("orderCreateTime", "DESC");
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.enableHistory();
			this.refresh();
		}
	}


</script>
