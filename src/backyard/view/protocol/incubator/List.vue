<template>
	<div class="animated fadeIn">


		<div class="row mb10">
			<div class="col-md-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>孵化协议列表</span>
				</div>
				<div class="pull-right" v-if="user.hasPermissionAllSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE)">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/protocol/incubator/create')">
						<i class="fa fa-plus"></i>
						<span>创建孵化协议</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-md-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-md-12">

				<ProtocolIncubatorListCell v-for="protocolIncubator in pager.protocolIncubators"
				                           :key="protocolIncubator.id" :protocolIncubator="protocolIncubator"
				                           :refreshCallback="refresh"
				/>

			</div>
			<div class="col-md-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>

			<div class="col-md-12 mt10 text-right" v-show="user.hasPermissionAllSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE)"

			>
				<button class="btn btn-primary" @click.stop.prevent="refreshStatus()">
					<i class="fa fa-refresh"></i>
					手动更新过期合同状态
				</button>
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
	import ProtocolIncubator from  "../../../../common/model/protocol/incubator/ProtocolIncubator"

	import ProtocolIncubatorListCell from "./widget/ProtocolIncubatorListCell";

	export default{
		data() {
			return {
				pager: new Pager(ProtocolIncubator),
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType
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
			},
			refreshStatus(){


				let that = this;
				ProtocolIncubator.prototype.httpRefreshStatus(function () {
					Notification.success({
						message: "更新成功！"
					});
					that.refresh();
				});


			}
		},
		components: {
			NbFilter,
			NbPager,
			UserProfileLink,
			ProtocolIncubatorListCell
		},
		mounted() {

			this.pager.enableHistory();

			//默认按照时间倒序排列。
			if (this.pager.getFilter("orderId").isEmpty()) {
				this.pager.setFilter("orderId", "DESC");
			}


			//管理员默认查看非归档项目 对于普通用户而言本来数量就不多，默认显示所有的。
			if (this.pager.getFilter("archive").isEmpty() && this.user.hasPermissionAllSpace(this.FeatureType.PROTOCOL_INCUBATOR_MANAGE)) {
				this.pager.setFilter("archive", false);
			}


			this.refresh();
		}
	}
</script>

