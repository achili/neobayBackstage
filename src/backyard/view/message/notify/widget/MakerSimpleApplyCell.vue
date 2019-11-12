<template>
  <div>
    <div class="f18 black">{{messageNotify.getActionName()}}</div>


    <div class="mv5" v-if="messageNotify.action === Action.MAKER_SIMPLE_APPLY_CREATE">
      <UserProfileLink :user="messageNotify.sender"/>
      {{messageNotify.content}}
    </div>
    <div class="mv5" v-else-if="messageNotify.action === Action.MAKER_SIMPLE_APPLY_EDIT">
      <UserProfileLink :user="messageNotify.sender"/>
      {{messageNotify.content}}
    </div>
    <div class="mv5" v-else-if="messageNotify.action === Action.MAKER_SIMPLE_APPLY_COMMENT">
      <UserProfileLink :user="messageNotify.sender"/>
      {{messageNotify.content}}
    </div>
    <div class="mv5" v-else-if="messageNotify.action === Action.MAKER_SIMPLE_APPLY_PASS">
      <UserProfileLink :user="messageNotify.sender"/>
      发送了一条客户通知
    </div>
    <div class="mv5" v-else-if="messageNotify.action === Action.MAKER_SIMPLE_APPLY_CHARGE_PASS">
      <UserProfileLink :user="messageNotify.sender"/>
      发送了一条机构创建者通知
    </div>

    <div class="mv5" v-else>
      <UserProfileLink :user="messageNotify.sender"/>
      将状态修改为
      <span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
			</span>
    </div>

    <div class="mv5"
         v-if="user.hasPermissionAllSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE)&& messageNotify.notifications && messageNotify.notifications.length">
      通知：
      <NotificationStatusReport v-for="notification in messageNotify.notifications" :key="notification.id"
                                :notification="notification"/>
    </div>


    <div class="mv5"
         v-if="messageNotify.action === Action.MAKER_SIMPLE_APPLY_REFUSE ">
      <span>原因：</span>
      <span class="text-danger">{{messageNotify.content}}</span>
    </div>

    <div>
      <i class="fa fa-clock-o"></i>
      {{messageNotify.createTime | simpleDateMinute}}
    </div>

  </div>

</template>
<script>

  import MessageNotify from "../../../../../common/model/message/notify/MessageNotify";
  import UserProfileLink from "../../../widget/UserProfileLink.vue";
  import NotificationStatusReport from  "../../../notification/widget/StatusReport.vue";
  import {
    FeatureType,
    FeatureTypeMap,
    FeatureTypeList,
    ModuleFeatureMap
  } from "../../../../../common/model/core/feature/FeatureType";
  import {EntityType, EntityTypeMap, EntityTypeList} from "../../../../../common/model/core/type/EntityType";
  import {Action, ActionMap, ActionList} from "../../../../../common/model/core/action/Action";

  export default{
    data(){
      return {
        user: this.$store.state.user,
        FeatureType,
        EntityType,
        Action
      }
    },
    watch: {},
    props: {
      messageNotify: {
        type: MessageNotify,
        required: true
      }
    },
    methods: {},
    components: {
      UserProfileLink,
      NotificationStatusReport
    },
    mounted(){

    }
  }
</script>
