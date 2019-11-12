<template>
	<div class="animated fadeIn">

		<LoadingFrame :loading="projectMentor.detailLoading">
			<div class="row">
				<div class="col-md-12">
					<h2>
						<i class="fa fa-fire text-success"></i>
						<span v-show="!projectMentor.editMode">新建社区经理</span>
						<span v-show="projectMentor.editMode">编辑社区经理</span>
					</h2>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12 mt10">
					<NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-leaf"></i>
              社区经理信息

            </span>
						<div slot="body">

              <div class="row">
                <label class="col-md-2 control-label mt5 compulsory">园区地点</label>
                <div class="col-md-10">
                  <SpaceRegionalSelection :spaceRegional="projectMentor.spaceRegional" :editMode="projectMentor.editMode"></SpaceRegionalSelection>
                </div>
              </div>

							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">关联用户</label>
								<div class="col-md-10">
									<UserPagerSelection :activeUser="projectMentor.user"/>
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">头像</label>
								<div class="col-md-10">
									<NbTank :tank="projectMentor.avatar"/>
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">姓名</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="projectMentor.name">
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">电话</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="projectMentor.phone">
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">邮箱</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="projectMentor.email">
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">简介</label>
								<div class="col-md-10">
                  <textarea class="form-control" rows="6" v-model="projectMentor.description"
                            placeholder="此处填写社区经理简介……"></textarea>
								</div>
							</div>

							<div class="row mt10">
								<div class="col-md-12 m-t-md">
									<CreateSaveButton :entity="projectMentor" :callback="save"/>
								</div>
							</div>


						</div>
					</NbSlidePanel>
				</div>

			</div>
		</LoadingFrame>

	</div>
</template>
<script>
	import NbTank from '../../../../common/widget/NbTank'
	import NbCheck from '../../../../common/widget/NbCheckbox'
	import UserPagerSelection from "../../user/Selection.vue";
	import {simpleDateTime, str2Date} from '../../../../common/filter/time'
	import {Notification, MessageBox} from 'element-ui';
	import NbRadio from '../../../../common/widget/NbRadio'
	import ProjectMentor from '../../../../common/model/project/ProjectMentor'
	import ProjectMember from '../../../../common/model/project/ProjectMember'
	import ProjectFinancing from '../../../../common/model/project/ProjectFinancing'
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
	import LoadingFrame from "../../widget/LoadingFrame";
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"
	import $ from "jquery"
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

  export default {

		data () {
			return {
				projectMentor: new ProjectMentor()
			}
		},
		components: {
			UserPagerSelection,
			NbRadio,
			NbCheck,
			NbTank,
			NbSlidePanel,
			LoadingFrame,
			CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {
			"projectMentor.user.id"(){
				//选择了一位用户的时候，尝试去更新。
				if (!this.projectMentor.editMode) {
					this.projectMentor.avatar.render(this.projectMentor.user.avatar);
					this.projectMentor.name = this.projectMentor.user.nickname;
					this.projectMentor.email = this.projectMentor.user.email;
					this.projectMentor.phone = this.projectMentor.user.phone;
					this.projectMentor.description = this.projectMentor.user.description;
				}
			}
		},
		methods: {
			save(){
				let that = this;
				this.projectMentor.httpSave(function (response) {

					Notification.success({
						message: that.projectMentor.editMode ? '修改项目成功！' : '创建项目成功！'
					});
					that.$router.push({path: '/by/mentor/detail', query: { id: that.projectMentor.id }});

				});
			},
			fetchDetail(){

				let that = this;
				this.projectMentor.httpDetail();

			}
		},

		mounted(){

			let that = this;

			this.projectMentor.id = this.$store.state.route.params.id;

			if (this.projectMentor.id) {

				this.projectMentor.editMode = true;
				this.fetchDetail()
			}
		}
	}


</script>
