<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>轮播图列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/official/carousel/create')">
						<i class="fa fa-send"></i>
						<span>创建轮播图</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="(officialCarousel, index) in pager.officialCarousels" class="bg-white p10 mt10 border-radius-4">

					<div class="row">

						<div class="col-sm-4">
							<img class="img-rounded wp100" v-if="officialCarousel.image && officialCarousel.image.url" :src="officialCarousel.image.url">
						</div>
						<div class="col-sm-8">
							<div class="media">
								<div class="pull-left">

								</div>
								<div class="pull-right action-buttons mt2">
									<a title="上移" v-show="index > 0" @click.stop.prevent="officialCarousel.httpSort(officialCarousel.id , pager.officialCarousels[index - 1].sort , pager.officialCarousels[index - 1].id , officialCarousel.sort , refresh)">
										<i class="fa fa-arrow-up text-primary f20"></i>
									</a>
									<a title="下移" v-show="index < pager.officialCarousels.length - 1" @click.stop.prevent="officialCarousel.httpSort(officialCarousel.id , pager.officialCarousels[index + 1].sort , pager.officialCarousels[index + 1].id , officialCarousel.sort , refresh)">
										<i class="fa fa-arrow-down text-success f20"></i>
									</a>
									<a title="激活" v-show="officialCarousel.status === 'DISABLED'" @click.stop.prevent="unlock(officialCarousel)">
										<i class="fa fa-unlock text-primary f20"></i>
									</a>
									<a title="关闭" v-show="officialCarousel.status === 'OK'" @click.stop.prevent="lock(officialCarousel)">
										<i class="fa fa-lock text-warning f20"></i>
									</a>
									<a title="编辑" @click.stop.prevent="$router.push('/by/official/carousel/edit/'+officialCarousel.id)">
										<i class="fa fa-pencil text-info f20"></i>
									</a>
									<a href="javascript:void(0)" title="删除" @click.stop.prevent="officialCarousel.confirmDel(refresh)">
										<i class="fa fa-trash text-danger f20"></i>
									</a>
								</div>
								<div class="media-body">
									<div>

										<span class="label" :class="'label-'+officialCarousel.StatusMap[officialCarousel.status].style">{{officialCarousel.StatusMap[officialCarousel.status].name}}</span>

										<span class="f15">{{officialCarousel.name}}</span>
									</div>

									<div class="mv10">
										标题：{{officialCarousel.title}}
									</div>
									<div class="mv10">
										副标题：{{officialCarousel.subtitle}}
									</div>

									<div class="mv10">
										链接：
										<a :href="officialCarousel.url" target="_blank">
											{{officialCarousel.url}}
										</a>
									</div>
                  <div class="mv10">
                    园区地点：
                   {{officialCarousel.spaceRegional.name}}
                  </div>
									<span class="mr10">
										<i class="fa fa-clock-o"></i>
										{{officialCarousel.createTime | simpleDate}}
									</span>
								</div>
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
	import OfficialCarousel from  "../../../../common/model/official/OfficialCarousel"

	export default {

		data () {
			return {
				pager: new Pager(OfficialCarousel)
			}
		},
		components: {
			NbFilter,
			NbPager
		},
		computed: {},
		watch: {},
		methods: {
			unlock(officialCarousel){
				officialCarousel.httpStatus(officialCarousel.Status.OK, function () {
					officialCarousel.status = officialCarousel.Status.OK;
				});
			},
			lock(officialCarousel){
				officialCarousel.httpStatus(officialCarousel.Status.DISABLED, function () {
					officialCarousel.status = officialCarousel.Status.DISABLED;
				});
			},
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.setFilter("orderSort","DESC");
			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>
