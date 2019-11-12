<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">

				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>项目列表</span>
				</h2>
				<div class="pull-right mb10">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('create')">
						<i class="fa fa-plus"></i>
						<span>创建项目</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-md-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-md-12">

				<ProjectListCell v-for="project in pager.projects" :key="project.id" :project="project" :refreshCallback="refresh"/>

			</div>

			<div class="col-md-12 mt20">
				<NbPager :pager="pager" :callback="refresh"/>
			</div>

		</div>


	</div>
</template>
<script>
	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'
	import Pager from  "../../../common/model/base/Pager"
	import Project from  "../../../common/model/project/Project"
	import UserProfileLink from "../widget/UserProfileLink";
	import ProjectListCell from "./widget/ProjectListCell";

	export default{
		data () {
			return {
				pager: new Pager(Project),
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType
			}
		},
		components: {
			NbFilter,
			NbPager,
			UserProfileLink,
			ProjectListCell
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
    beforeMount() {
      if(!this.user.hasPermissionAllSpace(this.FeatureType.PROJECT_MANAGE)) {
        this.pager.removeFilter('projectMentorId');
      }
    },
		mounted(){

			this.pager.enableHistory();

			//默认按照时间倒序排列。
			if (this.pager.getFilter("orderId").isEmpty()) {
				this.pager.setFilter("orderId", "DESC");
			}


			this.refresh();
		}
	}
</script>
