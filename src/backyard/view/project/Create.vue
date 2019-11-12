<template>
	<div class="animated fadeIn">

		<LoadingFrame :loading="project.detailLoading">
			<div class="row">
				<div class="col-xs-12">
					<h2>
						<i class="fa fa-fire text-success"></i>
						<span v-show="!project.editMode">新建项目</span>
						<span v-show="project.editMode">编辑项目</span>
					</h2>
				</div>
			</div>


			<div class="row">
				<div class="col-md-12 m-t-md">
					<CreateSaveButton :entity="project" :callback="save"/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 mt10">
					<NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-leaf"></i>
              基本信息
            </span>
						<div slot="body">

							<!--在修改的时候入驻申请不允许重新选择。-->
							<div class="row mt10" v-show="!project.editMode">
								<label class="col-md-3 control-label mt5 compulsory">入驻申请</label>
								<div class="col-md-9">
									<EntryApplyPagerSelection :activeEntryApply="project.entryApply"
									                          :initFilter="{'userId':user.id,'status':'FINAL_REVIEW_PASS','archive':false}"/>
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">项目名称</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="project.name">
								</div>
							</div>

							<div class="row mt10">
                <label class="col-md-3 control-label mt5">负责人</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="project.leader">
								</div>
							</div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5">负责人联系方式</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="project.leaderPhone">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5">负责人邮箱</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="project.leaderEmail">
                </div>
              </div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">团队成员数</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="project.memberNum">
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">项目来源</label>
								<div class="col-md-9">

									<div class="row">
										<div class="col-md-3 col-xs-6 mt5" v-for="item in ['产学研','自主研发','海外引进','技术转移']">
											<NbRadio v-model="project.projectSource" :val="item" name="projectSource"></NbRadio>
											<span class="f13 "> {{item}} </span>
										</div>
									</div>
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">专业技术方向</label>
								<div class="col-md-9">

									<div class="row">
										<div class="col-md-3 col-xs-6 mt5"
										     v-for="item in ['生物医药和医疗器械','地球、空间和海洋','电子信息','先进制造','航空航天','现代交通','新材料','新能源与节能','核应用技术','环境保护','现代农业','其他']">
											<NbRadio v-model="project.technologyDirection" :val="item" name="technologyDirection"></NbRadio>
											<span class="f13 "> {{item}} </span>
										</div>
									</div>
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">市场分类</label>
								<div class="col-md-9">

									<div class="row">
										<div class="col-md-3 col-xs-6" v-for="item in ['大数据','移动互联网','大医疗','智能硬件']">
											<NbCheck v-model="project.marketTypes" :val="item"></NbCheck>
											<span class="f13 "> {{item}} </span>
										</div>
									</div>
								</div>
							</div>


							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">是否已注册公司</label>
								<div class="col-md-9">
                        <span>
                          <NbRadio v-model="project.isRegisteredCompany" :val="true"
                                   :name="'isRegisteredCompany'"></NbRadio>
                          <label>是</label>
                        </span>
									<span class="ml15">
                          <NbRadio v-model="project.isRegisteredCompany" :val="false"
                                   :name="'isRegisteredCompany'"></NbRadio>
                          <label>否</label>
                        </span>
								</div>
							</div>


							<div class="row mt10" v-show="project.isRegisteredCompany">
								<label class="col-md-3 control-label mt5 compulsory">注册公司名称</label>
								<div class="col-md-9">
									<input type="text" class="form-control" placeholder="请填写工商注册信息下的公司名称，如未注册公司填‘无’"
									       v-model="project.registeredCompanyName">
								</div>
							</div>

							<div class="row mt10" v-show="project.isRegisteredCompany" onclick="">
								<label class="col-md-3 control-label mt5 compulsory">注册公司时间</label>
								<div class="col-md-9">
									<el-date-picker v-model="project.registeredCompanyTime" type="date"
									                placeholder="选择日期时间"></el-date-picker>
								</div>
							</div>

              <div class="row mt10" v-show="project.isRegisteredCompany">
                <label class="col-md-3 control-label mt5 compulsory">注册公司地址</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="project.registeredCompanyAddress">
                </div>
              </div>

              <div class="row mt10" v-show="project.isRegisteredCompany" onclick="">
                <label class="col-md-3 control-label mt5 compulsory">工商营业执照照片</label>
                <div class="col-md-9">
                  <NbTank :tank="project.businessLicense"/>
                </div>
              </div>

              <div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">项目简介</label>
								<div class="col-md-9">
                  <textarea class="form-control" rows="6" v-model="project.description"
                            placeholder="此处填写项目描述……"></textarea>
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">项目执行进度计划</label>
								<div class="col-md-9">
                  <textarea class="form-control" rows="6" v-model="project.implementation"
                            placeholder="项目执行进度计划……"></textarea>
								</div>
							</div>

							<div class="row mt10">
								<label class="col-md-3 control-label mt5 compulsory">商业计划书</label>
								<div class="col-md-9">
									<NbTank :tank="project.businessPlan"/>
								</div>
							</div>

						</div>
					</NbSlidePanel>
				</div>

				<div class="col-md-12 mt20">
					<NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-users"></i>
              项目团队
            </span>
						<div slot="body">
							<NbSlidePanel type="primary" v-for="(projectMember, index) in project.projectMembers"
							              :key="projectMember.name">
                <span slot="heading" class="">
                  <i class="fa fa-user"></i>
                  项目团队成员{{index + 1}}信息
                </span>
								<div slot="body">

									<div class="row">


										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">姓名</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.name">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5">部门</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.department">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">职位</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.position">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5">电话</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.telephone">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5">传真</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.fax">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">手机</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.phone">
												</div>
											</div>
										</div>


										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">Email</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.mail">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">证件类型</label>
												<div class="col-md-8">
													<select v-model="projectMember.docType" class="form-control">
														<option value="身份证">身份证</option>
														<option value="军人证">军人证</option>
														<option value="护照">护照</option>
														<option value="组织机构代码证">组织机构代码证</option>
														<option value="其他">其他</option>
													</select>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">证件号码</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.docNo">
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5">目前最高职称</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.highestTitle">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5">初次工作年份</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="projectMember.firstWorkingYear">
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">创业者特征</label>
												<div class="col-md-8">
													<select v-model="projectMember.features" class="form-control">
														<option value="大学生创业">大学生创业</option>
														<option value="留学归国人员">留学归国人员</option>
														<option value="高校科研人员">高校科研人员</option>
														<option value="大企业离职人员">大企业离职人员</option>
														<option value="机关事业单位离职人员">机关事业单位离职人员</option>
														<option value="其他">其他</option>
													</select>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">学历</label>
												<div class="col-md-8">
													<select v-model="projectMember.education" class="form-control">
														<option value="中专">中专</option>
														<option value="大专">大专</option>
														<option value="本科">本科</option>
														<option value="硕士">硕士</option>
														<option value="博士">博士</option>
														<option value="其他">其他</option>
													</select>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10 mb8">
												<label class="col-md-4 control-label mt5 compulsory">是否本公司股东</label>
												<div class="col-md-8">
                          <span>
                            <NbRadio v-model="projectMember.isShareholder" :val="true"
                                     :name="'isShareholder'+index"></NbRadio>
                            <label>是</label>
                          </span>
													<span class="ml15">
                            <NbRadio v-model="projectMember.isShareholder" :val="false"
                                     :name="'isShareholder'+index"></NbRadio>
                            <label>否</label>
                          </span>
												</div>
											</div>
										</div>


										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">是否实际负责人</label>
												<div class="col-md-8">
                          <span>
                            <NbRadio v-model="projectMember.isPersonLiable" :val="true"
                                     :name="'isPersonLiable'+index"></NbRadio>
                            <label>是</label>
                          </span>
													<span class="ml15">
                            <NbRadio v-model="projectMember.isPersonLiable" :val="false"
                                     :name="'isPersonLiable'+index"></NbRadio>
                            <label>否</label>
                          </span>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">是否连续创业</label>
												<div class="col-md-8">
                          <span>
                            <NbRadio v-model="projectMember.isContinuous" :val="true"
                                     :name="'isContinuous'+index"></NbRadio>
                            <label>是</label>
                          </span>
													<span class="ml15">
                            <NbRadio v-model="projectMember.isContinuous" :val="false"
                                     :name="'isContinuous'+index"></NbRadio>
                            <label>否</label>
                          </span>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">是否海外引进</label>
												<div class="col-md-8">
                          <span>
                            <NbRadio v-model="projectMember.isOverseas" :val="true"
                                     :name="'isOverseas'+index"></NbRadio>
                            <label>是</label>
                          </span>
													<span class="ml15">
                            <NbRadio v-model="projectMember.isOverseas" :val="false"
                                     :name="'isOverseas'+index"></NbRadio>
                            <label>否</label>
                          </span>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">是否浦江人才</label>
												<div class="col-md-8">
                          <span>
                            <NbRadio v-model="projectMember.isPujiangTalent" :val="true"
                                     :name="'isPujiangTalent'+index"></NbRadio>
                            <label>是</label>
                          </span>
													<span class="ml15">
                            <NbRadio v-model="projectMember.isPujiangTalent" :val="false"
                                     :name="'isPujiangTalent'+index"></NbRadio>
                            <label>否</label>
                          </span>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">是否千人计划</label>
												<div class="col-md-8">
                          <span>
                            <NbRadio v-model="projectMember.isThousandPlan" :val="true"
                                     :name="'isThousandPlan'+index"></NbRadio>
                            <label>是</label>
                          </span>
													<span class="ml15">
                            <NbRadio v-model="projectMember.isThousandPlan" :val="false"
                                     :name="'isThousandPlan'+index"></NbRadio>
                            <label>否</label>
                          </span>
												</div>
											</div>
										</div>


										<div class="col-md-6" v-if="projectMember.isThousandPlan">
											<div class="row mt10">
												<label class="col-md-4 control-label mt5 compulsory">千人计划批次号</label>
												<div class="col-md-8">
													<input type="text" v-model="projectMember.thousandPlanCode"
													       class="form-control">
												</div>
											</div>
										</div>

										<div class="col-md-12">
											<div class="row mt10">
												<label class="col-md-2 control-label mt5">简历</label>
												<div class="col-md-10">
													<NbTank :tank="projectMember.resume"/>
												</div>
											</div>
										</div>
									</div>

									<div class="col-md-12 text-center mt10">
										<button class="btn btn-danger" role="button" @click="confirmDeleteMember(projectMember)">
											<i class="fa fa-trash"></i> 删除成员

										</button>
									</div>
								</div>

							</NbSlidePanel>
						</div>
						<div class="col-md-12 text-center">
							<button class="btn btn-success" role="button" @click="addProjectMember">
								<i class="fa fa-plus"></i> 增加成员

							</button>
						</div>
					</NbSlidePanel>
				</div>


				<div class="col-md-12 mt20">
					<NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-diamond"></i>
              投资信息
            </span>
						<div slot="body">
							<NbSlidePanel type="primary" v-for="(projectFinancing, index) in project.projectFinancings"
							              :key="projectFinancing.investmentPeople">
                <span slot="heading" class="">
                  <i class="fa fa-user"></i>
                  投资成员信息 #{{index + 1}}
                </span>
								<div slot="body">


									<div class="col-md-6">
										<div class="row mt10">
											<label class="col-md-4 control-label mt5 compulsory">投资人(方)</label>
											<div class="col-md-8">
												<input type="text" class="form-control"
												       v-model="projectFinancing.investmentPeople">
											</div>
										</div>
									</div>

									<div class="col-md-6">
										<div class="row mt10">
											<label class="col-md-4 control-label mt5 compulsory">投资金额(万元)</label>
											<div class="col-md-8">
												<input type="number" class="form-control"
												       v-model="projectFinancing.investmentValue">
											</div>
										</div>
									</div>

									<div class="col-md-6">
										<div class="row mt10">
											<label class="col-md-4 control-label mt5 compulsory">占股权比例(%)</label>
											<div class="col-md-8">
												<input type="number" class="form-control" placeholder="无须输入%号"
												       v-model="projectFinancing.equityRatio">
											</div>
										</div>
									</div>

									<div class="col-md-6">
										<div class="row mt10">
											<label class="col-md-4 control-label mt5 compulsory">投资时间</label>
											<div class="col-md-8">
												<el-date-picker v-model="projectFinancing.investmentTime" type="date"
												                placeholder="选择日期时间"></el-date-picker>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-12 text-center mt10">
									<button class="btn btn-danger" role="button" @click="confirmDeleteFinancing(projectFinancing)">
										<i class="fa fa-trash"></i> 删除投资成员

									</button>
								</div>
							</NbSlidePanel>
						</div>
						<div class="col-md-12 text-center">
							<button class="btn btn-success" role="button" @click="addProjectFinancing">
								<i class="fa fa-plus"></i> 增加投资成员

							</button>
						</div>
					</NbSlidePanel>
				</div>


			</div>


			<div class="row">
				<div class="col-md-12 m-t-md">
					<div class="alert alert-danger" v-show="project.errorMessage">
						{{project.errorMessage}}

					</div>
					<div>
						<CreateSaveButton :entity="project" :callback="save"/>
						<button class="btn btn-success pull-right mr5" @click="saveLocalData" v-show="!project.editMode">
							<i class="fa fa-save"></i>
							本地保存
						</button>
					</div>
				</div>
			</div>
		</LoadingFrame>
	</div>
