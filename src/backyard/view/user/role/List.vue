<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>角色列表</span>
				</div>

				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/user/role/create')">
						<i class="fa fa-send"></i>
						<span>新建角色</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="userRole in pager.userRoles" class="bg-white p10 mt10 cursor br4"
				     @click.stop.prevent="$router.push('/by/user/role/detail/' + userRole.id)">

					<div class="media">

						<div class="pull-right action-buttons" v-show="!userRole.special">
							<a title="编辑" @click.stop.prevent="$router.push('/by/user/role/edit/'+userRole.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="userRole.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>{{userRole.name}}</span>
							</div>
							<div class="cell-description">
								{{userRole.description}}
							</div>
							<div class="cell-content">
								{{userRole.special ? "系统内置角色" : "自定义角色"}}
                <span>园区地点:{{userRole.spaceRegional.name}}</span>
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
<style>

</style>
<script>
	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../../common/model/base/Pager"
	import UserRole from  "../../../../common/model/user/role/UserRole"

	export default{
		data(){
			return {
				pager: new Pager(UserRole)
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
