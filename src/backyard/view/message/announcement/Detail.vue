<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="messageAnnouncement.detailLoading">
      <NbSlidePanel>

        <span slot="heading" class="text-success">
          <i class="fa fa-user"></i>
          公告详情
        </span>

        <div>

          <div class="f18 bold mt10">
            主题：{{messageAnnouncement.subject}}
          </div>

          <div class="mt10">
            发送类型：
            <span v-if="messageAnnouncement.smsEnable" class="mr10"><i class="fa fa-circle text-success"></i>短信</span>
            <span v-if="messageAnnouncement.mailEnable" class="mr10"><i class="fa fa-circle text-success"></i>邮件</span>
            <span v-if="messageAnnouncement.letterEnable" class="mr10"><i
              class="fa fa-circle text-success"></i>站内信</span>
          </div>

          <div class="mt10">
            发送群体：
            <span class="mr10" v-for="receiverRole in messageAnnouncement.receiverRoles"><i
              class="fa fa-users text-info"></i>{{receiverRole.name}}</span>
          </div>

          <div class="mt10" v-if="messageAnnouncement.mailEnable || messageAnnouncement.letterEnable">
            邮件/站内信内容：
          </div>
          <div v-html="messageAnnouncement.content"></div>

          <div class="mt10" v-if="messageAnnouncement.smsEnable">
            短信内容：{{messageAnnouncement.sms}}
          </div>

        </div>
      </NbSlidePanel>

      <NbSlidePanel>
        <span slot="heading" class="text-success">
          <i class="fa fa-paper-plane-o"></i>
          发送详情
        </span>
        <div class="text-right mail-search">
          <div class="input-group ">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="notificationPager.getFilter('keyword').value" @keyup.enter="search">
            <div class="input-group-btn">
              <button type="submit" class="btn btn-sm btn-primary" @click="search">
                搜索
              </button>
            </div>
          </div>
        </div>

        <div>
          <NotificationStatusReport class="mv10" v-for="notification in notificationPager.notifications"
                                    :key="notification.id"
                                    :notification="notification"/>
        </div>
        <NbPager :pager="notificationPager" :callback="notificationPagerRefresh"></NbPager>
      </NbSlidePanel>

    </LoadingFrame>
  </div>
</template>

<script>
  import MessageAnnouncement from '../../../../common/model/message/announcement/MessageAnnouncement'
  import ProjectMember from '../../../../common/model/project/ProjectMember'
  import ProjectFinancing from '../../../../common/model/project/ProjectFinancing'
  import ProjectMentor from '../../../../common/model/project/ProjectMentor'
  import Pager from '../../../../common/model/base/Pager'
  import Notification from '../../../../common/model/notification/Notification'

  import LoadingFrame from "../../widget/LoadingFrame";
  import UserProfileLink from "../../widget/UserProfileLink.vue";
  import NotificationStatusReport from  "./widget/NotificationStatusReport.vue";
  import NbTank from '../../../../common/widget/NbTank'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'

  export default {

    data () {
      return {
        messageAnnouncement: new MessageAnnouncement(),
        notificationPager: new Pager(Notification)
      }
    },
    components: {
      NbTank,
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink,
      NotificationStatusReport,
      NbPager
    },
    methods: {
      search() {
        this.notificationPager.page = 0;
        this.notificationPager.pageSize = 10;
        this.notificationPagerRefresh();
      },
      notificationPagerRefresh() {
        let params = {
          announcementId: this.messageAnnouncement.id,
          page: this.notificationPager.page,
          pageSize: this.notificationPager.pageSize,
          keyword: this.notificationPager.getFilter("keyword").value
        }
        this.notificationPager.httpCustomPage(Notification.prototype.ANNOUNCEMENT_DETAILS, params);
      }
    },
    mounted(){
      let that = this;
      this.messageAnnouncement.id = this.$store.state.route.params.id;
      if (this.messageAnnouncement.id) {
        this.messageAnnouncement.httpDetail();
        this.notificationPagerRefresh();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
