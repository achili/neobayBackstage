<template>
	<div class="animated fadeIn">


		<div class="row mb10">
			<div class="col-md-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span v-show="!isCUMT">入驻申请列表</span>
          <span v-show="isCUMT">中国矿业大学项目信息统计</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('create')" v-show="!isCUMT">
						<i class="fa fa-plus"></i>
						<span>添加新的入驻申请</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-md-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-md-12">
				<div v-for="entryApply in pager.entryApplies" class="bg-white p10 mt10 br4 cursor"
				     @click.stop.prevent="$router.push({ path: 'detail', query: { id: entryApply.id }})">
					<div class="media">


						<div class="media-body">
							<div class="pull-right">
								<a class="btn-action" title="编辑"
								   @click.stop.prevent="$router.push({ path: 'edit', query: { id: entryApply.id } })"
								   v-if="entryApply.canEdit()"
								>
									<i class="fa fa-pencil text-info f20"></i>
								</a>
								<a class="btn-action" href="javascript:void(0)" title="删除"
								   @click.stop.prevent="entryApply.confirmDel(refresh)"
								   v-if="entryApply.canDel()"
								>
									<i class="fa fa-trash text-danger f20"></i>
								</a>
							</div>

							<div class="cell-title">
								<span>{{entryApply.name}}</span>
								<span :class="'label label-'+entryApply.getStatusStyle()">{{entryApply.getStatusName()}}</span>
								<span v-if="entryApply.archive" class="label label-danger">已创建项目</span>
							</div>
							<div class="cell-description" v-show="entryApply.isRefuse()">拒绝理由：<span
								class="text-danger">{{entryApply.reason}}</span></div>
							<div class="cell-description">
                <span>园区地点：{{entryApply.spaceRegional.name}}</span>
                {{entryApply.description}}
              </div>
							<div class="cell-content">
								<span class="mr10">创建者:<UserProfileLink :user="entryApply.creator"/></span>
                <span class="mr10">
                  预分配项目经理:
                  <a  v-if="entryApply.presetProjectMentor.id"
                      @click.stop.prevent="$router.push({ path: user.hasPermissionSpace(FeatureType.ENTRY_APPLY_MANAGE,entryApply.spaceRegional.id)? '/by/mentor/detail': '/group/mentor/detail', query: { id: entryApply.presetProjectMentor.id }})">
                    {{entryApply.presetProjectMentor.name}}
                  </a>
                  <span v-else>暂无</span>
                </span>
								<span
									class="mr10">负责人:{{entryApply.entryApplyMembers.length ? entryApply.entryApplyMembers[0].name : '暂无'}}</span>
								<span
									class="mr10">联系方式:{{entryApply.entryApplyMembers.length ? entryApply.entryApplyMembers[0].phone : '暂无'}}</span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{entryApply.createTime | humanTime}}</span>
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
	import EntryApply from  "../../../../common/model/entry/apply/EntryApply"
	import UserProfileLink from "../../widget/UserProfileLink";

	export default {
		data () {
			return {
        isCUMT: false,
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
				pager: new Pager(EntryApply)
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

				this.pager.page = 0;
				this.pager.resetFilter();
				this.pager.enableHistory();




        //默认按照时间倒序排列。
        if (this.pager.getFilter("orderCreateTime").isEmpty()) {
          this.pager.setFilter("orderCreateTime", "DESC");
        }
        this.refresh();
        if (this.pager.getFilter("type").value) {
          this.isCUMT = true;
        } else {
          this.isCUMT = false;
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
        if(this.pager.getFilter('entryBatchId').value !== null) {
          //通过getFilter('entryBatchId')找到入驻申请中的筛选器，默认它的值为null，当选择之后它的ID不为null时找到勾选中的筛选器，将它的值赋为null
          this.pager.getFilter('archive').value = null;
        }

				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.enableHistory();
      if (this.pager.getFilter("orderCreateTime").isEmpty()) {
        this.pager.setFilter("orderCreateTime", "DESC");
      }
			//管理员默认查看非归档项目，对于普通用户而言本来数量就不多，默认显示所有的。
			if (this.pager.getFilter("archive").isEmpty() && this.user.hasPermissionAllSpace(this.FeatureType.ENTRY_APPLY_MANAGE)) {
				this.pager.setFilter("archive", false);
			}
      if (this.pager.getFilter("type").value) {
        this.isCUMT = true;
      } else {
        this.isCUMT = false;
      }

			this.refresh();
		}
	}
</script>
