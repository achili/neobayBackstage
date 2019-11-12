<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="keeperBusinessType.detailLoading">
					<div class="text-right mb10" v-if="user.hasPermissionSpace($store.state.FeatureType.KEEPER_BUSINESS_MANAGE,keeperBusinessType.spaceRegional.id)">
						<a title="编辑" class="btn btn-success"
						   @click.stop.prevent="$router.push('/by/keeper/business/type/edit/' + keeperBusinessType.id)">
							<i class="fa fa-pencil"></i>
							编辑
						</a>
					</div>

					<NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-leaf"></i>
              基本信息
            </span>
						<div slot="body">

							<div class="row mt10">
								<div class="col-md-2">服务类型名称：</div>
								<div class="col-md-10">{{keeperBusinessType.name}}</div>
							</div>

              <div class="row mt10">
                <div class="col-md-2">园区地点：</div>
                <div class="col-md-10">{{keeperBusinessType.spaceRegional.name}}</div>
              </div>

							<div class="row mt10">
								<div class="col-md-2">创建时间：</div>
								<div class="col-md-10">{{keeperBusinessType.createTime | humanTime}}</div>
							</div>

							<div class="row mt10">
								<div class="col-md-2">描述：</div>
								<div class="col-md-10">{{keeperBusinessType.description}}</div>
							</div>

						</div>
					</NbSlidePanel>


					<NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-handshake-o"></i>
              合作机构
            </span>
						<div slot="body">

							<div class="bg-white p10 mt10 br4 cursor border clearfix"
							     v-for="keeperBusinessOrganization in pager.keeperBusinessOrganizations"
							     @click.stop.prevent="$router.push('/by/keeper/business/organization/detail/'+keeperBusinessOrganization.id)"
							>
								<div class="pull-left mr15">
									<img class="img-rounded img-lg" :src="keeperBusinessOrganization.logo.url">
								</div>
								<div class="cell-title">
									<span>{{keeperBusinessOrganization.name}}</span>
								</div>

								<div class="cell-description">{{keeperBusinessOrganization.description}}</div>
								<div class="cell-content">
									<span class="mr10">单位名称：{{keeperBusinessOrganization.detailName}}</span>
									<span class="mr10"><i class="fa fa-clock-o"></i> {{keeperBusinessOrganization.createTime | humanTime}}</span>
								</div>

							</div>
							<div class="">
								<NbPager :pager="pager" :callback="refresh"></NbPager>
							</div>


						</div>
					</NbSlidePanel>


				</LoadingFrame>
			</div>
			<div class="col-md-12 text-right">
				<button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
					<i class="fa fa-arrow-left"></i>
					返回
				</button>
			</div>
		</div>

	</div>
</template>
<script>
	import {MessageBox, Notification} from 'element-ui'
	import KeeperBusinessType from  "../../../../../common/model/keeper/business/KeeperBusinessType"
	import LoadingFrame from "../../../widget/LoadingFrame";
	import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
	import NbPager from '../../../../../common/widget/NbPager.vue';
	import Pager from  "../../../../../common/model/base/Pager"
	import KeeperBusinessOrganization from  "../../../../../common/model/keeper/business/KeeperBusinessOrganization"

	export default{
		data () {
			return {
				keeperBusinessType: new KeeperBusinessType(),
				pager: new Pager(KeeperBusinessOrganization, 2),
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user
			}
		},
		components: {
			LoadingFrame,
			NbSlidePanel,
			NbPager
		},
		computed: {},
		watch: {},
		methods: {
			refresh(){
				this.pager.setFilter("keeperBusinessTypeId", this.keeperBusinessType.id);
				this.pager.httpFastPage();
			},
			fetchDetail(){
				let that = this;
				this.keeperBusinessType.id = this.$store.state.route.params.id;
				if (this.keeperBusinessType.id) {
					this.keeperBusinessType.httpDetail();
				}
			}
		},
		mounted(){
			let that = this;
			this.keeperBusinessType.id = this.$store.state.route.params.id;
			if (this.keeperBusinessType.id) {
				this.keeperBusinessType.editMode = true;
				this.fetchDetail();
			}

			this.refresh();
		}
	}

</script>
