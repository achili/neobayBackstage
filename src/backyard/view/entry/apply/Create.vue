<template>
	<div class="entry-apply-create">
		<div class="row">
			<div class="col-md-12"><h1 class="text-center">{{$t('message.Procedure')}}</h1></div>
			<div class="col-md-12 text-center mv40">
				<el-steps :active="active" finish-status="finish">

					<el-step :title='$t(Guide)'></el-step>
					<el-step :title="$t(Profile)"></el-step>
					<el-step :title="$t(Business)"></el-step>
					<el-step :title="$t(Your)"></el-step>
					<el-step :title="$t(Documents)"></el-step>
				</el-steps>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" v-show="active === 0">
				<div>
					<ol style="line-height:2;" class="content">
						<li>{{$t('message.Application')}}</li>
						<li>{{$t('message.Subscribe')}}</li>
            <li>{{$t('message.Roadshow')}}</li>
						<li>{{$t('message.Assignment')}}</li>
						<li>{{$t('message.Based')}}</li>
						<li>{{$t('message.Decide')}}</li>
					</ol>
				</div>

			</div>
		</div>

		<div class="row">
			<div class="col-md-12" v-show="active === 1">

				<div class="f15 bold pb20">
          {{$t('message.GeneralInformation')}}
				</div>

				<div>

					<div class="form-group">

            <div class="row">
              <div class="col-md-2 mt5 compulsory">{{$t('message.ParkLocation')}}：</div>
              <div class="col-md-10">
                <SpaceRegionalSelection :spaceRegional="entryApply.spaceRegional" :editMode="entryApply.editMode"></SpaceRegionalSelection>
              </div>
            </div>

						<div class="row mt10">
							<div class="col-md-2 mt5 compulsory">{{$t('message.ProjectName')}}</div>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="entryApply.name"/>
							</div>
						</div>

						<div class="row mt10">
							<div class="col-md-2 mt5 compulsory">{{$t('message.Most')}}</div>
							<div class="col-md-10">

								<NbMetaSelection :Clazz="EntryApplyField" v-model="entryApply.field"/>

							</div>
						</div>

						<div class="row mt10">
							<div class="col-md-2 mt5 compulsory">{{$t('message.TeamMembers')}}</div>
							<div class="col-md-10">
								<input type="number" min="1" step="1" size="1" maxlength="2" class="form-control"
								       v-model="entryApply.memberNum"/>
							</div>
						</div>

						<div class="row mt10">
							<div class="col-md-2 mt5 compulsory">{{$t('message.Description')}}</div>
							<div class="col-md-10">
										<textarea v-model="entryApply.fieldDescription" rows="3" class="form-control wp100"
										          :placeholder="$t(Within1024)"></textarea>
								<div class="limit-hints">{{$t('message.Within1024')}}</div>
							</div>
						</div>
					</div>

				</div>

				<div class="f15 bold pb20">
          {{$t('message.Membership')}}
					<button class="btn btn-success pull-right" @click="entryApply.addEntryApplyMember()">
						<i class="fa fa-plus"></i>
            {{$t('message.AddTeam')}}
					</button>
				</div>
				<div v-for="(entryApplyMember, index) in entryApply.entryApplyMembers">

					<div class="f15 bold pb20">
						<span v-show="index===0">{{$t('message.InformationFounder')}}</span>
						<span v-show="index!==0">{{$t('message.TeamMember')}}{{index}}{{$t('message.Information')}}</span>
						<i v-show="index!==0" class="fa fa-trash f18 text-danger btn-action pull-right"
						   @click.stop.prevent="confirmDeleteMember(index)"></i>
					</div>


					<div class="form-group">

						<div class="row">

							<div class="col-md-6 mt5">
								<div class="row">
									<div class="col-md-4 mt5 compulsory">{{$t('message.Name')}}</div>
									<div class="col-md-8">
										<input type="text" class="form-control" v-model="entryApplyMember.name"/>
									</div>
								</div>
							</div>


							<div class="col-md-6 mt5">
								<div class="row">
									<div class="col-md-4 mt5 compulsory">{{$t('message.DateBirth')}}</div>
									<div class="col-md-8">
										<el-date-picker v-model="entryApplyMember.birthday" type="date"
										                :placeholder="$t(SelectDateTime)"></el-date-picker>
									</div>
								</div>
							</div>

							<div class="col-md-6 mt5">
								<div class="row">
									<div class="col-md-4 mt5 compulsory">{{$t('message.School')}}</div>
									<div class="col-md-8">
										<input type="text" class="form-control" v-model="entryApplyMember.school"/>
									</div>
								</div>
							</div>


							<div class="col-md-6 mt5">
								<div class="row">
									<div class="col-md-4 mt5 compulsory">{{$t('message.Major')}}</div>
									<div class="col-md-8">
										<input type="text" class="form-control" v-model="entryApplyMember.major"/>
									</div>
								</div>
							</div>


							<div class="col-md-6 mt5">
								<div class="row">
									<div class="col-md-4 mt5 compulsory">{{$t('message.PhoneNumber')}}</div>
									<div class="col-md-8">
										<input type="text" class="form-control" v-model="entryApplyMember.phone"/>
									</div>
								</div>
							</div>

							<div class="col-md-6 mt5">
								<div class="row">
									<div class="col-md-4 mt5 compulsory">{{$t('message.Email')}}</div>
									<div class="col-md-8">
										<input type="text" class="form-control" v-model="entryApplyMember.email"/>
									</div>
								</div>
							</div>

							<div class="col-md-12 mt5">
								<div class="row">
									<div class="col-md-2 mt5 compulsory">{{$t('message.Resume')}}</div>
									<div class="col-md-10">
													<textarea v-model="entryApplyMember.resume" rows="5" class="form-control wp100"
													          :placeholder="$t(Within2000)"></textarea>
										<div class="limit-hints">{{$t('message.Within2000')}}</div>
									</div>
								</div>
							</div>

              <div class="col-md-12 mt5">
                <div class="row mt10">
                  <div class="col-md-2 mt5">{{$t('message.CVUpload')}}</div>
                  <div class="col-md-10">
                    <NbTank :tank="entryApplyMember.cvResume"/>
                  </div>
                </div>
              </div>

						</div>

					</div>


				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" v-show="active === 2">

				<div class="f15 bold pb20">
          {{$t('message.BusinessPlan')}}
				</div>

				<div>

					<div class="row">
						<div class="col-md-2 mt5 compulsory">{{$t('message.ProjectProfile')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.description" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within1000')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.Highlights')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.innovative" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within255')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.Difficulties')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.difficulty" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within255')}}</div>
						</div>
					</div>
					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.Anticipated')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.expectedAchievement" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within1000')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.FeasibilityStudy')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.feasibilityAnalysis" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within1000')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.OrganizationalStock')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.division" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within1000')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.ProcedureBusiness')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.expectedSchedule" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within1000')}}</div>
						</div>
					</div>

				</div>

			</div>
		</div>
		<div class="row">
			<div class="col-md-12" v-show="active === 3">

				<div class="f15 bold pb20">
          {{$t('message.Requirements')}}
				</div>
				<div>

					<div class="row">
						<div class="col-md-2 mt5 compulsory">{{$t('message.RequirementSpace')}}</div>
						<div class="col-md-10">
							<NbMetaSelection :Clazz="EntryApplySpace" v-model="entryApply.spaceRequirement"/>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.RequirementMentorShip')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.guideRequirement" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within255')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.RequirementVenture')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.investRequirement" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within255')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.RequirementSupporting')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.policyRequirement" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints">{{$t('message.Within255')}}</div>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.OtherRequirements')}}</div>
						<div class="col-md-10">
							<textarea v-model="entryApply.otherRequirement" rows="3" class="form-control wp100"></textarea>
							<div class="limit-hints"> {{$t('message.Within255')}}</div>
						</div>
					</div>

				</div>

			</div>
		</div>
		<div class="row">
			<div class="col-md-12" v-show="active === 4">
				<div class="f15 bold pb20">
          {{$t('message.BusinessPlan')}}
				</div>

				<div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.FonderResume')}}</div>
						<div class="col-md-10">
							<NbTank :tank="entryApply.resume"/>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.BPUpload')}}</div>
						<div class="col-md-10">
							<NbTank :tank="entryApply.businessPlan"/>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 mt5 compulsory">{{$t('message.PPTRoadshow')}}</div>
						<div class="col-md-10">
							<NbTank :tank="entryApply.projectPPT"/>
						</div>
					</div>

				</div>

			</div>
		</div>


		<div class="row">
			<div class="col-md-12 mv10" v-show="entryApply.errorMessage">
				<div class="alert alert-danger">{{entryApply.errorMessage}}</div>
			</div>

			<div class="col-md-12 mt40 mb20 text-center">
				<button class="btn btn-success" v-if="active !== 0" @click="--active">
					<i class="fa fa-arrow-left"></i>
          {{$t('message.Back')}}
				</button>
				<button class="btn btn-warning" v-if="active !== 0" @click="saveLocalData" v-show="!entryApply.editMode">
					<i class="fa fa-save"></i>
          {{$t('message.Preservation')}}
				</button>
				<button class="btn btn-success" v-if="active<4" @click="nextStep">
					{{$t('message.Next')}}
					<i class="fa fa-arrow-right"></i>
				</button>
				<CreateSaveButton createClass="btn btn-warning" :createText="$t(Submit)" saveClass="btn btn-warning" class="ml1"
				                  v-if="active===4" :entity="entryApply"
				                  :callback="save"/>
			</div>
		</div>
	</div>
