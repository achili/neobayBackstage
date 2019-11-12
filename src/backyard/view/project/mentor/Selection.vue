<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeProjectMentor">

			<span slot="title">
				<span v-if="activeProjectMentor.id">
					<img class="img-md img-circle" :src="activeProjectMentor.avatar.url" v-if="activeProjectMentor.avatar.url"/>
					<span class="ml10">
						{{activeProjectMentor.name}}
					</span>
				</span>
				<span v-else>
					无社区经理...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeProjectMentor !== null && activeProjectMentor.name !== null" @click="clear"></i>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="projectMentor in pager.projectMentors"
			     @click.stop.prevent="clickItem(projectMentor)"
			     :class="{'bg-white':projectMentor.id !== activeProjectMentor.id,'bg-azure':projectMentor.id === activeProjectMentor.id}"
			     slot="cells">

				<div class="media">

					<div class="pull-left">
						<img class="img-rounded img-md" v-if="projectMentor.avatar" :src="projectMentor.avatar.url"/>
					</div>

					<div class="media-body pl10">
						<div class="cell-title">
							<span> {{projectMentor.name}}</span>
						</div>
						<div class="cell-description">
							{{projectMentor.description}}
						</div>
						<div class="cell-content">
							<span class="mr10">电话:{{projectMentor.phone}}</span>
							<span class="mr10">邮箱:{{projectMentor.email}}</span>
						</div>

					</div>

				</div>

			</div>
		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import ProjectMentor from "../../../../common/model/project/ProjectMentor";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(ProjectMentor, 5)

			}
		},
		props: {
			activeProjectMentor: {
				type: ProjectMentor,
				required: true
			}
		},
		watch: {
			"activeProjectMentor.id"(newVal, oldVal){
				this.httpUpdateActiveProjectMentor();
			}
		},
		methods: {
			clickItem(projectMentor){
				this.activeProjectMentor.render(projectMentor);
			},
			httpUpdateActiveProjectMentor(){
				//如果传过来的activeProjectMentor只有id没有其他内容，我们将要负责去获取其详细内容。
				if (this.activeProjectMentor.id && !this.activeProjectMentor.title) {
					this.activeProjectMentor.httpDetail();
				}
			},
      clear() {
        this.activeProjectMentor.render(new ProjectMentor());
      }
		},
		components: {
			NbPagerSelection
		},
		mounted(){
			this.httpUpdateActiveProjectMentor();

		}
	}
</script>
