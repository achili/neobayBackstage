<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeProject" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeProject.name&&activeProject.id">
					{{activeProject.name}}
				</span>
				<span v-else>
					请选择一个项目...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeProject !== null && activeProject.name !== null" @click="clear"></i>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="project in pager.projects"
			     @click.stop.prevent="clickItem(project)"
			     :class="{'bg-white':project.id !== activeProject.id,'bg-azure':project.id === activeProject.id}"
			     slot="cells">
				<div>
					<span class="f15">{{project.name}}</span>
					<span :class="'label label-'+project.getStatusStyle()">{{project.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../common/model/base/Pager";
	import Project from "../../../common/model/project/Project";
	import NbPagerSelection from "../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(Project, 5),
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user
			}
		},
		props: {
			activeProject: {
				type: Project,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(project){
				this.activeProject.render(project);
			},
      clear(){
        this.activeProject.render(new Project());
      }

		},
		components: {
			NbPagerSelection
		},
    beforeMount() {
      if(!this.user.hasPermissionAllSpace(this.FeatureType.PROJECT_MANAGE)) {
        this.pager.removeFilter('projectMentorId');
      }
    },
		mounted(){


		}
	}
</script>
