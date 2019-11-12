<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-md-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
          <span>企业管家-合作机构列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/keeper/business/organization/create')">
						<i class="fa fa-plus"></i>
						<span>添加新的合作机构</span>
					</button>
				</div>

			</div>
		</div>

		<div class="row">

			<div class="col-md-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-md-12">
				<div v-for="keeperBusinessOrganization in pager.keeperBusinessOrganizations"
				     class="bg-white p10 mt10 br4 cursor"
				     @click.stop.prevent="$router.push('/by/keeper/business/organization/detail/'+keeperBusinessOrganization.id)">
					<div class="media">
						<div class="pull-right action-buttons">
							<a title="编辑"
							   @click.stop.prevent="$router.push('/by/keeper/business/organization/edit/'+keeperBusinessOrganization.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="keeperBusinessOrganization.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body"
						     @click.stop.prevent="$router.push('/by/keeper/business/organization/detail/'+keeperBusinessOrganization.id)">
              <div class="pull-left mr10">
                <NbPhotoFrame :picture="keeperBusinessOrganization.logo.url" :proportion="100" :width="80"></NbPhotoFrame>
              </div>
							<div class="cell-title">
								<span>{{keeperBusinessOrganization.name}}</span>
                <span :class="'label label-'+keeperBusinessOrganization.getStatusStyle()">{{keeperBusinessOrganization.getStatusName()}}</span>
							</div>
							<div class="cell-content">
								<span class="mr10">单位名称：{{keeperBusinessOrganization.detailName}}</span>
							</div>
							<div class="cell-description list-text-restriction">{{keeperBusinessOrganization.description}}</div>
							<div class="cell-content">

								<span class="mr10">类型：
									<a href="javascript:void(0)"
									   @click.stop.prevent="$router.push('/by/keeper/business/type/detail/'+keeperBusinessOrganization.businessType.id)">
										{{keeperBusinessOrganization.businessType.name}}
									</a>
									</span>
                <span>园区地点：{{keeperBusinessOrganization.spaceRegional.name}}</span>
								<span class="mr10"><i
									class="fa fa-clock-o"></i> {{keeperBusinessOrganization.createTime | humanTime}}</span>
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
	import NbFilter from '../../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../../common/widget/NbPager.vue'
  import NbPhotoFrame from '../../../../../common/widget/NbPhotoFrame'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../../../common/model/base/Pager"
	import KeeperBusinessOrganization from  "../../../../../common/model/keeper/business/KeeperBusinessOrganization"

	export default{
		data () {
			return {
				pager: new Pager(KeeperBusinessOrganization)
			}
		},
		components: {
			NbFilter,
			NbPager,
      NbPhotoFrame
		},
		computed: {},
		watch: {},
		methods: {
			search() {
				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
        this.pager.setFilter("orderCreateTime", "DESC");
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.enableHistory();
			this.refresh();
		}
	}


</script>
