<template>
	<div class="animated fadeIn">


		<div class="row mb10">
      <div class="col-md-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>租赁协议列表</span>
				</div>
				<div class="pull-right" v-if="user.hasPermissionAllSpace(FeatureType.PROTOCOL_SPACE_MANAGE)">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/protocol/space/create')">
						<i class="fa fa-plus"></i>
						<span>创建租赁协议</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

      <div class="col-md-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

      <div class="col-md-12">


				<ProtocolSpaceListCell v-for="protocolSpace in pager.protocolSpaces" :key="protocolSpace.id"
				                       :protocolSpace="protocolSpace" :refreshCallback="refresh"/>

			</div>
      <div class="col-md-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>

			<div class="col-md-12 mt10 text-right" v-show="user.hasPermissionAllSpace(FeatureType.PROTOCOL_SPACE_MANAGE)">
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

	import Pager from  "../../../../common/model/base/Pager"
	import ProtocolSpace from  "../../../../common/model/protocol/space/ProtocolSpace"
	import UserProfileLink from "../../widget/UserProfileLink";
	import ProtocolSpaceListCell from "./widget/ProtocolSpaceListCell";

	export default{
		data() {
			return {
				pager: new Pager(ProtocolSpace),
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType
			}
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
			search() {
				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
				this.pager.httpFastPage();
			},
			refreshStatus(){


				let that = this;
				ProtocolSpace.prototype.httpRefreshStatus(function () {
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
			ProtocolSpaceListCell
		},
    beforeMount() {
      if(!this.user.hasPermissionAllSpace(this.FeatureType.SPACE_APPLY_MANAGE)) {
        this.pager.removeFilter('spaceRoomId');
        this.pager.removeFilter('spaceSeatId');
      }
    },
		mounted() {

			this.pager.enableHistory();

			//默认按照时间倒序排列。
			if (this.pager.getFilter("orderId").isEmpty()) {
				this.pager.setFilter("orderId", "DESC");
			}

			//管理员默认查看非归档项目 对于普通用户而言本来数量就不多，默认显示所有的。
			if (this.pager.getFilter("archive").isEmpty() && this.user.hasPermissionAllSpace(this.FeatureType.PROTOCOL_SPACE_MANAGE)) {
				this.pager.setFilter("archive", false);
			}

			this.refresh();
		}
	}
</script>

