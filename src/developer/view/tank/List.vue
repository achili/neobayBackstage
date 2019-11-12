<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">

				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>文件列表</span>
				</h2>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="tank in pager.tanks" class="bg-white p10 br4 mt10 cursor">

					<div class="media">

						<div class="media-body">
							<div class="cell-title">
								<span>{{tank.name}}</span>
							</div>
							<div class="cell-description">
								<small>{{tank.type}}</small>

							</div>
							<div class="cell-content">
								<span class="mr10">#{{tank.id}}</span>
								<span class="mr10">创建于: {{tank.createTime | simpleDateTime}}</span>
								<span class="mr10">大小: {{Math.floor(tank.size / 1024)}}kB</span>
								<span v-show="!tank.privacy" class="label label-info">公有</span>
								<span v-show="tank.privacy" class="label label-warning">私有</span>
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
	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'
	import Pager from  "../../../common/model/base/Pager"
	import Tank from  "../../../common/model/tank/Tank"

	export default {

		data(){
			return {
				pager: new Pager(Tank)
			}
		},
		components: {
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
