<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">

				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>导出模板列表</span>
				</h2>
				<div class="pull-right mb5">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/export/meta/create')">
						<i class="fa fa-send"></i>
						<span>添加导出模板</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-xs-12">
				<div v-for="exportMeta in pager.exportMetas" class="col-xs-12 bg-white pv10 mt10 cursor"
				     @click.stop.prevent="$router.push('/by/export/meta/detail/' + exportMeta.id)">

					<div class="media">

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/export/meta/edit/'+ exportMeta.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="exportMeta.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>{{exportMeta.name}}</span>
							</div>
							<div class="cell-content">

								<span class="mr10">#{{exportMeta.id}}</span>
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

	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'

	import ExportMeta from '../../../../common/model/export/meta/ExportMeta'
	import Pager from '../../../../common/model/base/Pager'

	export default {

		data() {
			return {
				pager: new Pager(ExportMeta)
			}
		},

		components: {
			NbFilter,
			NbPager
		},

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
