<template>
  <div>

    <NbExpanding>
      <NbSlidePanel type="info" v-show="flipped">
    <span slot="heading" class="f16">
      <i class="fa fa-cogs"></i>
      操作面板
    </span>
    <span slot="actions">
      <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
    </span>
        <div slot="body">

          <!--指派社区经理-->
          <NbSlidePanel>
                    <span slot="heading" class="f14">
                      <i class="fa fa-user"></i>
                      指派社区经理
                    </span>
            <div slot="body">
              <div class="row">
                <div class="col-sm-12">

                  <ProjectMentorSelection :activeProjectMentor="project.projectMentor"></ProjectMentorSelection>


                  <div class="row mt10" v-show="assignErrorMessage">
                    <div class="col-md-12">
                      <div class="alert alert-danger">
                        {{assignErrorMessage}}
                      </div>
                    </div>
                  </div>


                  <div class="form-group text-right mt10">
                    <SubmitButton :loading="project.loading" :callback="assign"/>
                  </div>

                </div>
              </div>
            </div>
          </NbSlidePanel>

          <!--重新指定项目所有人-->
          <NbSlidePanel>
                    <span slot="heading" class="f14">
                      <i class="fa fa-user"></i>
                      重新指定项目创建者
                    </span>
            <div slot="body">
              <div class="row">
                <div class="col-sm-12">

                  <UserSelection :activeUser="project.creator"></UserSelection>

                  <div class="row mt10" v-show="assignCreatorErrorMessage">
                    <div class="col-md-12">
                      <div class="alert alert-danger">
                        {{assignCreatorErrorMessage}}
                      </div>
                    </div>
                  </div>

                  <div class="alert alert-info mt10">
                    重新指定项目创建者后，和该项目相关联的企业创建者，企业管家申请者，创业空间申请者，孵化协议关联者，租赁空间关联者，付款信息单关联者等均会发生变化。请慎重修改！
                  </div>


                  <div class="form-group text-right mt10">
                    <SubmitButton :loading="project.loading" :callback="assignCreator"/>
                  </div>

                </div>
              </div>
            </div>
          </NbSlidePanel>

          <!--修改状态-->
          <NbSlidePanel>
                    <span slot="heading" class="f14">
                      <i class="fa fa-user"></i>
                      修改项目状态
                    </span>
            <div slot="body">


              <div>
                <div class="row">
                  <label class="col-md-2 control-label">当前状态</label>

                  <div class="col-md-10">
                    <span :class="'label label-'+project.getStatusStyle()">{{project.getStatusName()}}</span>
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-2 control-label">审核状态</label>

                  <div class="col-md-10">

                    <NbBtnDropdown :name="reviewStatusItem['name']" size="sm"
                                   :color="reviewStatusItem['style']">
                      <ul>
                        <li v-for="(option, index) in project.StatusList">
                          <a href="javascript:void(0)" @click="reviewStatus = option.value">{{option.name}}</a>
                        </li>
                      </ul>
                    </NbBtnDropdown>

                  </div>
                </div>

                <div v-show="reviewStatus === project.Status.INCUBATING">
                  <div class="row mt10">

                    <label class="col-md-2 control-label">
                      时间:
                    </label>

                    <div class="col-md-10">
                      <el-date-picker v-model="time" type="date"
                                      placeholder="选择日期时间"></el-date-picker>
                    </div>
                  </div>

                </div>

                <div v-show="reviewStatus === project.Status.QUIT || reviewStatus === project.Status.GRADUATION">

                  <div class="row mt10">

                    <label class="col-md-2 control-label">
                      {{reviewStatus === project.Status.QUIT ? '退出时间' : '毕业时间'}}
                    </label>

                    <div class="col-md-10">
                      <el-date-picker v-model="time" type="date"
                                      placeholder="选择日期时间"></el-date-picker>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-2 control-label">备注</label>
                    <div class="col-md-10">
							<textarea class="form-control" rows="3" v-model="reviewReason"
                        placeholder="请填写备注信息……"></textarea>
                    </div>
                  </div>
                </div>


                <div class="row mt10" v-show="submitErrorMessage">
                  <div class="col-md-12">
                    <div class="alert alert-danger">
                      {{submitErrorMessage}}
                    </div>
                  </div>
                </div>

                <div class="row mt10">
                  <div class="col-md-12 text-right">
                    <SubmitButton :loading="project.loading" :callback="submit"/>
                  </div>
                </div>
              </div>

            </div>
          </NbSlidePanel>

          <!--附件上传/修改-->
          <NbSlidePanel type="info">
            <span slot="heading" class="f16">
              <i class="fa fa-cogs"></i>
                附件上传/修改
            </span>
              <div slot="body">

                <div class="row mt10">
                  <div class="col-md-2 ">其它附件：</div>
                  <div class="col-md-10 ">
                    <NbTanks :tanks="project.currentAttachments"/>
                  </div>
                </div>

                <div class="text-right mt10">
                  <SubmitButton :loading="project.loading" :callback="submitCurrentAttachments"/>
                </div>

              </div>
            </NbSlidePanel>

        </div>
      </NbSlidePanel>
    </NbExpanding>


    <NbExpanding>
      <NbSlidePanel type="primary" v-show="!flipped">
					<span slot="heading" class="f16">
						<i class="fa fa-cogs"></i>
							评审通知
					</span>
        <span slot="actions">
						<i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					</span>
        <div slot="body">

          <NotificationControlPanel :notification="notification" :successCallback="notificationFinish"/>
        </div>


      </NbSlidePanel>
    </NbExpanding>

  </div>
