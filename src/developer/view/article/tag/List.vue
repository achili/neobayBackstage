<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>标签列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/developer/article/tag/create')">
						<i class="fa fa-plus"></i>
						<span>创建标签</span>
					</button>
				</div>
			</div>
		</div>


		<div class="row">
			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="articleTag in pager.articleTags" class="bg-white p10 br4 mt10 cursor"
				     @click.stop.prevent="$router.push('/developer/article/tag/detail/'+articleTag.id)">
					<div class="media">

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/developer/article/tag/edit/'+articleTag.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="articleTag.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>

						<div class="media-body">
							<div class="cell-title">
								<span>{{articleTag.name}}</span>
							</div>
							<div class="cell-description">
								<span>{{articleTag.description}}</span>
							</div>
							<div class="cell-content">
								<span class="mr10">#{{articleTag.id}}</span>
								<span class="mr10"><i class="fa fa-clock-o"></i> {{articleTag.createTime | humanTime}}</span>
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

	import Pager from  "../../../../common/model/base/Pager"
	import ArticleTag from  "../../../../common/model/article/ArticleTag"
	export default {

		data () {
			return {
				pager: new Pager(ArticleTag)
			}
		},
		components: {
			NbFilter,
			NbPager

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
		mounted() {
			this.refresh();
		}
	}

</script>
