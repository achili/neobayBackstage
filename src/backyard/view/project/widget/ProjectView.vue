<template>

	<div>
		<!--基本信息-->
		<NbSlidePanel>
      <span slot="heading" class="text-success f16">
        <i class="fa fa-leaf"></i>
        基本信息
      </span>
			<div slot="body">


				<div class="col-md-6">


					<div class="row">
						<div class="col-md-4">项目名称：</div>
						<div class="col-md-8 f18 bold">{{project.name}}</div>
					</div>

					<div class="row">
						<div class="col-md-4">孵化状态：</div>
						<div class="col-md-8 f18">
							<span :class="'label label-'+project.getStatusStyle()">{{project.getStatusName()}}</span>
              <span class="label label-danger" v-if="project.isHot">社区项目</span>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">创建者：</div>
						<div class="col-md-8 bold">
							<UserProfileLink :user="project.creator"/>
						</div>
					</div>
					<div class="row mt10">
						<div class="col-md-4">创建时间：</div>
						<div class="col-md-8 bold">{{project.createTime | humanTime}}</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">关联入驻申请：</div>
						<div class="col-md-8 bold">
							<router-link :to="{path: user.hasPermissionSpace(FeatureType.FINANCE_PAY_INFO_MANAGE,project.spaceRegional.id)? '/by/entry/apply/detail/':'/group/entry/apply/detail/', query: { id: project.entryApply.id }}">
							  {{project.entryApply.name}}
							</router-link>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">团队成员数：</div>
						<div class="col-md-8 bold">{{project.memberNum}}</div>
					</div>

          <div class="row mt10">
            <div class="col-md-4">负责人：</div>
            <div class="col-md-8 bold">{{project.leader}}</div>
          </div>

          <div class="row mt10">
            <div class="col-md-4">负责人联系方式：</div>
            <div class="col-md-8 bold">{{project.leaderPhone}}</div>
          </div>

          <div class="row mt10">
            <div class="col-md-4">负责人邮箱：</div>
            <div class="col-md-8 bold">{{project.leaderEmail}}</div>
          </div>

          <div class="row mt10">
						<div class="col-md-4">项目来源：</div>
						<div class="col-md-8 bold">{{project.projectSource}}</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">专业技术方向：</div>
						<div class="col-md-8 bold">{{project.technologyDirection}}</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">市场分类：</div>
						<div class="col-md-8 bold">
                      <span class="label label-default mr10" v-for="marketType in project.marketTypes">
                        {{marketType}}
                      </span>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">是否已注册公司：</div>
						<div class="col-md-8 bold">{{project.isRegisteredCompany ? '是' : '否'}}</div>
					</div>

					<div class="row mt10" v-show="project.isRegisteredCompany">
						<div class="col-md-4">注册公司名称：</div>
						<div class="col-md-8 bold">{{project.registeredCompanyName}}</div>
					</div>

					<div class="row mt10" v-show="project.isRegisteredCompany">
						<div class="col-md-4">注册公司时间：</div>
						<div class="col-md-8 bold">{{project.registeredCompanyTime | humanTime}}</div>
					</div>

          <div class="row mt10" v-show="project.registeredCompanyAddress">
            <div class="col-md-4">注册公司地址：</div>
            <div class="col-md-8 bold">{{project.registeredCompanyAddress}}</div>
          </div>

          <div class="row mt10">
            <div class="col-md-4">企业计划书：</div>
            <div class="col-md-8">

              <NbTank :tank="project.businessPlan" :edit="false"/>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-4">项目执行情况：</div>
            <div class="col-md-8 bold">{{project.implementation}}</div>
          </div>

				</div>

				<div class="col-md-6">

          <div class="row mt10" v-show="project.isRegisteredCompany">
            <div class="col-md-4">工商营业执照：</div>
            <div class="col-md-8">
              <img :src="project.businessLicense.url"/>
            </div>

          </div>

          <div class="row mt10">
            <div class="col-md-4">项目简介：</div>
            <div class="col-md-8 bold">{{project.description}}</div>
          </div>

          <div class="row mt10">
            <div class="col-md-4">园区地点：</div>
            <div class="col-md-8 bold">{{project.spaceRegional.name}}</div>
          </div>

				</div>

			</div>
		</NbSlidePanel>

		<!--项目团队-->
		<NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-users"></i>
                  项目团队
                </span>
			<div slot="body">

				<NbSlidePanel type="primary" v-for="(projectMember, index) in project.projectMembers"
				              :key="projectMember.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      成员详情 #{{index + 1}}
                    </span>
					<div slot="body">

						<div class="col-md-6">
							<div class="row">
								<div class="col-md-4">姓名：</div>
								<div class="col-md-8 f18 bold">{{projectMember.name}}</div>
							</div>

							<div class="row mt10">
								<div class="col-md-4">部门：</div>
								<div class="col-md-8 bold">{{projectMember.department}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">职位：</div>
								<div class="col-md-8 bold">{{projectMember.position}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">电话：</div>
								<div class="col-md-8 bold">{{projectMember.telephone}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">传真：</div>
								<div class="col-md-8 bold">{{projectMember.fax}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">手机：</div>
								<div class="col-md-8 bold">{{projectMember.phone}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">证件类型：</div>
								<div class="col-md-8 bold">{{projectMember.docType}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">证件号码：</div>
								<div class="col-md-8 bold">{{projectMember.docNo}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">Email：</div>
								<div class="col-md-8 bold">{{projectMember.mail}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">学历：</div>
								<div class="col-md-8 bold">{{projectMember.education}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">目前最高职称：</div>
								<div class="col-md-8 bold">{{projectMember.highestTitle}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">初次工作年份：</div>
								<div class="col-md-8 bold">{{projectMember.firstWorkingYear}}</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">创业者特征：</div>
								<div class="col-md-8 bold">{{projectMember.features}}</div>
							</div>
						</div>
						<div class="col-md-6">


							<div class="row mt10">
								<div class="col-md-4">是否本公司股东：</div>
								<div class="col-md-8 bold">{{projectMember.isShareholder === null ? "未填写" :
									projectMember.isShareholder ? "是" : "否"}}

								</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">是否实际负责人：</div>
								<div class="col-md-8 bold">{{projectMember.isPersonLiable === null ? "未填写" :
									projectMember.isPersonLiable ? "是" : "否"}}

								</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">是否连续创业：</div>
								<div class="col-md-8 bold">{{projectMember.isContinuous === null ? "未填写" :
									projectMember.isContinuous ? "是" : "否"}}

								</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">是否海外引进：</div>
								<div class="col-md-8 bold">{{projectMember.isOverseas === null ? "未填写" :
									projectMember.isOverseas ? "是" : "否"}}

								</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">是否浦江人才：</div>
								<div class="col-md-8 bold">{{projectMember.isPujiangTalent === null ? "未填写" :
									projectMember.isPujiangTalent ? "是" : "否"}}

								</div>
							</div>
							<div class="row mt10">
								<div class="col-md-4">是否千人计划：</div>
								<div class="col-md-8 bold">{{projectMember.isThousandPlan === null ? "未填写" :
									projectMember.isThousandPlan ? "是" : "否"}}

								</div>
							</div>
							<div class="row mt10" v-if="projectMember.isThousandPlan">
								<div class="col-md-4">千人计划批次号：</div>
								<div class="col-md-8 bold">{{projectMember.thousandPlanCode}}</div>
							</div>
							<div class="row mt10" v-if="projectMember.resume && projectMember.resume.code">
								<div class="col-md-4">简历：</div>
								<div class="col-md-8">
									<NbTank :tank="projectMember.resume" :edit="false"/>

								</div>
							</div>

						</div>


					</div>
				</NbSlidePanel>


			</div>
		</NbSlidePanel>

		<!--投资信息-->
		<NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-diamond"></i>
                  投资信息
                </span>
			<div slot="body">
				<NbSlidePanel type="primary" v-for="(projectFinancing, index) in project.projectFinancings"
				              :key="projectFinancing.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      投资成员详情 #{{index + 1}}
                    </span>
					<div slot="body">

						<div class="col-md-6">
							<div class="row">
								<div class="col-md-4">投资时间：</div>
								<div class="col-md-8 bold">{{projectFinancing.investmentTime | humanTime}}</div>
							</div>

							<div class="row">
								<div class="col-md-4">投资人：</div>
								<div class="col-md-8 bold">{{projectFinancing.investmentPeople }}</div>
							</div>

						</div>
						<div class="col-md-6">

							<div class="row">
								<div class="col-md-4">投资金额(万元)：</div>
								<div class="col-md-8 bold">{{projectFinancing.investmentValue }}</div>
							</div>

							<div class="row">
								<div class="col-md-4">占股权比例(%)：</div>
								<div class="col-md-8 bold">{{projectFinancing.equityRatio }}</div>
							</div>
						</div>


					</div>
				</NbSlidePanel>


			</div>
		</NbSlidePanel>


		<!--高级信息-->
		<NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-superpowers"></i>
                  高级信息
                </span>
			<div slot="body">

				<div class="row mt10">
					<div class="col-md-2">项目编号：</div>
					<div class="col-md-10 bold">{{project.no}}</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2">孵化协议：</div>
					<div class="col-md-10">
            <div v-if="project.protocolIncubators && project.protocolIncubators.length > 0">
              <router-link class="bold" v-for="item in project.protocolIncubators"
                           :to="'/by/protocol/incubator/detail/'+item.id" :key="item.id">
                {{item.name}}
              </router-link>
            </div>
						<div v-else>尚未签署</div>
					</div>
				</div>
				<div class="row mt10">
					<div class="col-md-2">
						社区经理：
					</div>
					<div class="col-md-10" v-if="project.projectMentor.name">
						<a
              @click.stop.prevent="$router.push(user.hasPermissionSpace($store.state.FeatureType.PROJECT_MANAGE,project.spaceRegional.id)? {path: '/by/mentor/detail', query: { id: project.projectMentor.id }}:{path: '/group/mentor/detail', query: { id: project.projectMentor.id }})">
              {{project.projectMentor.name}} </a>
						<div>
							<img class="img-lg" :src="project.projectMentor.avatar.url"/>

						</div>
					</div>
					<div class="col-md-10 text-danger" v-if="!project.projectMentor.name">
						未指定
					</div>
				</div>
				<div class="row mt10">
					<div class="col-md-2">入驻日期：</div>
					<div class="col-md-10 bold">{{project.entryTime | humanTime}}</div>
				</div>
				<div class="row mt10">
					<div class="col-md-2">入驻地址：</div>
					<div class="col-md-10 bold">{{project.entryAddress}}</div>
				</div>
				<div class="row mt10">
					<div class="col-md-2">所属基地：</div>
					<div class="col-md-10 bold">{{project.subordinateBase}}</div>
				</div>
				<div class="row mt10">
					<div class="col-md-2">迁入孵化时间：</div>
					<div class="col-md-10 bold">{{project.moveTime | humanTime}}</div>
				</div>
			</div>
		</NbSlidePanel>

	</div>

</template>


<script>
  import Project from "../../../../common/model/project/Project"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue"
  import NbTank from "../../../../common/widget/NbTank.vue"
  import NbTanks from "../../../../common/widget/NbTanks.vue"
  import UserProfileLink from "../../widget/UserProfileLink";

  export default{
		data(){
			return {
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		props: {
			project: {
				type: Project,
				required: true
			}

		},

		components: {
			NbSlidePanel,
			UserProfileLink,
			NbTanks,
			NbTank
		}

	}


</script>
