<template>
	<div class="row">

		<div class="col-xs-12 text-center" v-show="!entryApply.name">
			<span class="italic">该入驻申请不存在</span>
		</div>

		<div class="col-xs-12" v-show="entryApply.name">

			<NbSlidePanel>
				<span slot="heading" class="text-success f16">
					<i class="fa fa-dot-circle-o"></i>
					基本信息
				</span>
				<div slot="body">

					<div class="row">
						<div class="col-md-4">项目名称：</div>
						<div class="col-md-8 f18 bold">
							{{entryApply.name}}
						</div>
					</div>

          <div class="row">
            <div class="col-md-4">园区地点：</div>
            <div class="col-md-8">
              {{entryApply.spaceRegional.name}}
            </div>
          </div>

					<div class="row mt10">
						<div class="col-md-4">创建者：</div>
						<div class="col-md-8">
							<UserProfileLink :user="entryApply.creator"/>
						</div>
					</div>

          <div class="row mt10">
            <div class="col-md-4">创建时间：</div>
            <div class="col-md-8 bold">
              {{entryApply.createTime | humanTime}}
            </div>
          </div>


					<div class="row mt10">
						<div class="col-md-4">状态：</div>
						<div class="col-md-8">
							<span :class="'label label-'+entryApply.getStatusStyle()">{{entryApply.getStatusName()}}</span>
							<span v-if="entryApply.archive" class="label label-danger">已归档</span>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">pdf下载：</div>
						<div class="col-md-8">
							<a class="btn btn-success" :href="entryApply.downloadPdfUrl()">
								<i class="fa fa-file-pdf-o"></i>
								下载
							</a>
						</div>
					</div>

					<div class="row mt10"
					     v-show="entryApply.status === 'FINAL_REVIEW_REJECT' || entryApply.status === 'FIRST_REVIEW_REJECT'">
						<div class="col-md-4">驳回原因：</div>
						<div class="col-md-8">
							<span class="text-danger">{{entryApply.reason}}</span>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">项目领域描述：</div>
						<div class="col-md-8 bold">
							{{entryApply.fieldDescription}}
						</div>
					</div>


					<div class="row mt10">
						<div class="col-md-4">国家重点支持高新技术领域：</div>
						<div class="col-md-8 bold">
							{{entryApply.field}}
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-4">团队成员数：</div>
						<div class="col-md-8 bold">
							{{entryApply.memberNum}}
						</div>
					</div>

					<div class="row">

						<div class="col-xs-12" v-for="(entryApplyMember, index) in entryApply.entryApplyMembers">
							<div class="mt10 p10 border-dash">
								<div class="row">
									<div class="col-md-12">团队成员{{index + 1}}信息</div>
									<div class="col-md-4 mt10">姓名：<b>{{entryApplyMember.name}}</b></div>
									<div class="col-md-4 mt10">出生年月：<b>{{entryApplyMember.birthday | simpleDate}}</b></div>
									<div class="col-md-4 mt10">毕业/就读学校：<b>{{entryApplyMember.school}}</b></div>
									<div class="col-md-4 mt10">专业：<b>{{entryApplyMember.major}}</b></div>
									<div class="col-md-4 mt10">手机：<b>{{entryApplyMember.phone}}</b></div>
									<div class="col-md-4 mt10">Email：<b>{{entryApplyMember.email}}</b></div>
									<div class="col-md-12 mt10">简历：</div>
									<div class="col-md-12 mt10">{{entryApplyMember.resume}}</div>
                  <div class="col-md-12 mt10">CV上传：</div>
                  <div class="col-md-12 mt10"><NbTank :tank="entryApplyMember.cvResume" :edit="false"/></div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</NbSlidePanel>

			<NbSlidePanel>

				<span slot="heading" class="text-success f16">
					<i class="fa fa-dot-circle-o"></i>
					详细信息
				</span>
				<div slot="body">

					<div class="row">
						<div class="col-md-4 ">项目简介：</div>
						<div class="col-md-8 "><b>{{entryApply.description}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-4 ">创新点：</div>
						<div class="col-md-8 "><b>{{entryApply.innovative}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-4 ">难点</div>
						<div class="col-md-8 "><b>{{entryApply.difficulty}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-4 ">6个月内分阶段预期成果(每3月为一个阶段)：</div>
						<div class="col-md-8 "><b>{{entryApply.expectedAchievement}}</b></div>
					</div>


					<div class="row mt10">
						<div class="col-md-4 ">可行性分析：</div>
						<div class="col-md-8 "><b>{{entryApply.feasibilityAnalysis}}</b></div>
					</div>


					<div class="row mt10">
						<div class="col-md-4 ">团队分工及股权结构：</div>
						<div class="col-md-8 "><b>{{entryApply.division}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-4 ">项目执行进度预计：</div>
						<div class="col-md-8 "><b>{{entryApply.expectedSchedule}}</b></div>
					</div>
				</div>


			</NbSlidePanel>


			<NbSlidePanel>

				<span slot="heading" class="text-success f16">
					<i class="fa fa-dot-circle-o"></i>
					孵化需求
				</span>
				<div slot="body">


					<div class="row">
						<div class="col-md-4 ">场地需求：</div>
						<div class="col-md-8 "><b>{{entryApply.spaceRequirement}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-4 ">创业指导：</div>
						<div class="col-md-8 "><b>{{entryApply.guideRequirement}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-4 ">投资需求：</div>
						<div class="col-md-8 "><b>{{entryApply.investRequirement}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-4 ">政策需求：</div>
						<div class="col-md-8 "><b>{{entryApply.policyRequirement}}</b></div>
					</div>


					<div class="row mt10">
						<div class="col-md-4 ">其他服务需求：</div>
						<div class="col-md-8 "><b>{{entryApply.otherRequirement}}</b></div>
					</div>
				</div>
			</NbSlidePanel>


			<NbSlidePanel>

				<span slot="heading" class="text-success f16">
					<i class="fa fa-dot-circle-o"></i>
					附件材料
				</span>
				<div slot="body">

					<div class="row">
						<div class="col-xs-3 ">负责人或主创团队简历</div>
						<div class="col-xs-9 ">
							<NbTank :tank="entryApply.resume" :edit="false"/>
						</div>
						<div class="col-xs-3 ">项目BP</div>
						<div class="col-xs-9 ">
							<NbTank :tank="entryApply.businessPlan" :edit="false"/>
						</div>
						<div class="col-xs-3 ">项目PPT</div>
						<div class="col-xs-9 ">
							<NbTank :tank="entryApply.projectPPT" :edit="false"/>
						</div>
					</div>
				</div>
			</NbSlidePanel>
		</div>

	</div>
</template>

<script>
	import EntryApply from  "../../../../../common/model/entry/apply/EntryApply";
	import NbTank from "../../../../../common/widget/NbTank.vue";
	import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
	import UserProfileLink from "../../../widget/UserProfileLink.vue";


	export default {
		data () {
			return {}
		},
		components: {
			NbTank,
			NbSlidePanel,
			UserProfileLink
		},
		props: {
			entryApply: {
				type: EntryApply,
				required: true
			}
		},
		methods: {},
		mounted(){
		}
	}
</script>


