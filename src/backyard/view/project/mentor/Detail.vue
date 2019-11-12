<template>
	<div class="animated fadeIn project-mentor-detail">


		<NbSlidePanel>

			<span slot="heading" class="text-success">
				<i class="fa fa-user"></i>
				基本信息
			</span>

			<div>
				<LoadingFrame :loading="projectMentor.detailLoading">

					<div class="media">
						<div class="pull-left">
							<img class="img-rounded img-lg" :src="projectMentor.avatar.url">
						</div>

						<div class="pull-right" v-if="user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,projectMentor.spaceRegional.id)">
							<button class="btn btn-sm btn-primary" @click="$router.push('/by/mentor/edit/'+ projectMentor.id)">
								<i class="fa fa-pencil"></i>
								编辑
							</button>
						</div>
						<div class="media-body">
							<div class="f18 bold mt10">
								{{projectMentor.name}}
							</div>

							<div class="mv10">
								关联用户：<UserProfileLink :user="projectMentor.user"/>
							</div>
							<div class="mv10">
								电话：{{projectMentor.phone}}
							</div>
							<div class="mv10">
								邮箱：{{projectMentor.email}}
							</div>
              <div class="mv10">
                园区地点：{{projectMentor.spaceRegional.name}}
              </div>
						</div>
						<div class="mt10">
							{{projectMentor.description}}
						</div>
					</div>

				</LoadingFrame>
			</div>


		</NbSlidePanel>

	</div>
</template>

<script>
	import {Notification} from 'element-ui';
	import Project from '../../../../common/model/project/Project'
	import ProjectMember from '../../../../common/model/project/ProjectMember'
	import ProjectFinancing from '../../../../common/model/project/ProjectFinancing'
	import NbTank from '../../../../common/widget/NbTank'
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
	import ProjectMentor from '../../../../common/model/project/ProjectMentor'
	import LoadingFrame from "../../widget/LoadingFrame";
	import UserProfileLink from "../../widget/UserProfileLink.vue";

	export default {

		data () {
			return {
				user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
				projectMentor: new ProjectMentor()
			}
		},
		components: {
			NbTank,
			NbSlidePanel,
			LoadingFrame,
			UserProfileLink
		},
		methods: {},
		mounted(){
			let that = this;
			this.projectMentor.id = this.$store.state.route.query.id;
			if (this.projectMentor.id) {
				this.projectMentor.httpDetail();
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.project-mentor-detail {
		.section-title {
			font-size: 17px;
			color: #333;
			font-weight: bold;
			padding-bottom: 10px;
			margin-bottom: 10px;
		}
		.description {
			text-indent: 2em;
			line-height: 22px;
		}
	}
</style>
