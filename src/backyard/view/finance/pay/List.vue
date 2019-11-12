<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>付款信息列表</span>
				</div>

				<div class="pull-right" v-if="user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_MANAGE)">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/finance/pay/info/create')">
						<i class="fa fa-plus"></i>
						<span>创建付款信息</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">


				<div v-for="financePayInfo in pager.financePayInfos" class="bg-white p10 mt10 br4 cursor"
				     @click.stop.prevent="$router.push('detail/'+financePayInfo.id)">
					<div class="media">

						<div class="pull-right action-buttons">
							<a v-if="financePayInfo.canEdit()" title="编辑"
							   @click.stop.prevent="$router.push('/by/finance/pay/info/edit/'+financePayInfo.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a v-if="financePayInfo.canDel()" href="javascript:void(0)" title="删除"
							   @click.stop.prevent="financePayInfo.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body">
							<div class="cell-title">
								<span>{{financePayInfo.name}}</span>
                <span v-if="financePayInfo.archive" class="label label-danger">已归档</span>
								<span :class="'label label-'+financePayInfo.getStatusStyle()">{{financePayInfo.getStatusName()}}</span>
							</div>
							<div class="cell-content">
								合同：
                <span class="text-success" @click.stop="$router.push('/by/protocol/space/detail/'+financePayInfo.protocolSpace.id)">
                  {{financePayInfo.protocolSpace.name}}
                </span>
                <span
                  :class="'label label-'+financePayInfo.protocolSpace.getStatusStyle()">{{financePayInfo.protocolSpace.getStatusName()}}</span>
							</div>
              <div class="cell-content">
                租金范围：{{financePayInfo.startTime | humanTime}} 到 {{financePayInfo.endTime | humanTime}}
              </div>
							<div class="cell-content">
								<span class="mr10">用户: <UserProfileLink :user="financePayInfo.user"/></span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{financePayInfo.createTime | humanTime}}</span>
                <span>园区地点：{{financePayInfo.spaceRegional.name}}</span>
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
	import FinancePayInfo from  "../../../../common/model/finance/FinancePayInfo"
	import UserProfileLink from "../../widget/UserProfileLink";

	export default{
		data() {
			return {
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
				pager: new Pager(FinancePayInfo)
			}
		},
		computed: {},
		watch: {
			"$route"(){
        this.pager.page = 0;
        this.pager.resetFilter();
        this.pager.enableHistory();
        this.refresh();
      }
		},
		methods: {
			search() {
				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
				this.pager.httpFastPage();
			}
		},
		components: {
			NbFilter,
			NbPager,
			UserProfileLink
		},
		mounted() {
			this.pager.enableHistory();

			//默认按照时间倒序排列。
			if (this.pager.getFilter("orderId").isEmpty()) {
				this.pager.setFilter("orderId", "DESC");
			}



			//管理员默认查看非归档项目，对于普通用户而言本来数量就不多，默认显示所有的。
			if (this.pager.getFilter("status").isEmpty() && this.user.hasPermissionAllSpace(this.FeatureType.FINANCE_PAY_INFO_MANAGE)) {
				this.pager.setFilter("status", FinancePayInfo.prototype.Status.PAYING);
        this.pager.setFilter("orderStartTime", "ASC");
        this.pager.setFilter("orderId", null);
			}

      //管理员默认查看非归档项目，对于普通用户而言本来数量就不多，默认显示所有的。
      if (this.pager.getFilter("archive").isEmpty() && this.user.hasPermissionAllSpace(this.FeatureType.FINANCE_PAY_INFO_MANAGE)) {
        this.pager.setFilter("archive", false);
      }

			this.refresh();
		}
	}
</script>

