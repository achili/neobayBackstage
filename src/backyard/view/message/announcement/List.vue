<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12">

        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>历史公告</span>
        </h2>
        <div class="pull-right mb10">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/message/announcement/create')">
            <i class="fa fa-plus"></i>
            <span>发布公告</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="messageAnnouncement in pager.messageAnnouncements" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push('/by/message/announcement/detail/' + messageAnnouncement.id)">

          <div class="media">
            <div class="media-body">
              <div class="cell-title">
                <span> {{messageAnnouncement.subject}}</span>
                <span :class="'label label-'+messageAnnouncement.getStatusStyle()">{{messageAnnouncement.getStatusName()}}</span>
              </div>
              <div class="cell-description">
                <span v-if="messageAnnouncement.smsEnable" class="mr10">
                  <i class="fa fa-mobile w15 text-success"></i>
                  短信
                </span>
                <span v-if="messageAnnouncement.mailEnable" class="mr10">
                  <i class="fa fa-at w15 text-success">
                </i>邮件</span>
                <span v-if="messageAnnouncement.letterEnable" class="mr10">
                  <i class="fa fa-envelope-o w15 text-success"></i>
                  站内信
                </span>
              </div>
              <div class="cell-description">
                <span class="mr10" v-for="receiverRole in messageAnnouncement.receiverRoles">
                  <i class="fa fa-users w15 text-info"></i>{{receiverRole.name}}</span>
              </div>
              <div class="cell-content">
                <span class="mr10">发布者:<UserProfileLink :user="messageAnnouncement.creator"/></span>
                <span class="mr10">发布时间: {{messageAnnouncement.createTime | simpleDateTime}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>


      <div class="col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"/>
      </div>

    </div>


  </div>
</template>
<script>
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'
  import Pager from  "../../../../common/model/base/Pager"
  import Mentor from  "../../../../common/model/project/ProjectMentor"
  import UserProfileLink from "../../widget/UserProfileLink";

  import MessageAnnouncement from "../../../../common/model/message/announcement/MessageAnnouncement"

  export default{
    data () {
      return {
        pager: new Pager(MessageAnnouncement)
      }
    },
    components: {
      NbFilter,
      NbPager,
      UserProfileLink
    },
    computed: {},
    watch: {},
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.pager.setFilter("orderId", "DESC");
      this.refresh();
    }
  }
</script>




















