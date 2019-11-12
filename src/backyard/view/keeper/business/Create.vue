<template>
	<div class="animated fadeIn keeper-business-create">
		<LoadingFrame :loading="keeperBusiness.detailLoading">

			<div class="row">
				<div class="col-md-12"><h1 class="text-center">申请企业管家服务</h1></div>
				<div class="col-md-12 text-center mv40">
					<el-steps :active="active" finish-status="success">
						<el-step title="选择服务"></el-step>
						<el-step title="填写服务信息"></el-step>
					</el-steps>
				</div>
			</div>

			<div class="row" v-show="active === 0">
				<div class="col-md-12">
					<NbSlidePanel>
            <span slot="heading">
              <i class="fa fa-dot-circle-o"></i>
              <span>选择服务类型</span>
            </span>
						<span slot="body">
              <businessTypeSelection :activeKeeperBusinessType="keeperBusiness.businessType"/>
            </span>

					</NbSlidePanel>
				</div>
			</div>

			<div class="row" v-if="active === 1">

				<div class="col-md-12">
					<NbSlidePanel>
            <span slot="heading">
              <i class="fa fa-dot-circle-o"></i>
              <span>服务的机构</span>
            </span>
						<div slot="body">

							<div class="row">
								<label class="col-md-2 control-label mt5 compulsory">服务机构</label>
								<div class="col-md-10">
									<OrganizationSelection :activeKeeperBusinessOrganization="keeperBusiness.organization"
									                       :businessType="keeperBusiness.businessType"/>
								</div>
							</div>


            </div>
					</NbSlidePanel>

				</div>

				<div class="col-md-12">
					<NbSlidePanel>
            <span slot="heading">
              <i class="fa fa-dot-circle-o"></i>
              <span>基本信息</span>
            </span>
						<div slot="body">
							<div class="form-group">
								<div class="row">
									<label class="col-md-2 control-label mt5 compulsory">项目</label>
									<div class="col-md-10">
										<ProjectPagerSelection :activeProject="keeperBusiness.project" :initFilter="{'userId':user.id}"/>
									</div>
									<label class="col-md-2 control-label mt15 compulsory">项目名称</label>
									<div class="col-md-10 mt10">
										<input type="text" class="form-control" v-model="keeperBusiness.projectName"/>
									</div>
								</div>
								<div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">公司名称</label>
									<div class="col-md-10">
                    <input type="text" class="form-control"
                           placeholder="请填写公司名称或要工商注册的公司名称"
                           v-model="keeperBusiness.companyName"/>
									</div>
								</div>
							</div>
						</div>
					</NbSlidePanel>

					<NbSlidePanel>
            <span slot="heading">
              <i class="fa fa-dot-circle-o"></i>
              <span>联系人信息</span>
            </span>
						<div slot="body">
							<div class="form-group">
								<div class="row">
									<label class="col-md-2 control-label mt5 compulsory">联系人姓名</label>
									<div class="col-md-10">
										<input type="text" class="form-control" v-model="keeperBusiness.leaderName"/>
									</div>
								</div>
								<div class="row mt10">
									<label class="col-md-2 control-label mt5 compulsory">联系人电话</label>
									<div class="col-md-10">
										<input type="text" class="form-control" v-model="keeperBusiness.leaderPhone"/>
									</div>
								</div>
								<div class="row mt10">
									<label class="col-md-2 control-label mt5 compulsory">联系人邮箱</label>
									<div class="col-md-10">
										<input type="text" class="form-control" v-model="keeperBusiness.leaderEmail"/>
									</div>
								</div>
							</div>
						</div>
					</NbSlidePanel>
				</div>

			</div>

			<div class="row">
				<div class="col-md-12 mv10" v-show="keeperBusiness.errorMessage">
					<div class="alert alert-danger">{{keeperBusiness.errorMessage}}</div>
				</div>

				<div class="col-md-12 mv20 text-right">
					<button class="btn btn-info mr10" v-if="active !== 0" @click="--active">
						<i class="fa fa-arrow-left"></i>
						上一步
					</button>
					<button class="btn btn-info mr10" v-if="active < 1" @click="nextStep">
						下一步
						<i class="fa fa-arrow-right"></i>
					</button>

					<CreateSaveButton v-if="!active < 1" class="ml1" :entity="keeperBusiness" :callback="save"/>
				</div>
			</div>

		</LoadingFrame>
	</div>
</template>
<script>
	import {MessageBox, Notification} from 'element-ui'
	import KeeperBusiness from  "../../../../common/model/keeper/business/KeeperBusiness"
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
	import BusinessTypeSelection from "./type/Selection.vue";
	import OrganizationSelection from "./organization/Selection.vue";
	import ProjectPagerSelection from "../../project/Selection.vue";
	import LoadingFrame from "../../widget/LoadingFrame";
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"

	import KeeperBusinessOrganization from  "../../../../common/model/keeper/business/KeeperBusinessOrganization";

	export default{
		data () {
			return {
				active: 0,
				keeperBusiness: new KeeperBusiness(),
				user: this.$store.state.user
			}
		},
		components: {
			NbSlidePanel,
			OrganizationSelection,
			BusinessTypeSelection,
			ProjectPagerSelection,
			LoadingFrame,
			CreateSaveButton
		},
		computed: {},
		watch: {
			"keeperBusiness.project.id"(newVal, oldVal){
				this.keeperBusiness.projectName = this.keeperBusiness.project.name;
				this.keeperBusiness.companyName = this.keeperBusiness.project.registeredCompanyName;
			},
			"active"(newVal, oldVal){
				this.keeperBusiness.errorMessage = '';
			}
		},
		methods: {
			nextStep(){
				if (this.keeperBusiness.businessType.id) {
					this.active++;
				} else {
					this.keeperBusiness.errorMessage = "请选择您要申请的服务类型";
				}
			},
			save(){
				let that = this;
				this.keeperBusiness.httpSave(function (response) {
					Notification.success({
						message: that.keeperBusiness.editMode ? '修改服务申请成功！' : '创建服务申请成功！'
					});
					that.$router.push("list");
				});
			},
			fetchDetail(){
				this.keeperBusiness.httpDetail();
			}
		},
		mounted(){
			let that = this;
			this.keeperBusiness.id = this.$store.state.route.query.id;
			this.keeperBusiness.leaderName = this.user.nickname;
			this.keeperBusiness.leaderPhone = this.user.phone;
			this.keeperBusiness.leaderEmail = this.user.email;
			if (this.keeperBusiness.id) {
				this.keeperBusiness.editMode = true;
				this.fetchDetail();
			} else {
        let that = this;
        this.keeperBusiness.organization.id = this.$store.state.route.query.organizationId;
        if (this.keeperBusiness.organization.id) {
          this.keeperBusiness.organization.httpDetail(function () {
            that.keeperBusiness.businessType = that.keeperBusiness.organization.businessType;
            that.active = 1;
          })
        }
      }
		}
	}

</script>

<style lang="less" rel="stylesheet/less">
	.keeper-business-create {
		.el-steps {
			.el-step:last-child {
				width: 7% !important;
			}
		}

	}
</style>
