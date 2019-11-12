<template>
  <div>
    <div class="f18 black">{{messageNotify.getActionName()}}</div>
    <div class="mv5" v-if="messageNotify.action === Action.INVESTMENT_CREATE">
      <UserProfileLink :user="messageNotify.sender"/>
      创建了申请融资
    </div>
    <div class="mv5" v-else-if="messageNotify.action === Action.INVESTMENT_EDIT">
      <UserProfileLink :user="messageNotify.sender"/>
      修改了申请融资信息
    </div>

    <div class="mv5" v-else-if="
		 messageNotify.action === Action.INVESTMENT_NEW
		 || messageNotify.action === Action.INVESTMENT_APPLY
		 || messageNotify.action === Action.INVESTMENT_ALREADY_BUTTED
		 || messageNotify.action === Action.INVESTMENT_REACH_FINANCING_INTENTION
		 || messageNotify.action === Action.INVESTMENT_ALREADY_FINANCING

		">
      <UserProfileLink :user="messageNotify.sender"/>
      将状态修改为
      <span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
			</span>
    </div>

    <div class="mv5"
         v-else-if="messageNotify.action === Action.INVESTMENT_ATTACHMENTS">
      <span v-html="messageNotify.content"></span>
    </div>

    <div class="mv5" v-if="messageNotify.content && messageNotify.action !== Action.INVESTMENT_ATTACHMENTS">
			<span>
				{{messageNotify.content}}
			</span>
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
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../../common/model/core/feature/FeatureType";
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
