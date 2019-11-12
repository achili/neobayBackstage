<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>通知列表</span>
				</div>
			</div>

		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="notification in pager.notifications" class="bg-white p10 mt10 br4 cursor"
				     @click.stop.prevent="$router.push('/by/notification/detail/'+notification.id)" >

					<div class="media">
						<div class="pull-left">

						</div>
						<div class="pull-right action-buttons mt2">

							<a title="编辑" @click.stop.prevent="$router.push('/by/notification/edit/'+notification.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" v-show="notification.id !==1" title="删除"
							   @click.stop.prevent="notification.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>{{notification.name}}</span>
							</div>
							<div class="cell-content">
								<StatusReport :notification="notification"/>
							</div>
							<div class="cell-content">
								<span class="mr10">#{{notification.id}}</span>
								<span class="mr10">创建于 : {{notification.createTime | simpleDate}}</span>
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

	import StatusReport from "./widget/StatusReport";
	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../common/widget/NbPager.vue'
	import {MessageBox, Notification as NotificationBox} from 'element-ui'

	import Pager from  "../../../common/model/base/Pager"
	import Notification from  "../../../common/model/notification/Notification"

	export default {

		data () {
			return {
				pager: new Pager(Notification)
			}
		},
		components: {
			StatusReport,
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
