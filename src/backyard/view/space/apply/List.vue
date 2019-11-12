<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-md-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>空间申请列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('create')">
						<i class="fa fa-plus"></i>
						<span>新建申请</span>
					</button>
				</div>
			</div>
		</div>


		<div class="row">
			<div class="col-md-12 clearfix">
				<NbFilter :pager="pager" :callback="search"/>
			</div>

			<div class="col-md-12">
				<div v-for="spaceApply in pager.spaceApplies" class="bg-white p10 mt10 cursor"
				     @click.stop.prevent="$router.push({path: 'detail', query: { id: spaceApply.id }})">

					<div class="media">
						<div class="pull-right action-buttons">
							<a title="编辑" v-if="spaceApply.canEdit()"
							   @click.stop.prevent="$router.push({path: 'edit', query: { id: spaceApply.id }})">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除"  v-if="spaceApply.canDel()"
							   @click.stop.prevent="spaceApply.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body">
							<div class="cell-title">
								<span>{{spaceApply.name}}</span>
								<span :class="'label label-'+spaceApply.getStatusStyle()">{{spaceApply.getStatusName()}}</span>
								<span v-if="spaceApply.archive" class="label label-danger">已归档</span>
							</div>
							<div class="cell-content">
								<span :class="'label label-'+spaceApply.getTypeStyle()">{{spaceApply.getTypeName()}}</span>
                <span>园区地点：{{spaceApply.spaceRegional.name}}</span>
							</div>
							<div class="cell-content" v-show="spaceApply.status===spaceApply.Status.REJECT">
								拒绝理由：<span class="text-danger">{{spaceApply.reason}}</span>
							</div>
							<div class="cell-content">
								<span class="mr10">申请者: <UserProfileLink :user="spaceApply.creator"/></span>
								<span class="mr10">
                  申请项目：
                  <router-link
	                  :to="user.hasPermissionSpace($store.state.FeatureType.PROJECT_MANAGE,spaceApply.spaceRegional.id)? {path: '/by/project/detail', query: { id: spaceApply.project.id }}:{path: '/group/project/detail', query: { id: spaceApply.project.id }}">{{spaceApply.project.name}}
                  </router-link>
                </span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{spaceApply.createTime | humanTime}}</span>
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
	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'
	import Pager from  "../../../../common/model/base/Pager"
	import SpaceApply from  "../../../../common/model/space/SpaceApply"
	import UserProfileLink from "../../widget/UserProfileLink";
	import {simpleDateTime} from "../../../../common/filter/time";

	export default {

		data(){
			return {
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
				pager: new Pager(SpaceApply)
			}
		},
		components: {
			NbFilter,
			NbPager,
			UserProfileLink
		},
		computed: {},
		watch: {
			'$route' (to, from) {
				if (to.fullPath !== from.fullPath) {
					this.reset();
					this.refresh();
				}
			}
		},
		methods: {
			reset(){
				this.pager.page = 0;
				this.pager.resetFilter();
				this.pager.enableHistory();
			},
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

			//管理员默认查看非归档项目，对于普通用户而言本来数量就不多，默认显示所有的。
			if (this.pager.getFilter("archive").isEmpty() && this.user.hasPermissionAllSpace(this.FeatureType.SPACE_APPLY_MANAGE)) {
				this.pager.setFilter("archive", false);
			}


			this.refresh();
		}
	}

</script>
