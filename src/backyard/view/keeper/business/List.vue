<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>企业管家-业务申请列表</span>
				</h2>
			</div>

      <div class="pull-right mb20">
        <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/keeper/business/create')">
          <i class="fa fa-plus"></i>
          <span>添加新的服务类型</span>
        </button>
      </div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="keeperBusiness in pager.keeperBusinesses" class="bg-white p10 mt10 br4 cursor"
				     @click.stop.prevent="$router.push({ path: 'detail', query: { id: keeperBusiness.id }})">
					<div class="media">
						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push({ path: 'edit', query: { id: keeperBusiness.id }})">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="keeperBusiness.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body" @click.stop.prevent="$router.push({ path: 'detail', query: { id: keeperBusiness.id }})">

							<div class="cell-title">
								<span>{{keeperBusiness.name}}</span>
								<span :class="'label label-'+keeperBusiness.getStatusStyle()">{{keeperBusiness.getStatusName()}}</span>
								<span v-if="keeperBusiness.archive" class="label label-danger">已归档</span>
							</div>

							<div class="cell-description">
								<div>
									类型:
									<a href="javascript:void(0)"
                     @click.stop.prevent="businessType">
										{{keeperBusiness.businessType.name}}
									</a>
                  <span>园区地点：{{keeperBusiness.spaceRegional.name}}</span>
								</div>
							</div>
							<div class="cell-content" v-show="keeperBusiness.isRefuse()">
								拒绝理由：<span class="text-danger">{{keeperBusiness.reason}}</span>
							</div>
							<div class="cell-content">
								<span class="mr10">创建者:<UserProfileLink :user="keeperBusiness.creator"/></span>
								<span class="mr10">编号:{{keeperBusiness.no}}</span>
								<span class="mr10">
									<i class="fa fa-clock-o"></i>
									{{keeperBusiness.createTime | humanTime}}
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
	import UserProfileLink from "../../widget/UserProfileLink";

	import Pager from  "../../../../common/model/base/Pager"
	import KeeperBusiness from  "../../../../common/model/keeper/business/KeeperBusiness"

	export default{
		data () {
			return {
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
				pager: new Pager(KeeperBusiness)
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
      businessType() {
        if(this.user.hasPermissionAllSpace(this.FeatureType.KEEPER_BUSINESS_MANAGE)) {
          this.$router.push('/by/keeper/business/type/detail/' + this.keeperBusiness.businessType.id)
        }
      },
			reset(){
				this.pager.page = 0;
				this.pager.resetFilter();
				this.pager.enableHistory();
			},
			search() {
				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
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
			if (this.pager.getFilter("archive").isEmpty() && this.user.hasPermissionAllSpace(this.FeatureType.KEEPER_BUSINESS_MANAGE)) {
				this.pager.setFilter("archive", false);
			}
			this.refresh();
		}
	}


</script>
