<template>
	<div class="entry-apply-create">

    <div class="entry-apply-create">
      <div class="container">
        <div class="row">
          <div class="col-md-12"><h1 class="text-center">中国矿业大学上海校友创业基地培育项目征集</h1></div>
          <div class="col-md-12 text-center mv40">
            <el-steps :active="active" finish-status="finish">

              <el-step title="信息导读"></el-step>
              <el-step title="团队基本信息"></el-step>
              <el-step title="项目执行信息"></el-step>
              <el-step title="项目需求"></el-step>
              <el-step title="附件"></el-step>
            </el-steps>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12" v-show="active === 0">
            <div>
              <div style="text-align: center;">
                <h3>感谢您填写中国矿业大学上海校友创业基地培育项目征集</h3>
                <h4>以下是填写须知</h4>
              </div>

              <ul style="line-height:2;" class="content">
                <li>通过项目初审即可参加项目路演（路演主要包括10分钟的项目PPT介绍展示及5分钟导师互动）</li>
                <li>通过项目评审后与零号湾签署入孵协议，即可纳入零号湾项目库享受第三方服务（包括银行开户、财务代理、法律服务等）。此外零号湾
                  会为每个团队配备一位创业导师，根据项目的发展情况不定期安排创业指导。零号湾也会为团队安排一位辅导员，创业过程中遇到的问题
                  都可以与辅导员沟通联系。 有投融资方面的需求等团队，签署FA协议后零号湾会为团队对接投资人、投资机构等。
                </li>
                <li>根据团队需求安排适合的办公场地，签署房屋租赁协议后即可为团队免费办理工商注册，此外免费为团队配备专属律师解决创业过程中的法律问题。</li>
              </ul>
            </div>


          </div>
        </div>


        <div class="row">
          <div class="col-md-12" v-show="active === 1">

            <div class="f15 bold pb20">
              基本信息
            </div>

            <div>

              <div class="form-group">

                <div class="row">
                  <div class="col-md-2 mt5 compulsory">项目名称</div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="entryApply.name"/>
                  </div>
                </div>

                <div class="row mt10">
                  <div class="col-md-2 mt5 compulsory">国家重点支持高新技术领域</div>
                  <div class="col-md-10">

                    <NbMetaSelection :Clazz="EntryApplyField" v-model="entryApply.field"/>

                  </div>
                </div>

                <div class="row mt10">
                  <div class="col-md-2 mt5 compulsory">团队成员数</div>
                  <div class="col-md-10">
                    <input type="number" min="1" step="1" size="1" maxlength="2" class="form-control"
                           v-model="entryApply.memberNum"/>
                  </div>
                </div>

                <div class="row mt10">
                  <div class="col-md-2 mt5 compulsory">项目领域描述</div>
                  <div class="col-md-10">
										<textarea v-model="entryApply.fieldDescription" rows="3" class="form-control wp100"
                              placeholder="1024字以内"></textarea>
                    <div class="limit-hints">1024字以内</div>
                  </div>
                </div>
              </div>

            </div>

            <div class="f15 bold pb20">
              团队成员
              <button class="btn btn-success pull-right" @click="entryApply.addEntryApplyMember()">
                <i class="fa fa-plus"></i>
                增加团队成员
              </button>
            </div>
            <div v-for="(entryApplyMember, index) in entryApply.entryApplyMembers">

              <div class="f15 bold pb20">
                <span v-show="index===0">负责人信息</span>
                <span v-show="index!==0">成员{{index}}信息</span>
                <i v-show="index!==0" class="fa fa-trash f18 text-danger btn-action pull-right"
                   @click.stop.prevent="confirmDeleteMember(index)"></i>
              </div>


              <div class="form-group">

                <div class="row">

                  <div class="col-md-6 mt5">
                    <div class="row">
                      <div class="col-md-4 mt5 compulsory">姓名</div>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="entryApplyMember.name"/>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-6 mt5">
                    <div class="row">
                      <div class="col-md-4 mt5 compulsory">出生年月</div>
                      <div class="col-md-8">
                        <el-date-picker v-model="entryApplyMember.birthday" type="date"
                                        placeholder="选择日期时间"></el-date-picker>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 mt5">
                    <div class="row">
                      <div class="col-md-4 mt5 compulsory">毕业/就读学校</div>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="entryApplyMember.school"/>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-6 mt5">
                    <div class="row">
                      <div class="col-md-4 mt5 compulsory">专业</div>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="entryApplyMember.major"/>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-6 mt5">
                    <div class="row">
                      <div class="col-md-4 mt5 compulsory">手机</div>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="entryApplyMember.phone"/>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 mt5">
                    <div class="row">
                      <div class="col-md-4 mt5 compulsory">Email</div>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="entryApplyMember.email"/>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 mt5">
                    <div class="row">
                      <div class="col-md-2 mt5 compulsory">简历</div>
                      <div class="col-md-10">
													<textarea v-model="entryApplyMember.resume" rows="5" class="form-control wp100"
                                    placeholder="1000字左右"></textarea>
                        <div class="limit-hints">1000字以内</div>
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
              项目执行信息
            </div>

            <div>

              <div class="row">
                <div class="col-md-2 mt5 compulsory">项目简介</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.description" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">1000字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">创新点</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.innovative" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">255字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">难点</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.difficulty" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">255字以内</div>
                </div>
              </div>
              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">6个月内分阶段预期成果(每3月为一个阶段)</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.expectedAchievement" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">1000字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">可行性分析</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.feasibilityAnalysis" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">1000字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">团队分工及股权结构</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.division" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">1000字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">项目执行进度预计</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.expectedSchedule" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">1000字以内</div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div class="row">
          <div class="col-md-12" v-show="active === 3">

            <div class="f15 bold pb20">
              孵化需求
            </div>
            <div>

              <div class="row">
                <div class="col-md-2 mt5 compulsory">场地需求</div>
                <div class="col-md-10">
                  <NbMetaSelection :Clazz="EntryApplySpace" v-model="entryApply.spaceRequirement"/>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">创业指导</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.guideRequirement" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">255字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">投资需求</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.investRequirement" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">255字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">政策需求</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.policyRequirement" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">255字以内</div>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">其他服务需求</div>
                <div class="col-md-10">
                  <textarea v-model="entryApply.otherRequirement" rows="3" class="form-control wp100"></textarea>
                  <div class="limit-hints">255字以内</div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div class="row">
          <div class="col-md-12" v-show="active === 4">
            <div class="f15 bold pb20">
              附件材料上传
            </div>

            <div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">负责人或主创团队简历</div>
                <div class="col-md-10">
                  <NbTank :tank="entryApply.resume"/>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">项目BP</div>
                <div class="col-md-10">
                  <NbTank :tank="entryApply.businessPlan"/>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">项目PPT</div>
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
            <button class="btn btn-success" v-if="active !== 0" @click="upStep">
              <i class="fa fa-arrow-left"></i>
              上一步
            </button>
            <button class="btn btn-warning" v-if="active !== 0" @click="saveLocalData" v-show="!entryApply.editMode">
              <i class="fa fa-save"></i>
              本地保存
            </button>
            <button class="btn btn-success" v-if="active<4" @click="nextStep">
              下一步
              <i class="fa fa-arrow-right"></i>
            </button>
            <CreateSaveButton createClass="btn btn-warning" createText="提交申请" saveClass="btn btn-warning" class="ml1"
                              v-if="active===4" :entity="entryApply"
                              :callback="save"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import NbTank from '../../../../common/widget/NbTank'
	import NumberInput from '../../../../common/widget/NbNumberInput'
	import {Notification, MessageBox} from 'element-ui';

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
				EntryApplyField
			}
		},
		components: {
			NbMetaSelection,
			NbSlidePanel,
			NbTank,
			NumberInput,
			CreateSaveButton
		},
		computed: {},
		watch: {},
		methods: {
			nextStep(){
				if (this.entryApply.stepValidation(this.active)) {
					this.active++;
				}
			},
      upStep(){
        --this.active;
      },
			save(){
				this.entryApply.status = "NEW";
				let that = this;
				this.entryApply.httpSave(function (response) {
					Notification.success({
						message: that.entryApply.editMode ? '修改成功！' : '提交成功！'
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
