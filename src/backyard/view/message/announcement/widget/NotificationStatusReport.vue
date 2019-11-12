<template>
  <div class="row">
    <div class="col-sm-4" v-if="notification.mailEnable">
      {{notification.mailToAddress}}
      <span class="mh5 cursor" title="邮件">
			 <span :class="'label label-'+notification.getStatusStyle(notification.mailStatus)">
				<i class="fa fa-at w15"></i>
				{{notification.getStatusName(notification.mailStatus)}}
         <span v-show="notification.mailStatus!==notification.Status.OK">{{notification.mailResult}}</span>
			 </span>
		</span>
    </div>

    <div class="col-sm-4" v-if="notification.messageEnable">
      <UserProfileLink :user="notification.receiver"></UserProfileLink>
      <span class="mh5 cursor" title="站内信">
        <span :class="'label label-'+notification.getStatusStyle(notification.messageStatus)">
          <i class="fa fa-envelope-o w15"></i>
          {{notification.getStatusName(notification.messageStatus)}}
          <span v-show="notification.messageStatus!==notification.Status.OK">{{notification.messageResult}}</span>
        </span>
      </span>
    </div>

    <div class="col-sm-4" v-if="notification.smsEnable">
      {{notification.smsPhone}}
      <span class="mh5 cursor" title="短信">
        <span :class="'label label-'+notification.getStatusStyle(notification.smsStatus)">
          <i class="fa fa-mobile f15"></i>
          {{notification.getStatusName(notification.smsStatus)}}
          <span v-show="notification.smsStatus!==notification.Status.OK">{{notification.smsResult}}</span>
        </span>
      </span>
    </div>


  </div>

</template>

<script>
  import Notification from  "../../../../../common/model/notification/Notification";
  import NbSwitcher from  "../../../../../common/widget/NbSwitcher.vue";
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
  import NbExpanding from  "../../../../../common/widget/NbExpanding.vue";
  import NbEditor from  "../../../../../common/widget/NbEditor.vue";
  import UserProfileLink from "../../../widget/UserProfileLink";

  export default {
    data () {
      return {}
    },
    props: {
      notification: {
        type: Notification,
        required: true
      }
    },
    computed: {},
    components: {
      UserProfileLink
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>