</template>
<script>
	import NbTank from '../../../common/widget/NbTank'
	import NbCheck from '../../../common/widget/NbCheckbox'
	import EntryApplyPagerSelection from "../entry/apply/Selection.vue";
	import {simpleDateTime, str2Date} from '../../../common/filter/time'
	import {Notification, MessageBox} from 'element-ui';
	import NbRadio from '../../../common/widget/NbRadio'
	import Project from '../../../common/model/project/Project'
	import ProjectMember from '../../../common/model/project/ProjectMember'
	import ProjectFinancing from '../../../common/model/project/ProjectFinancing'
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
	import CreateSaveButton from "../widget/CreateSaveButton.vue"
	import LoadingFrame from "../widget/LoadingFrame";
	import $ from "jquery"

	export default {

		data () {
			return {
				user: this.$store.state.user,
				project: new Project()
			}
		},
		components: {
			EntryApplyPagerSelection,
			NbRadio,
			NbCheck,
			NbTank,
			NbSlidePanel,
			CreateSaveButton,
			LoadingFrame
		},
		computed: {},
		watch: {
			"project.entryApply.id"(newVal, oldVal){
        if (!this.project.editMode) {
          this.project.fillByEntryApply()
        }
			}
		},
		methods: {
			//保存功能
			saveLocalData () {
				this.project.errorMessage = null;
				this.project.saveToLocalStorage();
				Notification.success({
					message: '保存成功！'
				});
			},
			save(){
				let that = this;
				this.project.errorMessage = null;
				this.project.httpSave(function (response) {
					Notification.success({
						message: that.project.editMode ? '修改项目成功！' : '创建项目成功！'
					});
					that.$router.push({path: 'detail', query: { id: that.project.id }});
				});
			},
			fetchDetail(){
				let that = this;
				this.project.httpDetail(function (response) {
					let MarketTypes = [];
					for (let i = 0; i < that.project.marketTypes.length; i++) {
						if (MarketTypes.indexOf(that.project.marketTypes[i]) === -1) MarketTypes.push(that.project.marketTypes[i]);
					}
					that.project.marketTypes = MarketTypes.concat();
				});

			},
			addProjectMember () {
				let projectMember = new ProjectMember();
				this.project.addProjectMember(projectMember);
			},
			//确认删除团队成员
			confirmDeleteMember(projectMember){
				let that = this;
				MessageBox.confirm('确定删除此团队成员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
					that.project.subProjectMember(projectMember);
				}, function () {
				});
			},
			addProjectFinancing () {
				let projectFinancing = new ProjectFinancing();
				this.project.addProjectFinancing(projectFinancing);
			},
			//确认删除团队成员
			confirmDeleteFinancing(projectFinancing){
				let that = this;
				MessageBox.confirm('确定删除此团队成员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
					that.project.subProjectFinancing(projectFinancing);
				}, function () {
				});
			}
		},
		mounted(){
			let that = this;
			if (this.project.projectMembers.length === 0) {
				this.addProjectMember();
			}
			if (this.project.projectFinancings.length === 0) {
				this.addProjectFinancing();
			}
			this.project.id = this.$store.state.route.query.id;
			if (this.project.id) {
				this.project.editMode = true;
				this.fetchDetail()
			} else {
				this.project.renderFromLocalStorage();

				if (!this.project.leader) {
					this.project.leader = this.user.nickname;
          this.project.leaderPhone = this.user.phone;
          this.project.leaderEmail = this.user.email;
				}
			}
		}
	}


</script>
