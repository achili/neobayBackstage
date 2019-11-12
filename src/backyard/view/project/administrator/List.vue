<template>
	<div>
    <NbExpanding>
      <NbSlidePanel type="success" v-show="flipped" :isNew="true">
        <span slot="heading" class="f16">
						<i class="fa fa-cogs"></i>
							项目管理团队
        </span>
        <span slot="actions">
          <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
        </span>
        <div slot="body">
          <div class="alert alert-info mt10">
            项目创建者添加项目管理团队后可以让其他站内用户和您一起管理项目信息。其中管理员可以修改项目信息，普通成员可以查看项目信息。
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="bg-white p10 mt10 cursor br4 border">
                <div class="media">
                  <div class="pull-left">
                    <img class="img-rounded img-sm" :src="project.creator.getAvatarUrl()">
                    <UserProfileLink :user="project.creator"></UserProfileLink>
                    <span class="ml10 label label-danger">项目创建者</span>
                  </div>
                </div>
              </div>
              <div v-for="projectAdministrator in pager.projectAdministrators">

                <div class="bg-white p10 mt10 cursor br4 border">
                  <div class="media">
                    <div class="pull-left">
                      <img class="img-rounded img-sm" :src="projectAdministrator.linkUser.getAvatarUrl()">
                      <UserProfileLink :user="projectAdministrator.linkUser"></UserProfileLink>

                      <span v-show="!projectAdministrator.loading" :class="'ml5 label label-'+projectAdministrator.getTypeStyle()">{{projectAdministrator.getTypeName()}}</span>
                      <i v-show="projectAdministrator.loading" class="fa fa-spinner fa-spin f20"></i>
                    </div>

                    <div class="pull-right action-buttons" v-if="project.isCreator(user)">
                      <a title="移除" @click.stop.prevent="del(projectAdministrator)">
                        <i class="fa fa-trash text-danger f20"></i>
                      </a>
                    </div>
                    <div class="pull-right action-buttons" v-if="project.isCreator(user)">
                      <a title="更改权限" @click.stop.prevent="changePermission(projectAdministrator)" v-show="!projectAdministrator.loading">
                        <i class="fa fa-exchange text-danger f20"></i>
                      </a>
                      <a v-show="projectAdministrator.loading">
                        <i class="fa fa-spinner fa-spin f20"></i>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div class="col-xs-12 mt20">
              <NbPager :pager="pager" :callback="refresh"/>
            </div>

            <div class="col-xs-12 mt10">
              <button class="btn btn-primary pull-right" @click.stop.prevent="add">
                <i class="fa fa-plus"></i>
                <span>邀请成员</span>
              </button>
            </div>
          </div>
        </div>
      </NbSlidePanel>
    </NbExpanding>




    <NbExpanding>
      <NbSlidePanel type="warning" v-show="!flipped" v-if="project.creator.getAvatarUrl()" :isNew="true">
					<span slot="heading" class="f16">
						<i class="fa fa-cogs"></i>
							添加项目团队成员
					</span>
          <span slot="actions" v-if="project.isCreator(user)">
						<i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					</span>
        <div slot="body">

          <div>
            <NbTabs>
              <NbTabPanel label="站内用户邀请">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">用户：</label>
                  <div class="col-md-10">
                    <UserSelections :users="invitation.users"/>
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">角色：</label>
                  <div class="col-md-10">
                    <NbBtnDropdown :name="reviewTypeItem['name']" size="sm"
                                   :color="reviewTypeItem['style']">
                      <ul>
                        <li v-for="(option, index) in projectAdministrator.TypeList">
                          <a href="javascript:void(0)" @click="reviewType = option.value">{{option.name}}</a>
                        </li>
                      </ul>
                    </NbBtnDropdown>
                  </div>
                </div>

                <CreateSaveButton createText="发送邀请" createIcon="fa fa-send" :entity="projectAdministrator" :callback="save"/>
              </NbTabPanel>
              <NbTabPanel label="发送邮件邀请">
                  <div class="row mt10">
                    <label class="col-md-2 control-label mt5 compulsory">邮件地址：(可群发，用;分隔)</label>
                    <div class="col-md-10">
                      <input type="text" class="form-control" v-model="invitation.mail"/>
                    </div>

                  </div>

                  <div class="row mt10">
                    <label class="col-md-2 control-label mt5 compulsory">角色：</label>
                    <div class="col-md-10">
                      <NbBtnDropdown :name="reviewTypeItem['name']" size="sm"
                                     :color="reviewTypeItem['style']">
                        <ul>
                          <li v-for="(option, index) in projectAdministrator.TypeList">
                            <a href="javascript:void(0)" @click="reviewType = option.value">{{option.name}}</a>
                          </li>
                        </ul>
                      </NbBtnDropdown>
                    </div>
                  </div>

                  <CreateSaveButton createText="发送邀请" createIcon="fa fa-send" :entity="projectAdministrator" :callback="saveMail"/>
              </NbTabPanel>
            </NbTabs>
          </div>


          <button class="btn btn-primary pull-right mr5" @click.stop.prevent="add">
            <i class="fa fa-plus"></i>
            <span>返回</span>
          </button>

        </div>

      </NbSlidePanel>
    </NbExpanding>

	</div>