</template>


<script>
	import Project from  "../../../../common/model/project/Project";
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
	import UserProfileLink from "../../widget/UserProfileLink";
	import NbBtnDropdown from  "../../../../common/widget/NbBtnDropdown.vue";
	import SubmitButton from "../../widget/SubmitButton.vue";
	import {Notification as NotificationBox} from 'element-ui';
	import {simpleDateTime} from "../../../../common/filter/time";
	import ProjectMentorSelection from './../mentor/Selection.vue'
	import UserSelection from '../../user/Selection.vue'
  import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
  import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue";
  import Notification from  "../../../../common/model/notification/Notification";
  import NbTanks from  "../../../../common/widget/NbTanks.vue"

	export default{
		data(){
			return {
				reviewStatus: Project.prototype.Status.INCUBATING,
				reviewReason: null,
				time: null,
				submitErrorMessage: null,
				assignErrorMessage: null,
				assignCreatorErrorMessage: null,
				Status: Project.prototype.Status,
				StatusMap: Project.prototype.StatusMap,
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user,
        flipped: true,
        notification: new Notification()
			}
		},
		computed: {
			reviewStatusItem(){
				return this.project.getStatusItem(this.reviewStatus);
			}
		},

		props: {
			project: {
				type: Project,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
			successCallback: {
				type: Function,
				required: false
			}

		},
		watch: {
			"project.status"(newVal, oldVal){
				this.reviewStatus = newVal;
			}
		},
		components: {
			NbSlidePanel,
			NbBtnDropdown,
			UserProfileLink,
			SubmitButton,
			ProjectMentorSelection,
			UserSelection,
      NbExpanding,
      NotificationControlPanel,
      NbTanks
		},
		methods: {
      submitCurrentAttachments() {
        this.project.httpUploadAttachments(this.successCallback);
      },
			submit(){
				let that = this;
				let form = {
					"id": that.project.id,
					"status": that.reviewStatus,
					"time": simpleDateTime(this.time),
					"reason": that.reviewReason
				};
				if (that.reviewStatus === that.project.status) {
					that.submitErrorMessage = "请选择不同的状态";
					return;
				}
				that.submitErrorMessage = null;
				this.project.httpStatus(form, function (response) {
					NotificationBox.success({
						message: '修改状态成功！'
					});
					if (typeof that.successCallback === "function") {
						that.successCallback();
					}
				});
			},
			assign(){
				if (!this.project.projectMentor.id) {
					this.assignErrorMessage = "请指定社区经理！";
					return;
				}
				this.assignErrorMessage = null;
				let that = this;
				let form = {
					"id": this.project.id,
					"projectMentorId": this.project.projectMentor.id
				}
				this.project.httpAssignMentor(form, function (response) {
					NotificationBox.success({
						message: '指派经理成功！'
					});
          that.flipped = false;
          that.notification.render(response.data.notification);
          that.notification.entityId = that.project.id;
					if (typeof that.successCallback === "function") {
						that.successCallback();
					}
				})
			},
			assignCreator(){
				if (!this.project.creator.id) {
					this.assignCreatorErrorMessage = "请指定项目创建者！";
					return;
				}
				this.assignCreatorErrorMessage = null;
				let that = this;
				let form = {
					"id": this.project.id,
					"userId": this.project.creator.id
				}
				this.project.httpAssignCreator(form, function (response) {
					NotificationBox.success({
						message: '指派新的创建者成功！'
					});
          that.flipped = false;
          that.notification.render(response.data.notification);
          that.notification.entityId = that.project.id;
					if (typeof that.successCallback === "function") {
						that.successCallback();
					}
				})
			},
      notificationFinish(response){
        let that = this;

        that.flipped = !that.flipped;

        if (typeof that.notificationSuccessCallback === "function") {
          that.notificationSuccessCallback(response);
        }

      }
		}

	}


</script>
