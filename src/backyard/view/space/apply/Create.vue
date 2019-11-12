<template>
	<div class="animated fadeIn">
		<LoadingFrame :loading="spaceApply.detailLoading">
			<div class="row">
				<div class="col-md-12">
					<h2>
						<i class="fa fa-fire text-success"></i>
						<span v-show="!spaceApply.editMode">创建申请</span>
						<span v-show="spaceApply.editMode">修改申请</span>
					</h2>
				</div>
			</div>


			<div class="row">

        <div class="col-md-12 m-t-md">

					<NbSlidePanel>
					<span slot="heading" class="text-success f16">
						<i class="fa fa-leaf"></i>
						基本信息
					</span>
						<div slot="body">


							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">项目</label>
								<div class="col-md-9">
									<ProjectPagerSelection :activeProject="spaceApply.project" :initFilter="{'userId':user.id}"/>
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">项目名称</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="spaceApply.projectName">
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">公司名</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="spaceApply.companyName">
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">负责人姓名</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="spaceApply.leaderName">
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">负责人手机</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="spaceApply.leaderPhone">
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">负责人邮箱</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="spaceApply.leaderEmail">
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">团队人数</label>
								<div class="col-md-9">
									<input type="number" class="form-control" v-model="spaceApply.memberNum">
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">场地类型</label>
								<div class="col-md-9">
									<select class="form-control" v-model="spaceApply.type">
										<option v-for="type in spaceApply.getTypeList()" :value="type.value">
											{{type.name}}
										</option>
									</select>
								</div>
							</div>


							<div v-if="spaceApply.type === 'NURSERY'">
								<div class="row mt10">
									<label class="col-md-3 control-label mt5 compulsory">申请工位数</label>
									<div class="col-md-9">
										<input type="number" class="form-control" v-model="spaceApply.seatNum">
									</div>
								</div>
							</div>

							<div v-if="spaceApply.type !== 'NURSERY'">
								<div class="row mt10">
									<label class="col-md-3 control-label mt5 compulsory">申请面积（平方米）</label>
									<div class="col-md-9">
										<input type="number" class="form-control" v-model="spaceApply.area">
									</div>
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5">备注</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="spaceApply.spacePurpose">
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5">预计入驻日期</label>
								<div class="col-md-9">
									<el-date-picker
										v-model="spaceApply.estimatedTime"
										type="date"
										placeholder="选择日期时间">
									</el-date-picker>
								</div>
							</div>

							<div class="alert alert-danger mt20" v-show="spaceApply.errorMessage">
								{{spaceApply.errorMessage}}
							</div>


						</div>
					</NbSlidePanel>

				</div>

				<div class="col-md-12">
					<CreateSaveButton :entity="spaceApply" :callback="save"/>
				</div>

			</div>
		</LoadingFrame>
	</div>
</template>

<script>
	import NbTank from '../../../../common/widget/NbTank'
	import {Notification} from 'element-ui';
	import SpaceApply from  "../../../../common/model/space/SpaceApply"
	import ProjectPagerSelection from "../../project/Selection.vue";
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
	import LoadingFrame from "../../widget/LoadingFrame";
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"

	import $ from "jquery"

	export default {
		data () {
			return {
				user: this.$store.state.user,
				spaceApply: new SpaceApply()
			}
		},
		components: {
			NbTank,
			NbSlidePanel,
			ProjectPagerSelection,
			LoadingFrame,
			CreateSaveButton
		},
		computed: {},
		watch: {
			"spaceApply.project.id"(newVal, oldVal){
				this.spaceApply.projectName = this.spaceApply.project.name;
				this.spaceApply.memberNum = this.spaceApply.project.memberNum;
				this.spaceApply.companyName = this.spaceApply.project.registeredCompanyName;
				this.spaceApply.seatNum = this.spaceApply.project.memberNum;


			}
		},
		methods: {
			save(){

				let that = this;
				this.spaceApply.httpSave(function (response) {

					Notification.success({
						message: that.spaceApply.editMode ? '修改孵化器申请成功！' : '创建孵化器申请成功！'
					});
					that.$router.push({path: 'detail', query: { id: that.spaceApply.id }});

				});
			}
		},


		mounted(){

			let that = this;

			this.spaceApply.id = this.$store.state.route.query.id;

			this.spaceApply.leaderName = this.user.nickname;
			this.spaceApply.leaderPhone = this.user.phone;
			this.spaceApply.leaderEmail = this.user.email;

			if (this.spaceApply.id) {

				this.spaceApply.editMode = true;
				this.spaceApply.httpDetail();
			}
		}
	}

</script>
