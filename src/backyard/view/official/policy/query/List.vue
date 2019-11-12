<template>
	<div class="animated fadeIn official-policy-query-preview">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>政策咨询列表</span>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-xs-12">
				<div v-for="officialPolicyQuery in pager.officialPolicyQueries" class="bg-white p10 mt10 cursor br4"
				     @click.stop.prevent="$router.push('/by/official/policy/query/detail/' + officialPolicyQuery.id)">

					<div class="media">

						<div class="pull-right action-buttons">
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="officialPolicyQuery.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
              <div class="cell-title">
                <span class="mr10">主要问题:{{officialPolicyQuery.title}}</span>
                <span :class="'label label-'+officialPolicyQuery.getStatusStyle()">{{officialPolicyQuery.getStatusName()}}</span>
              </div>
							<div class="cell-description" >
                <span class="mr10">#{{officialPolicyQuery.id}}</span>
                <span class="mr10">问题描述:{{officialPolicyQuery.content}}</span>
							</div>
              <div class="cell-content">
                <span class="mr10" v-if="officialPolicyQuery.remark">备注:{{officialPolicyQuery.remark}}</span>
                <span class="mr10">创建时间:{{officialPolicyQuery.createTime | humanTime}}</span>
                <span class="mr10">联系方式:{{officialPolicyQuery.phone}}</span>
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

	import Pager from  "../../../../../common/model/base/Pager"
	import OfficialPolicyQuery from  "../../../../../common/model/official/OfficialPolicyQuery"

	export default {

		data () {
			return {
				pager: new Pager(OfficialPolicyQuery)
			}
		},
		components: {
			NbFilter,
			NbPager
		},
		computed: {},
		watch: {},
    prop:{},
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

			if(this.pager.getFilter("orderId").isEmpty()){
        this.pager.setFilter("orderId", "ASC");
      }

      if(this.pager.getFilter("status").isEmpty()){
        this.pager.setFilter("status",OfficialPolicyQuery.prototype.Status.UNTREATED);
      }

			this.refresh();
		}
	}

</script>
<style lang="less" rel="stylesheet/less">
.official-policy-query-preview {
  .cell-description {
    margin-top: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
    line-height: 18px;
    max-height: 72px;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
  }
}
</style>
