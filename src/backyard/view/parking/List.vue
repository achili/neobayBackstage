<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>停车申请列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/parking/apply/create')">
						<i class="fa fa-plus"></i>
						<span>新建停车申请</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">


				<div v-for="parkingApply in pager.parkingApplies" class="bg-white p10 br4 mt10 cursor"
				     @click.stop.prevent="$router.push('/by/parking/apply/detail/' + parkingApply.id)">
					<div class="media">
						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/parking/apply/edit/'+parkingApply.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="parkingApply.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body">
							<div class="cell-title">
								<span>{{parkingApply.name}}</span><span
								:class="'label label-'+parkingApply.getStatusStyle()">{{parkingApply.getStatusName()}}</span>
							</div>
							<div  class="cell-content">
								<span class="mr10">#{{parkingApply.id}}</span>
								<span class="mr10">创建于: {{parkingApply.createTime | simpleDateTime}}</span>
								<span class="mr10">电话: {{parkingApply.phone}}</span>
								<span class="mr10">邮箱: {{parkingApply.email}}</span>
								<span class="mr10">理由: {{parkingApply.reason}}</span>
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
	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'
	import Pager from  "../../../common/model/base/Pager"
	import ParkingApply from  "../../../common/model/parking/ParkingApply"

	export default {

		data(){
			return {
				pager: new Pager(ParkingApply)
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
