<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="project.detailLoading">


					<div class="text-right">
						<a v-if="project.canEdit()" title="编辑" class="btn btn-success mb10"
						   @click.stop.prevent="$router.push({path: 'edit', query: { id: project.id }})">
							<i class="fa fa-pencil"></i>
							编辑
						</a>
					</div>

					<div class="row">

						<div class="col-md-12">
							<ProjectView :project="project"/>
						</div>

            <!--团队成员-->
            <div class="col-md-12">
              <ProjectAdministratorsList :project="project" v-if="user.hasPermissionSpace($store.state.FeatureType.PROJECT_MINE,project.spaceRegional.id)" :successCallback="operationCallback"></ProjectAdministratorsList>
            </div>

						<div class="col-md-12" v-if="$store.state.user.hasPermissionSpace($store.state.FeatureType.PROJECT_MANAGE,project.spaceRegional.id)">

							<!--大事记录-->
							<div ref="flowNode">
								<MessageNotifyView ref="messageNotifyView" :entity="project"/>
							</div>


							<!--操作面板-->
							<ProjectOperationPanel :project="project" :successCallback="operationCallback"/>

						</div>


						<div class="col-md-12 text-center" v-show="project.loading">
							<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
						</div>

					</div>
				</LoadingFrame>
			</div>
			<div class="col-md-12 text-right">
				<button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
					<i class="fa fa-arrow-left"></i>
					返回
				</button>
			</div>
		</div>

	</div>
</template>
<script>
	import {MessageBox, Notification as NotificationBox} from 'element-ui'
	import Project from '../../../common/model/project/Project'
	import ProjectMentor from '../../../common/model/project/ProjectMentor'
	import ProjectFinancing from '../../../common/model/project/ProjectFinancing'
	import NbTank from '../../../common/widget/NbTank'
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
	import NbBtnDropdown from  "../../../common/widget/NbBtnDropdown.vue";
	import LoadingFrame from "../widget/LoadingFrame";
	import CreateSaveButton from "../widget/CreateSaveButton.vue"
	import UserProfileLink from "../widget/UserProfileLink";
	import ProjectView from "./widget/ProjectView";
	import {simpleDateTime, simpleDate} from "../../../common/filter/time";
	import MessageNotifyView from "../message/notify/MessageNotifyView";
	import ProjectOperationPanel from "./widget/ProjectOperationPanel";
	import {smoothScroll} from "../../../common/util/AnimationUtils";
  import ProjectAdministratorsList from "./administrator/List.vue";

	export default {

		data () {
			return {
				user: this.$store.state.user,
				project: new Project(),
				submitErrorMessage: null
			}
		},
		components: {
			NbTank,
			NbSlidePanel,
			NbBtnDropdown,
			LoadingFrame,
			CreateSaveButton,
			UserProfileLink,
			ProjectView,
			MessageNotifyView,
			ProjectOperationPanel,
      ProjectAdministratorsList
		},
		computed: {},
		methods: {
			fetchDetail(){
				let that = this;
				this.project.id = this.$store.state.route.query.id;
				if (this.project.id) {
					this.project.httpDetail(function () {
            that.project.currentAttachments = [].concat(that.project.attachments);
          });
				}
			},
			refreshEvent(){

				if (this.$refs.messageNotifyView) {

					this.$refs.messageNotifyView.refresh();

				}
			},
			submit(){

			},
			operationCallback(){
				let that = this;
        this.fetchDetail();
				smoothScroll(this.$refs.flowNode);
				that.refreshEvent();
			},
			superSubmit(){
				let that = this;
				if (!this.project.id) {
					NotificationBox.error({
						message: '缺少指定项目！'
					});
					return;
				}
				this.project.httpManageSave(function (response) {
					NotificationBox.success({
						message: '修改成功！'
					});
					that.project.render(that.project.getTAG())
				});
			}
		},
		mounted(){
			this.fetchDetail();
			this.refreshEvent();
		}
	}
</script>
