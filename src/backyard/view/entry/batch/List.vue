<template>
	<div class="animated fadeIn">


		<div class="row mb10">
			<div class="col-md-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>批次列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/entry/batch/create')">
						<i class="fa fa-plus"></i>
						<span>创建批次</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-md-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-md-12">


				<div v-for="entryBatch in pager.entryBatches" class=" bg-white p10 mt10 cursor"
				     @click.stop.prevent="$router.push('/by/entry/batch/detail/'+entryBatch.id)">
					<div class="media">

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/entry/batch/edit/'+entryBatch.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>{{entryBatch.name}}</span>
								<span :class="'label label-'+entryBatch.getStatusStyle()">{{entryBatch.getStatusName()}}</span>
							</div>
							<div class="cell-description list-text-restriction">
								{{entryBatch.description}}
							</div>
							<div class="cell-content">
								<span class="mr10">开始时间:{{entryBatch.startTime | humanTime}}</span>
								<span class="mr10">结束时间:{{entryBatch.endTime | humanTime}}</span>
                <span class="mr10">园区地点:{{entryBatch.spaceRegional.name}}</span>
								<span class="mr10">创建时间:{{entryBatch.createTime | humanTime}}</span>
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
	import EntryBatch from  "../../../../common/model/entry/batch/EntryBatch"

	export default{
		data() {
			return {
				pager: new Pager(EntryBatch)
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
			}
		},
		components: {
			NbFilter,
			NbPager
		},
		mounted() {
			this.refresh();
		}
	}
</script>

