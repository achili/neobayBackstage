<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="messageAnnouncement.detailLoading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span>发布公告</span>
          </h2>
        </div>
      </div>

      <div class="row">

        <div class="col-md-12 mt10">


          <NbTabs :borderStyle="true" :blueTheme="true">
            <NbTabPanel label="按联系人分组">
              <div class="panel panel-success p10" style="border-radius:0;">

                <div class="mb10 ml10" v-for="messageContactGroup in messageContactGroupPage.messageContactGroups">
                  <NbCheck :val="messageContactGroup.id" v-model="messageAnnouncement.receiverContactGroups"></NbCheck>
                  <span class="ml5">{{messageContactGroup.name}}</span>
                </div>

              </div>

            </NbTabPanel>
            <NbTabPanel label="按角色">
              <div class="panel panel-success p10" style="border-radius:0;">
                <div class="mb10 ml10" v-for="userRole in userRolePage.userRoles"
                     v-if="userRole.type!==userRole.Type.GUEST">
                  <NbCheck :val="userRole.id" v-model="messageAnnouncement.receiverRoles"></NbCheck>
                  <span class="ml5">{{userRole.name}}</span>
                </div>
              </div>
            </NbTabPanel>

          </NbTabs>

        </div>

        <div class="col-md-12 mt10">
          <NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-leaf"></i>
              填写公告内容
            </span>
            <div slot="body">
              <div>
                <div class="form-group">
                  <label class="form-label compulsory">主题：</label>
                  <input type="text" class="form-control" v-model="messageAnnouncement.subject"/>
                </div>

                <div class="panel panel-default">
                  <div class="panel-heading">
                    <NbSwitcher size="sm" v-model="messageAnnouncement.mailEnable"/>
                    <label class="mr10">
                      邮件通知
                    </label>
                    <NbSwitcher size="sm" v-model="messageAnnouncement.letterEnable"/>
                    <label>
                      站内信通知
                    </label>
                  </div>
                  <NbExpanding>
                    <div class="panel-body" v-show="mailRoLetterEnable">
                      <div class="form-group">
                        <label class="form-label compulsory">内容</label>
                        <NbEditor v-model="messageAnnouncement.content" :isAdvanced="true"/>
                      </div>
                    </div>
                  </NbExpanding>
                </div>

                <NbSlidePanel>
                  <span slot="heading" class="f14">
                    <i class="fa fa-mobile"></i>
                    短信通知
                  </span>
                  <div slot="body">
                    请登陆
                    <a href="https://my.luosimao.com/auth/login" target="_blank">螺丝帽短信平台(https://my.luosimao.com/auth/login)</a><br/>
                    点击：<b class="text-danger">短信</b>-<b class="text-danger">批量发送</b><br/>

                    编辑短信内容后使用导出的SVG文件进行短信群发。<br/>

                    <button class="btn btn-warning" @click.stop.prevent="exportPhone">导出群发短信SVG文件</button>

                  </div>
                </NbSlidePanel>

                <div v-show="messageAnnouncement.errorMessage" class="alert alert-danger">
                  {{messageAnnouncement.errorMessage}}
                </div>

                <CreateSaveButton createText="发布" :entity="messageAnnouncement" :callback="send"
                                  createIcon="fa fa-send"/>

              </div>
            </div>
          </NbSlidePanel>
        </div>
      </div>
    </LoadingFrame>
  </div>
</template>
<script>
  import {simpleDateTime, str2Date} from '../../../../common/filter/time'
  import {Notification, MessageBox} from 'element-ui';
  import NbCheck from '../../../../common/widget/NbCheckbox'
  import NbRadio from '../../../../common/widget/NbRadio'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import LoadingFrame from "../../widget/LoadingFrame";
  import NbSwitcher from  "../../../../common/widget/NbSwitcher.vue";
  import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
  import NbEditor from  "../../../../common/widget/NbEditor.vue";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import NbTabs from "../../../../common/widget/NbTabs.vue";
  import NbTabPanel from "../../../../common/widget/NbTabPanel.vue";

  import MessageAnnouncement from '../../../../common/model/message/announcement/MessageAnnouncement'
  import UserRole from '../../../../common/model/user/role/UserRole'
  import Pager from '../../../../common/model/base/Pager'
  import MessageContactGroup from  "../../../../common/model/message/contact/group/MessageContactGroup"
  import $ from "jquery"

  export default {

    data () {
      return {
        userRolePage: new Pager(UserRole),
        messageAnnouncement: new MessageAnnouncement(),
        messageContactGroupPage: new Pager(MessageContactGroup, 20)
      }
    },
    components: {
      NbCheck,
      NbRadio,
      NbSlidePanel,
      LoadingFrame,
      NbSwitcher,
      NbExpanding,
      NbEditor,
      CreateSaveButton,
      NbTabs,
      NbTabPanel
    },
    computed: {
      mailRoLetterEnable(){
        return this.messageAnnouncement.mailEnable || this.messageAnnouncement.letterEnable;
      }
    },
    watch: {
      "messageAnnouncement.receiverRoles.length"(newVal, oldVal){
        if (newVal !== 0) {
          this.messageAnnouncement.receiverContactGroups = [];
        }
      },
      "messageAnnouncement.receiverContactGroups.length"(newVal, oldVal){
        if (newVal !== 0) {
          this.messageAnnouncement.receiverRoles = [];
        }
      }
    },
    methods: {
      send() {
        let that = this;
        //不发送短信
        this.messageAnnouncement.smsEnable = false;
        this.messageAnnouncement.httpSave(function () {
          Notification.success({
            message: '发送通知成功！'
          });
          that.$router.push("/by/message/announcement/list");
        });
      },
      exportPhone() {
        this.messageAnnouncement.exportPhone();
      }
    },

    mounted(){
      let that = this;
      this.userRolePage.httpFastPage();
      this.messageContactGroupPage.httpFastPage();
      this.messageAnnouncement.id = this.$store.state.route.params.id;
      if (this.messageAnnouncement.id) {
        this.messageAnnouncement.httpDetail();
      }

    }
  }


</script>
