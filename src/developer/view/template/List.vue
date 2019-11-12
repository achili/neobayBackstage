<template>
	<div class="animated fadeIn template-list">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>模板</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/developer/template/create')">
						<i class="fa fa-plus"></i>
						<span>创建模板</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="template in pager.templates" class="bg-white p10 mt10 cursor br4"
				     @click.stop.prevent="$router.push('/developer/template/detail/'+template.id)">

					<div class="media">
						<div class="pull-right">
							<a title="编辑" class="btn-action"
							   @click.stop.prevent="$router.push('/developer/template/edit/'+template.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a v-show="false" title="删除" class="btn-action" @click.stop.prevent="template.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span class="ml5 f15">{{template.name}}</span>
								<span :class="'label label-'+template.getTypeStyle()">{{template.getTypeName()}}</span>
							</div>

							<div class="cell-description">{{template.description}}</div>
							<div class="cell-content">
								<span class="text-xs">创建于:{{template.createTime | humanTime}}</span>
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
	import {MessageBox, Notification} from 'element-ui';
	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../common/widget/NbPager.vue'
	import Template from '../../../common/model/template/Template'
	import Pager from  "../../../common/model/base/Pager"

	export default {

		data () {
			return {
				pager: new Pager(Template)
			}
		},
		components: {
			NbFilter,
			NbPager
		},

		methods: {

			switcher(template){
				let that = this;
				template.httpSwitcher(function () {
					that.refresh();
				});
			},
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
        this.pager.setFilter("orderId", "DESC");
				this.pager.httpFastPage();
			}
		},

		mounted(){
			this.pager.enableHistory();
			this.refresh()
		}
	}
</script>


<style lang="less" rel="stylesheet/less">

	.template-list {

	}


</style>
