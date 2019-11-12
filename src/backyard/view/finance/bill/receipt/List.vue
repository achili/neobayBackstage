<template>
	<div class="animated fadeIn">


		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>已收账款信息列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/finance/bill/receipt/create')">
						<i class="fa fa-plus"></i>
						<span>创建已收账款信息</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">


				<div v-for="financeBillReceipt in pager.financeBillReceipts" class="bg-white p10 mt10 br4 cursor"
				     @click.stop.prevent="$router.push('/by/finance/bill/receipt/detail/'+financeBillReceipt.id)">
					<div class="media">

						<div class="pull-right action-buttons">
							<a v-if="financeBillReceipt.canEdit()" title="编辑"
							   @click.stop.prevent="$router.push('/by/finance/bill/receipt/edit/'+financeBillReceipt.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a v-if="financeBillReceipt.canDel()" href="javascript:void(0)" title="删除" @click.stop.prevent="financeBillReceipt.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body">
							<div class="cell-title">
                <span>{{financeBillReceipt.name}}</span>
                <span
                  :class="'label label-'+financeBillReceipt.getTypeStyle()">{{financeBillReceipt.getTypeName()}}</span>
							</div>
              <div class="cell-content">
                备注：{{financeBillReceipt.remark}}
              </div>
							<div class="cell-content">
                <span class="mr10">金额￥: {{financeBillReceipt.amount}}</span>
                <span class="mr10">付款方: {{financeBillReceipt.companyName}}</span>

                <span class="mr10">用户: <UserProfileLink :user="financeBillReceipt.user"/></span>
								<span class="mr10">
									收款时间：
									{{financeBillReceipt.receiveTime | humanTime}}</span>
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
	import UserProfileLink from "../../../widget/UserProfileLink";


	import Pager from  "../../../../../common/model/base/Pager"
	import FinanceBillReceipt from  "../../../../../common/model/finance/FinanceBillReceipt"

	export default{
		data() {
			return {
				pager: new Pager(FinanceBillReceipt)
			}
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
		components: {
			NbFilter,
			NbPager,
			UserProfileLink
		},
		mounted() {
			this.pager.enableHistory();

			//默认按照时间倒序排列。
			if (this.pager.getFilter("orderId").isEmpty()) {
        this.pager.setFilter("orderReceiveTime", "DESC");
			}


			this.refresh();
		}
	}
</script>

