<template>
	<div>
		<div class="f18 black">{{messageNotify.getActionName()}}</div>


		<div class="mv5" v-if="messageNotify.action === Action.PROTOCOL_SPACE_CREATE">
			<UserProfileLink :user="messageNotify.sender"/>
			创建了租赁协议
		</div>

    <div class="mv5"
         v-else-if="messageNotify.action === Action.PROTOCOL_SPACE_ARCHIVE || messageNotify.action === Action.PROTOCOL_SPACE_UNARCHIVE">
			<span>
				{{messageNotify.content}}
			</span>
		</div>

    <div class="mv5"
         v-else-if="messageNotify.action === Action.PROTOCOL_SPACE_ATTACHMENTS">
      <span v-html="messageNotify.content"></span>
    </div>

    <div class="mv5" v-else>
			<UserProfileLink :user="messageNotify.sender"/>
			将状态修改为
			<span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
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
