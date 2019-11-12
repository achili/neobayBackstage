<template>
	<div class="animated fadeIn">


		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>付款信息列表</span>
				</div>

				<div class="pull-right">
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
				     @click.stop.prevent="$router.push('/by/finance/pay/info/detail/'+financePayInfo.id)">
					<div class="media">

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/finance/pay/info/edit/'+financePayInfo.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="financePayInfo.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body">
							<div class="cell-title">
								<NbCheckbox :val="financePayInfo.id" v-model="ids"/>
								<span class="ml5">{{financePayInfo.name}}</span>
								<span :class="'label label-'+financePayInfo.getStatusStyle()">{{financePayInfo.getStatusName()}}</span>
							</div>
							<div class="cell-content">

								<span class="mr10">#{{financePayInfo.id}}</span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{financePayInfo.createTime | humanTime}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-xs-12 mt10">
				<button class="btn btn-primary" @click.stop.prevent="reminder">
					<i class="fa fa-bullhorn"></i>
					一键群催款


				</button>
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
	import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
	import {MessageBox, Notification as NotificationBox} from 'element-ui'

	import Pager from  "../../../../common/model/base/Pager"
	import FinancePayInfo from  "../../../../common/model/finance/FinancePayInfo"

	export default{
		data() {
			return {
				ids: [],
				pager: new Pager(FinancePayInfo),
				financePayInfo: new FinancePayInfo()
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
			},
			reminder(){

				this.financePayInfo.httpReminder(this.ids, function () {

					NotificationBox.success({
						message: "群催款成功"
					});

				});

			}
		},
		components: {
			NbFilter,
			NbPager,
			NbCheckbox
		},
		mounted() {
			//状态不可筛选。
			this.pager.setFilter("status", FinancePayInfo.prototype.Status.PAYING);
			this.pager.showFilter("status", false);

			this.pager.enableHistory();
			this.refresh();
		}
	}
</script>

