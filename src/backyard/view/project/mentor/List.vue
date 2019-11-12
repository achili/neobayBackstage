<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">

				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>社区经理列表</span>
				</h2>
				<div class="pull-right mb10">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/mentor/create')">
						<i class="fa fa-plus"></i>
						<span>创建社区经理</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="projectMentor in pager.projectMentors" class="bg-white p10 mt10 cursor br4"
				     @click.stop.prevent="$router.push({path: '/by/mentor/detail', query: { id: projectMentor.id }})">

					<div class="media">

						<div class="pull-left">
							<img class="img-rounded img-md" v-if="projectMentor.avatar" :src="projectMentor.avatar.url"/>
						</div>

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/mentor/edit/'+projectMentor.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="projectMentor.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div>
								<span class="f15"> {{projectMentor.name}}</span>
							</div>
              <small class="block m-t-xs m-b-xs text-muted list-text-restriction">{{projectMentor.description}}</small>
              <span class="mr10">关联的用户:<UserProfileLink :user="projectMentor.user"/></span>
							<span class="mr10">社区经理电话:{{projectMentor.phone}}</span>
							<span class="mr10">社区经理邮箱:{{projectMentor.email}}</span>
              <span class="mr10">园区地点:{{projectMentor.spaceRegional.name}}</span>
						</div>
					</div>
				</div>

			</div>


			<div class="col-xs-12 mt20">
				<NbPager :pager="pager" :callback="refresh"/>
			</div>

		</div>


	</div>
</template>
<script>
	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'
	import Pager from  "../../../../common/model/base/Pager"
	import Mentor from  "../../../../common/model/project/ProjectMentor"
  import UserProfileLink from "../../widget/UserProfileLink";

	export default{
		data () {
			return {
				pager: new Pager(Mentor)
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
				if (to.fullPath !== from.fullPath) {
					this.reset();
					this.refresh();
				}
			}
		},
		methods: {
			reset(){
				this.pager.page = 0;
				this.pager.resetFilter();
				this.pager.enableHistory();
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
			this.pager.enableHistory();
			this.refresh();
		}
	}
</script>




















