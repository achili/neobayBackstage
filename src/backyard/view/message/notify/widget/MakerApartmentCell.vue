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

    <div class="mv5" v-else>
      <UserProfileLink :user="messageNotify.sender"/>
      将状态修改为
      <span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
			</span>
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