</template>
<script>
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'
  import Pager from "../../../../common/model/base/Pager"
  import ProjectAdministrator from "../../../../common/model/project/administrator/ProjectAdministrator"
  import ProjectAdministratorInvitation
    from "../../../../common/model/project/administrator/invitation/ProjectAdministratorInvitation"
  import UserProfileLink from "../../widget/UserProfileLink";
  import NbExpanding from "../../../../common/widget/NbExpanding.vue";
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import NbTabs from "../../../../common/widget/NbTabs.vue";
  import NbTabPanel from "../../../../common/widget/NbTabPanel.vue";
  import NbBtnDropdown from "../../../../common/widget/NbBtnDropdown.vue";
  import UserSelections from '../../../../backyard/view/user/Selections.vue';

  export default{
		data () {
			return {
        user: this.$store.state.user,
        pager: new Pager(ProjectAdministrator),
        projectAdministrator: new ProjectAdministrator(),
        invitation: new ProjectAdministratorInvitation(),
        projectId: this.$store.state.route.query.id,
        reviewType: ProjectAdministrator.prototype.Type.ORDINARY,
        flipped: true
      }
		},
		components: {
			UserProfileLink,
      NbPager,
      NbExpanding,
      NbSlidePanel,
      CreateSaveButton,
      NbTabs,
      NbTabPanel,
      NbBtnDropdown,
      UserSelections
		},
    computed: {
      reviewTypeItem(){
        return this.projectAdministrator.getTypeItem(this.reviewType);
      }
    },
		watch: {},
		methods: {
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			},
      changePermission(projectAdministrator) {
        let that = this;
        let type;
        if(projectAdministrator.type === projectAdministrator.Type.MANAGE) {
          type = projectAdministrator.Type.ORDINARY
        } else {
          type = projectAdministrator.Type.MANAGE
        }
        projectAdministrator.httpChangePermission(type, that.projectId, function () {
          Notification.success({
            message: '变更成功!'
          });
          that.refresh();
        });
      },
      del(projectAdministrator) {
        let that = this;
        MessageBox.confirm('此操作将直接移除管理团队成员', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          projectAdministrator.httpDel(function () {
            Notification.success({
              message: '成功移除成员!'
            });
            that.refresh();
          }, that.refresh());
          }
        );
      },
      save() {
        this.invitation.jurisdiction = this.reviewType;
        this.invitation.type = this.invitation.Type.INSIDE;
        let that = this;
        this.invitation.httpSave(function () {
          that.flipped = true;
          Notification.success({
            message: '发送邀请成功!'
          });
          that.invitation = new ProjectAdministratorInvitation();
          that.invitation.project.id = that.projectId;
          //刷新事件记录
          if (typeof that.successCallback === "function") {
            that.successCallback();
          }
        })
      },
      saveMail() {
        this.invitation.jurisdiction = this.reviewType;
        this.invitation.type = this.invitation.Type.MAIL;
        let that = this;
        this.invitation.httpSave(function () {
          that.flipped = true;
          Notification.success({
            message: '发送邀请成功!'
          });
          that.invitation = new ProjectAdministratorInvitation();
          //刷新事件记录
          if (typeof that.successCallback === "function") {
            that.successCallback();
          }
        })
      },
      add() {
        this.flipped = !this.flipped;
      }
		},
    props: {
      project: {
        required: true
      }
    },
		mounted(){
      this.pager.setFilter('projectId', this.projectId);
      this.invitation.project.id = this.projectId;
			this.refresh();
		}
	}
</script>
