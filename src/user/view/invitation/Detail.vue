<template>
	<div>
		<h2><i class="fa fa-fire text-success"></i>项目管理团队邀请</h2>

		<div class="row">
			<div class="col-xs-12">
        <NbSlidePanel>
          <span slot="heading" class="text-success f16">
            <i class="fa fa-leaf"></i>
            项目信息
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
                <div class="col-md-4">创建时间：</div>
                <div class="col-md-8 bold">{{project.createTime | humanTime}}</div>
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

            </div>

            <div class="col-md-6">

              <div class="row mt10">
                <div class="col-md-4">项目简介：</div>
                <div class="col-md-8 bold">{{project.description}}</div>
              </div>

            </div>

          </div>
        </NbSlidePanel>

        <NbSlidePanel>
          <span slot="heading" class="text-success f16">
            <i class="fa fa-leaf"></i>
            邀请信息
          </span>
          <div slot="body">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-2">邀请人：</div>
                <div class="col-md-10 bold">
                  {{invitation.creator.nickname}}
                </div>

              </div>

              <div class="row mt5">
                <div class="col-md-4">备注：</div>
                <div class="col-md-8 f18">
                  <span>{{invitation.note}}</span>
                </div>
              </div>

              <div class="row mt5">
                <div class="col-md-12">
                  <CreateSaveButton class="pull-right" :entity="invitation" createIcon="fa fa-handshake-o" createText="接受邀请并加入项目" saveText="接受邀请并加入项目" :callback="accept"/>
                </div>
              </div>


            </div>
          </div>
        </NbSlidePanel>




      </div>
		</div>

	</div>
</template>
<style>

</style>
<script>
  import ProjectAdministratorInvitation from '../../../common/model/project/administrator/invitation/ProjectAdministratorInvitation'
  import NbSlidePanel from  "../../../common/widget/NbSlidePanel.vue"
  import NbTank from  "../../../common/widget/NbTank.vue"
  import NbTanks from  "../../../common/widget/NbTanks.vue"
  import UserProfileLink from "../../../backyard/view/widget/UserProfileLink";
  import CreateSaveButton from '../../../backyard/view/widget/CreateSaveButton.vue'
  import {MessageBox, Notification} from 'element-ui';

	export default{
		data(){
			return {
        invitation: new ProjectAdministratorInvitation()
			}
		},
    computed: {
      project() {
        return this.invitation.project;
      }
		},
    components: {
      NbSlidePanel,
      NbTank,
      NbTanks,
      UserProfileLink,
      CreateSaveButton
    },
		methods: {
      accept() {
        let that = this;
        this.invitation.secretKey = this.$store.state.route.params.key;
        if (this.invitation.secretKey) {
          this.invitation.httpAccept(function () {
            Notification.success({
              message: '操作成功!'
            });
            this.$router.push('/group/project/detail/' + this.project.id)
          });
        }
      }
		},
		mounted(){
      let that = this;
      this.invitation.secretKey = this.$store.state.route.params.key;
      if (this.invitation.secretKey) {
        this.invitation.httpVerification();
      }
		}
	}
</script>