</template>

<script>
	import NbTank from '../../../../common/widget/NbTank'
	import NumberInput from '../../../../common/widget/NbNumberInput'
	import {Notification, MessageBox} from 'element-ui';
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
	import NbMetaSelection from "../../../../common/widget/NbMetaSelection.vue";

	import EntryApply from "../../../../common/model/entry/apply/EntryApply"
	import EntryApplyField from "../../../../common/model/entry/apply/EntryApplyField"
	import EntryApplySpace from "../../../../common/model/entry/apply/EntryApplySpace"
	import EntryApplyMember from "../../../../common/model/entry/apply/EntryApplyMember"
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"


	import $ from "jquery"

	export default {
		data () {
			return {
				active: 0,
				entryApply: new EntryApply(),
				EntryApplySpace,
				EntryApplyField,
        Guide:'message.Guide',
        Profile:'message.Profile',
        Business:'message.Business',
        Your:'message.Your',
        Documents:'message.Documents',
        Submit:'message.Submit',
        Within1024:'message.Within1024',
        Within2000:'message.Within2000',
        SelectDateTime:'message.SelectDateTime'
			}
		},
		components: {
			NbMetaSelection,
			NbSlidePanel,
			NbTank,
			NumberInput,
			CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			nextStep(){
				if (this.entryApply.stepValidation(this.active)) {
					this.active++;
				}
			},
			save(){
				this.entryApply.status = "NEW";
				let that = this;
				this.entryApply.httpSave(function (response) {
					Notification.success({
						message: that.entryApply.editMode ? '修改入驻申请成功！' : '提交入驻申请成功！'
					});
					that.$router.push({ path: 'detail', query: { id: that.entryApply.id } });

					that.entryApply.clearLocalStorage();

				});
			},
			//确认删除团队成员
			confirmDeleteMember(index){
				let that = this;
				MessageBox.confirm('确定删除此团队成员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
					that.entryApply.subEntryApplyMember(index);
				}, function () {
				});
			},
			//保存功能
			saveLocalData () {
				this.entryApply.saveToLocalStorage();
				Notification.success({
					message: '保存成功！'
				});
			}
		},
		mounted () {
			let that = this;
			this.entryApply.id = this.$store.state.route.query.id;
			if (that.entryApply.id) {
				that.entryApply.editMode = true;
				that.entryApply.httpDetail();
			} else {
				this.entryApply.renderFromLocalStorage();

				if (this.entryApply.entryApplyMembers && this.entryApply.entryApplyMembers.length === 0) {
					this.entryApply.entryApplyMembers.push(new EntryApplyMember());
				}
			}
		}
	}

</script>

<style lang="less" rel="stylesheet/less">

	.entry-apply-create {
		.el-steps {
			.el-step:last-child {
				width: 7% !important;
			}
		}

	}

</style>
